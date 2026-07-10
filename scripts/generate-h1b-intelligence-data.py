from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

import pandas as pd


DEFAULT_WORKBOOK = Path(r"C:\Users\mamid\Downloads\H1B_International_Student_Sponsorship_Intelligence (1).xlsx")
DEFAULT_OUTPUT = Path("public/job-portal-search/h1b-intelligence/data.js")


def normalize_employer_name(value: Any) -> str:
    text = str(value or "").upper().strip()
    text = re.sub(r"[^A-Z0-9 ]+", " ", text)
    text = re.sub(
        r"\b(INCORPORATED|INC|CORPORATION|CORP|COMPANY|CO|LLC|LLP|LP|LTD|LIMITED|PLC)\b",
        " ",
        text,
    )
    return re.sub(r"\s+", " ", text).strip()


def camel_key(value: Any) -> str:
    text = str(value or "").strip()
    words = re.split(r"[^A-Za-z0-9]+", text)
    words = [word for word in words if word]
    if not words:
        return ""
    first, *rest = words
    return first.lower() + "".join(word[:1].upper() + word[1:].lower() for word in rest)


def clean_value(value: Any) -> Any:
    if pd.isna(value):
        return None
    if hasattr(value, "isoformat"):
        return value.isoformat()
    if hasattr(value, "item"):
        return clean_value(value.item())
    return value


def sheet_to_payload(path: Path, sheet_name: str) -> dict[str, Any]:
    frame = pd.read_excel(path, sheet_name=sheet_name)
    columns = [str(column) for column in frame.columns]
    column_keys = []
    seen = set()
    for column in columns:
        key = camel_key(column)
        base = key or "column"
        index = 2
        while key in seen:
            key = f"{base}{index}"
            index += 1
        seen.add(key)
        column_keys.append(key)

    rows: list[dict[str, Any]] = []
    for _, row in frame.iterrows():
        item = {
            key: clean_value(row[column])
            for column, key in zip(frame.columns, column_keys)
        }
        item["_sourceSheet"] = sheet_name
        if "employerName" in item:
            item["_employerKey"] = normalize_employer_name(item.get("employerName"))
        rows.append(item)

    return {
        "name": sheet_name,
        "columns": columns,
        "columnKeys": column_keys,
        "rowCount": len(rows),
        "rows": rows,
    }


def build_payload(workbook_path: Path) -> dict[str, Any]:
    excel = pd.ExcelFile(workbook_path)
    sheets = {sheet_name: sheet_to_payload(workbook_path, sheet_name) for sheet_name in excel.sheet_names}
    return {
        "source": {
            "fileName": workbook_path.name,
            "note": "Static workbook-derived H-1B sponsorship intelligence for Taran's job-search workflow.",
        },
        "sheetOrder": excel.sheet_names,
        "sheets": sheets,
        "rowCounts": {sheet_name: sheets[sheet_name]["rowCount"] for sheet_name in excel.sheet_names},
    }


def main() -> int:
    workbook_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_WORKBOOK
    output_path = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_OUTPUT

    if not workbook_path.exists():
        raise FileNotFoundError(f"Workbook not found: {workbook_path}")

    payload = build_payload(workbook_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    output_path.write_text(
        "window.H1B_INTELLIGENCE_DATA = "
        + serialized
        + ";\n",
        encoding="utf-8",
    )

    print(json.dumps(payload["rowCounts"], indent=2))
    print(f"Wrote {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
