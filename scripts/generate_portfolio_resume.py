from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Taran_Mamidala_Resume.pdf"

NAVY = colors.HexColor("#132238")
TEAL = colors.HexColor("#087E8B")
TEXT = colors.HexColor("#25364A")
MUTED = colors.HexColor("#52657A")
RULE = colors.HexColor("#B9C8D4")


def register_fonts():
    font_dir = Path("C:/Windows/Fonts")
    regular = font_dir / "arial.ttf"
    bold = font_dir / "arialbd.ttf"
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("ResumeSans", str(regular)))
        pdfmetrics.registerFont(TTFont("ResumeSans-Bold", str(bold)))
        return "ResumeSans", "ResumeSans-Bold"
    return "Helvetica", "Helvetica-Bold"


FONT, FONT_BOLD = register_fonts()
styles = getSampleStyleSheet()

name_style = ParagraphStyle(
    "Name",
    parent=styles["Normal"],
    fontName=FONT_BOLD,
    fontSize=20,
    leading=22,
    textColor=NAVY,
    alignment=TA_CENTER,
    spaceAfter=2,
)
headline_style = ParagraphStyle(
    "Headline",
    parent=styles["Normal"],
    fontName=FONT_BOLD,
    fontSize=9,
    leading=11,
    textColor=TEAL,
    alignment=TA_CENTER,
    spaceAfter=3,
)
contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName=FONT,
    fontSize=7.8,
    leading=9.5,
    textColor=MUTED,
    alignment=TA_CENTER,
)
body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName=FONT,
    fontSize=8.1,
    leading=9.8,
    textColor=TEXT,
)
bullet_style = ParagraphStyle(
    "Bullet",
    parent=body_style,
    leftIndent=12,
    firstLineIndent=-7,
    bulletIndent=3,
    spaceAfter=1.2,
)
section_style = ParagraphStyle(
    "Section",
    parent=styles["Normal"],
    fontName=FONT_BOLD,
    fontSize=9.2,
    leading=11,
    textColor=NAVY,
    spaceBefore=3,
    spaceAfter=2,
)
role_style = ParagraphStyle(
    "Role",
    parent=body_style,
    fontName=FONT_BOLD,
    fontSize=8.4,
    leading=10,
    textColor=NAVY,
)
meta_style = ParagraphStyle(
    "Meta",
    parent=body_style,
    fontSize=7.7,
    leading=9.4,
    textColor=MUTED,
)


def section(title):
    table = Table([[Paragraph(title.upper(), section_style)]], colWidths=[7.62 * inch])
    table.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, -1), 0.7, RULE),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    return table


def experience_heading(company, dates, role, location):
    table = Table([
        [Paragraph(company, role_style), Paragraph(dates, role_style)],
        [Paragraph(role, meta_style), Paragraph(location, meta_style)],
    ], colWidths=[5.75 * inch, 1.87 * inch])
    table.setStyle(TableStyle([
        ("ALIGN", (1, 0), (1, -1), "RIGHT"),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return table


def bullet(text):
    return Paragraph(text, bullet_style, bulletText="-")


def build_resume():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    document = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        rightMargin=0.44 * inch,
        leftMargin=0.44 * inch,
        topMargin=0.34 * inch,
        bottomMargin=0.32 * inch,
        title="Taran Mamidala Resume",
        author="Taran Mamidala",
        subject="Software, Data, and AI Engineering Resume",
    )

    story = [
        Paragraph("TARAN MAMIDALA", name_style),
        Paragraph("SOFTWARE ENGINEER | DATA ENGINEER | AI/ML", headline_style),
        Paragraph(
            'Buffalo, NY | +1 (716) 784-7027 | '
            '<link href="mailto:mtaran014@gmail.com" color="#087E8B">mtaran014@gmail.com</link> | '
            '<link href="https://www.linkedin.com/in/taranmamidala" color="#087E8B">linkedin.com/in/taranmamidala</link> | '
            '<link href="https://github.com/taran-dev4u" color="#087E8B">github.com/taran-dev4u</link>',
            contact_style,
        ),
        Spacer(1, 4),
        section("Summary"),
        Paragraph(
            "Software, data, and AI engineer with 3+ years of non-overlapping experience across backend development, "
            "data pipelines, applied research, and production-facing software. M.S. in Computer Science and Engineering "
            "with an AI/ML specialization. Processed 2M+ satellite records and contributed to peer-reviewed research.",
            body_style,
        ),
        section("Experience"),
        experience_heading("Rebecca Everlene Trust Company", "Mar 2026 - Present", "Software / Data Analytics Intern", "Remote, United States"),
        bullet("Support structured data workflows, reporting, validation, and process automation for a mission-driven nonprofit."),
        bullet("Apply Python and related tools to organize data, document workflows, and improve repeatable operational processes."),
        bullet("Collaborate asynchronously while following confidentiality, communication, and data-handling requirements."),
        Spacer(1, 2),
        experience_heading("University at Buffalo, SUNY", "Jan 2025 - Jan 2026", "Research Assistant", "Buffalo, NY"),
        bullet("Built reproducible Python workflows for data preparation, analysis, and machine learning experiments."),
        bullet("Documented methods, assumptions, and results so research work could be reviewed, repeated, and extended."),
        bullet("Created analysis tooling and visual explanations for technical and non-technical research audiences."),
        Spacer(1, 2),
        experience_heading("iVinGo Solutions Pvt. Ltd.", "Jun 2022 - Jul 2024", "Software Engineer, Backend & Data", "Hyderabad, India / Remote"),
        bullet("Delivered web platforms, backend services, database-backed features, reporting workflows, QA, debugging, and documentation for client projects."),
        bullet("Worked with Python, Java, JavaScript, REST APIs, SQL, MySQL, Oracle, PostgreSQL, and MongoDB across education, pharma, travel, e-commerce, and marketing use cases."),
        bullet("Supported data ingestion, cleaning, validation, schema updates, query development, Docker workflows, and CI/CD with GitHub Actions and Jenkins."),
        Spacer(1, 2),
        experience_heading("NRSC, Indian Space Research Organisation (ISRO)", "Feb 2023 - Sep 2023", "Research Intern, Data Science & Geospatial AI (Concurrent)", "Hyderabad, India"),
        bullet("Processed and validated 2M+ satellite records for atmospheric CO2, climate-zone, and land-use/land-cover analysis."),
        bullet("Built reproducible geospatial workflows for aggregation, regression modeling, validation, explainability, and reporting using Python, Pandas, GeoPandas, xarray, and SHAP."),
        bullet("Contributed to research published in the International Journal of Remote Sensing in 2025."),
        section("Selected Projects"),
        bullet("<b>Enterprise RAG Knowledge System:</b> Built a citation-aware document Q&A workflow with Python, LangChain, vector search, reranking, FastAPI, PostgreSQL, and Docker."),
        bullet("<b>Real-Time Streaming Data Pipeline:</b> Built event ingestion and near-real-time processing with Kafka, Spark Structured Streaming, PostgreSQL, FastAPI, and Docker."),
        section("Skills"),
        Paragraph("<b>Languages:</b> Python, Java, SQL, Bash, JavaScript, TypeScript | <b>Backend:</b> FastAPI, Flask, Spring Boot, REST APIs", body_style),
        Paragraph("<b>Data & AI:</b> Pandas, GeoPandas, xarray, Kafka, Spark, scikit-learn, PyTorch, TensorFlow, SHAP, ETL/ELT", body_style),
        Paragraph("<b>Databases & Delivery:</b> PostgreSQL, MySQL, Oracle, MongoDB, Docker, AWS, Terraform, GitHub Actions, Jenkins, Pytest", body_style),
        section("Education"),
        experience_heading("University at Buffalo, SUNY", "Aug 2024 - Jan 2026", "M.S. Computer Science and Engineering, AI/ML | GPA: 3.8/4.0", "Buffalo, NY"),
        experience_heading("Vellore Institute of Technology", "Jun 2019 - May 2023", "B.Tech. Computer Science and Engineering", "India"),
        section("Publication"),
        Paragraph(
            '<b>Co-author:</b> "Contribution of Land Use Land Cover Changes to CO2 Emissions Across Koppen Classified Climatic Zones in South Asia (India)," '
            '<i>International Journal of Remote Sensing</i>, 2025. '
            '<link href="https://doi.org/10.1080/01431161.2025.2562005" color="#087E8B">doi:10.1080/01431161.2025.2562005</link>',
            body_style,
        ),
    ]

    document.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build_resume()
