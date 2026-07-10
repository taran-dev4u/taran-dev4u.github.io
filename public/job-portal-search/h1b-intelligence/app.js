const DATA = window.H1B_INTELLIGENCE_DATA || { sheets: {}, sheetOrder: [], rowCounts: {} };

const EMPLOYER_TABS = [
  { id: "shortlist", label: "Shortlist", sheet: "Personalized Shortlist" },
  { id: "applyFirst", label: "Apply First", sheet: "Apply First" },
  { id: "strongTargets", label: "Strong Targets", sheet: "Strong Targets" },
  { id: "hiddenGems", label: "Hidden Gems", sheet: "Hidden Gems" },
  { id: "entryLevel", label: "Entry Level", sheet: "Entry Level Evidence" },
  { id: "review", label: "Review", sheet: "Sponsorship Review" }
];

const SPECIAL_TABS = [
  { id: "weekly", label: "Weekly Plan" },
  { id: "insights", label: "Market Insights" },
  { id: "methodology", label: "Methodology" },
  { id: "raw", label: "Raw Data" }
];

const ALL_TABS = [...EMPLOYER_TABS, ...SPECIAL_TABS];
const EMPLOYER_SHEETS = new Set(EMPLOYER_TABS.map(tab => tab.sheet));

const state = {
  tab: "applyFirst",
  visibleRows: [],
  visibleSheet: "Apply First",
  selectedRow: null,
  rawSheet: "Personalized Shortlist"
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  populateSummaryMetrics();
  populateTabs();
  populateFilters();
  bindEvents();
  loadTheme();
  render();
});

function cacheElements() {
  Object.assign(els, {
    dataStatus: document.getElementById("dataStatus"),
    themeToggle: document.getElementById("themeToggle"),
    summaryMetrics: document.getElementById("summaryMetrics"),
    searchInput: document.getElementById("searchInput"),
    roleFamilyFilter: document.getElementById("roleFamilyFilter"),
    stateFilter: document.getElementById("stateFilter"),
    cityFilter: document.getElementById("cityFilter"),
    priorityFilter: document.getElementById("priorityFilter"),
    evidenceFilter: document.getElementById("evidenceFilter"),
    confidenceFilter: document.getElementById("confidenceFilter"),
    modelFilter: document.getElementById("modelFilter"),
    minScoreFilter: document.getElementById("minScoreFilter"),
    minNewFilter: document.getElementById("minNewFilter"),
    resetFiltersButton: document.getElementById("resetFiltersButton"),
    tabList: document.getElementById("tabList"),
    visibleSummary: document.getElementById("visibleSummary"),
    copyPacketsButton: document.getElementById("copyPacketsButton"),
    copyCsvButton: document.getElementById("copyCsvButton"),
    contentPanel: document.getElementById("contentPanel"),
    selectedPanel: document.getElementById("selectedPanel"),
    detailDialog: document.getElementById("detailDialog"),
    detailSheet: document.getElementById("detailSheet"),
    detailTitle: document.getElementById("detailTitle"),
    detailBody: document.getElementById("detailBody"),
    closeDetailButton: document.getElementById("closeDetailButton"),
    toast: document.getElementById("toast")
  });
}

function bindEvents() {
  [
    els.searchInput,
    els.roleFamilyFilter,
    els.stateFilter,
    els.cityFilter,
    els.priorityFilter,
    els.evidenceFilter,
    els.confidenceFilter,
    els.modelFilter,
    els.minScoreFilter,
    els.minNewFilter
  ].forEach(control => {
    control.addEventListener("input", render);
    control.addEventListener("change", render);
  });

  els.resetFiltersButton.addEventListener("click", resetFilters);
  els.copyPacketsButton.addEventListener("click", copyVisiblePackets);
  els.copyCsvButton.addEventListener("click", copyVisibleCsv);
  els.themeToggle.addEventListener("click", toggleTheme);
  els.closeDetailButton.addEventListener("click", () => els.detailDialog.close());
}

function populateSummaryMetrics() {
  const shortlist = getSheetRows("Personalized Shortlist");
  const applyFirst = getSheetRows("Apply First");
  const weekly = getSheetRows("Weekly Plan");
  const roleFamilies = getSheetRows("Role Families");
  const metrics = [
    ["Shortlist", formatNumber(shortlist.length), "ranked employers"],
    ["Apply First", formatNumber(applyFirst.length), "Tier A targets"],
    ["Weekly Plan", formatNumber(weekly.length), "scheduled employers"],
    ["Role Families", formatNumber(roleFamilies.length), "market tracks"]
  ];
  els.summaryMetrics.replaceChildren(...metrics.map(([label, value, note]) => {
    const card = document.createElement("article");
    card.className = "metric-card";
    card.append(createElement("span", label), createElement("strong", value), createElement("span", note));
    return card;
  }));
  els.dataStatus.textContent = `${formatNumber(Object.values(DATA.rowCounts || {}).reduce((sum, count) => sum + count, 0))} workbook rows loaded`;
}

function populateTabs() {
  const fragment = document.createDocumentFragment();
  ALL_TABS.forEach(tab => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tab-button";
    button.role = "tab";
    button.textContent = tab.label;
    button.dataset.tab = tab.id;
    button.addEventListener("click", () => {
      state.tab = tab.id;
      render();
    });
    fragment.appendChild(button);
  });
  els.tabList.appendChild(fragment);
}

function populateFilters() {
  const rows = EMPLOYER_TABS.flatMap(tab => getSheetRows(tab.sheet));
  fillSelect(els.roleFamilyFilter, "All role families", collectSplitValues(rows, "topRoleFamilies"));
  fillSelect(els.stateFilter, "All states", collectSplitValues(rows, "topWorksiteStates"));
  fillSelect(els.cityFilter, "All cities", collectSplitValues(rows, "topCities"));
  fillSelect(els.priorityFilter, "All priorities", collectValues(rows, "applicationPriority"));
  fillSelect(els.evidenceFilter, "All evidence", collectValues(rows, "sponsorshipEvidence"));
  fillSelect(els.confidenceFilter, "All confidence", collectValues(rows, "dataConfidence"));
  fillSelect(els.modelFilter, "All employer models", collectValues(rows, "employerModel"));
}

function fillSelect(select, label, values) {
  select.innerHTML = "";
  const all = document.createElement("option");
  all.value = "";
  all.textContent = label;
  select.appendChild(all);
  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function collectValues(rows, key) {
  return [...new Set(rows.map(row => row[key]).filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function collectSplitValues(rows, key) {
  const values = new Set();
  rows.forEach(row => splitList(row[key]).forEach(value => values.add(value)));
  return [...values].sort((a, b) => a.localeCompare(b));
}

function render() {
  syncTabs();
  const employerTab = EMPLOYER_TABS.find(tab => tab.id === state.tab);
  if (employerTab) {
    renderEmployerSheet(employerTab.sheet);
  } else if (state.tab === "weekly") {
    renderWeeklyPlan();
  } else if (state.tab === "insights") {
    renderInsights();
  } else if (state.tab === "methodology") {
    renderMethodology();
  } else {
    renderRawData();
  }
}

function syncTabs() {
  els.tabList.querySelectorAll(".tab-button").forEach(button => {
    button.setAttribute("aria-selected", String(button.dataset.tab === state.tab));
  });
}

function renderEmployerSheet(sheetName) {
  state.visibleSheet = sheetName;
  const rows = getSheetRows(sheetName).filter(matchesEmployerFilters);
  state.visibleRows = rows;
  els.visibleSummary.textContent = `${formatNumber(rows.length)} visible from ${sheetName}`;
  els.copyPacketsButton.disabled = rows.length === 0;
  els.copyCsvButton.disabled = rows.length === 0;

  const heading = createSectionHeading(sheetName, `${formatNumber(rows.length)} matching employers`);
  const grid = document.createElement("div");
  grid.className = "cards-grid";
  const fragment = document.createDocumentFragment();
  rows.forEach(row => fragment.appendChild(createEmployerCard(row, sheetName)));
  grid.appendChild(fragment);
  els.contentPanel.replaceChildren(heading, grid);
}

function createEmployerCard(row, sheetName) {
  const card = document.createElement("article");
  card.className = "company-card";

  const heading = document.createElement("div");
  heading.className = "card-heading";
  const titleBlock = document.createElement("div");
  titleBlock.append(createElement("h3", `${row.rank || ""}. ${row.employerName || "Unknown employer"}`.trim()));
  titleBlock.append(createElement("p", row.applicationPriority || "No priority", "row-subtitle"));
  heading.append(titleBlock, createElement("div", formatScore(row.candidateFitScore), "score-badge"));

  const pills = document.createElement("div");
  pills.className = "pill-list";
  [
    row.studentFriendliness,
    row.sponsorshipEvidence,
    row.dataConfidence,
    row.employerModel,
    row.employerReviewFlag
  ].filter(Boolean).forEach(value => pills.appendChild(createPill(value, /review|staffing|consulting/i.test(value) ? "review" : "")));

  const note = createElement("p", row.whyApply || "No workbook reason supplied.", "card-note");
  const evidence = document.createElement("div");
  evidence.className = "evidence-grid";
  evidence.append(
    createEvidence("New positions", formatNumber(row.newEmploymentPositions)),
    createEvidence("Tech LCAs", formatNumber(row.certifiedTechLcas)),
    createEvidence("Entry cases", formatNumber(row.explicitEntryCases)),
    createEvidence("Median wage", formatCurrency(row.medianAnnualWage))
  );

  const rolePills = document.createElement("div");
  rolePills.className = "pill-list";
  splitList(row.topRoleFamilies).slice(0, 6).forEach(value => rolePills.appendChild(createPill(value)));
  splitList(row.topWorksiteStates).slice(0, 5).forEach(value => rolePills.appendChild(createPill(value, "warning")));

  card.append(heading, pills, note, evidence, rolePills, createActions(row, sheetName));
  return card;
}

function createActions(row, sheetName) {
  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.append(
    createLink("Career Search", row.careerSearchUrl || buildGoogleCompanyUrl(row)),
    createLink("Google Company", buildGoogleCompanyUrl(row)),
    createLink("LinkedIn Jobs", buildLinkedInJobsUrl(row)),
    createLink("LinkedIn Recruiters", buildLinkedInRecruiterUrl(row)),
    createButton("Copy Packet", () => copyRowsAsPackets([row])),
    createButton("Details", () => showDetails(row, sheetName))
  );
  return actions;
}

function renderWeeklyPlan() {
  const rows = getSheetRows("Weekly Plan").filter(matchesWeeklyFilters);
  state.visibleSheet = "Weekly Plan";
  state.visibleRows = rows;
  els.visibleSummary.textContent = `${formatNumber(rows.length)} weekly targets`;
  els.copyPacketsButton.disabled = rows.length === 0;
  els.copyCsvButton.disabled = rows.length === 0;

  const wrapper = document.createElement("div");
  wrapper.className = "cards-grid";
  const weeks = groupBy(rows, row => row.applicationWeek || "Unscheduled");
  Object.entries(weeks).forEach(([week, weekRows]) => {
    const groupCard = document.createElement("article");
    groupCard.className = "week-card";
    groupCard.append(createElement("h3", `Week ${week}`), createElement("p", `${weekRows.length} employers`, "row-subtitle"));
    weekRows.forEach(row => {
      const item = document.createElement("div");
      item.className = "company-card";
      item.append(
        createElement("h3", row.employerName || "Unknown employer"),
        createElement("p", row.whyApply || "", "card-note"),
        createElement("p", row.recommendedAction || "", "row-subtitle"),
        createActions(row, "Weekly Plan")
      );
      groupCard.appendChild(item);
    });
    wrapper.appendChild(groupCard);
  });
  els.contentPanel.replaceChildren(createSectionHeading("Weekly Plan", "Grouped by application week"), wrapper);
}

function renderInsights() {
  state.visibleRows = [];
  els.visibleSummary.textContent = "Market insight sheets";
  els.copyPacketsButton.disabled = true;
  els.copyCsvButton.disabled = true;

  const grid = document.createElement("div");
  grid.className = "insights-grid";
  [
    ["Role Families", "ROLE_FAMILY", "CERTIFIED_LCAS"],
    ["States", "WORKSITE_STATE", "NEW_EMPLOYMENT_POSITIONS"],
    ["Industries", "INDUSTRY", "CERTIFIED_LCAS"],
    ["Salary by Role", "ROLE_FAMILY", "MEDIAN_WAGE"],
    ["Quarter Coverage", "FEDERAL_QUARTER", "CASES"]
  ].forEach(([sheetName, labelColumn, valueColumn]) => {
    grid.appendChild(createInsightCard(sheetName, labelColumn, valueColumn));
  });
  els.contentPanel.replaceChildren(createSectionHeading("Market Insights", "Demand, wage, and coverage context"), grid);
}

function createInsightCard(sheetName, labelColumn, valueColumn) {
  const sheet = getSheet(sheetName);
  const rows = sheet.rows || [];
  const labelKey = keyForColumn(sheet, labelColumn);
  const valueKey = keyForColumn(sheet, valueColumn);
  const card = document.createElement("article");
  card.className = "insight-card";
  card.append(createElement("h3", sheetName), createElement("p", `${formatNumber(rows.length)} rows`, "row-subtitle"));

  const table = createTable(sheet, rows, sheet.columns.slice(0, Math.min(sheet.columns.length, 6)));
  card.appendChild(table);

  if (labelKey && valueKey && rows.length) {
    const top = rows[0];
    card.prepend(createElement("p", `Top: ${top[labelKey] || "n/a"} - ${formatMetric(top[valueKey])}`, "card-note"));
  }
  return card;
}

function renderMethodology() {
  state.visibleRows = [];
  els.visibleSummary.textContent = "Workbook guidance and scoring method";
  els.copyPacketsButton.disabled = true;
  els.copyCsvButton.disabled = true;

  const content = document.createElement("div");
  content.className = "insights-grid";
  content.append(
    createInsightCard("Read Me", "Topic", "Guidance"),
    createInsightCard("Methodology", "Score Component", "Weight"),
    createInsightCard("Application Tracker", "Employer", "Status")
  );
  els.contentPanel.replaceChildren(createSectionHeading("Methodology", "How the score should be interpreted"), content);
}

function renderRawData() {
  const sheet = getSheet(state.rawSheet);
  const rows = filterRawRows(sheet.rows || []);
  state.visibleSheet = state.rawSheet;
  state.visibleRows = rows;
  els.visibleSummary.textContent = `${formatNumber(rows.length)} raw rows from ${state.rawSheet}`;
  els.copyPacketsButton.disabled = !EMPLOYER_SHEETS.has(state.rawSheet) || rows.length === 0;
  els.copyCsvButton.disabled = rows.length === 0;

  const tools = document.createElement("div");
  tools.className = "raw-tools";
  const label = document.createElement("label");
  label.className = "field";
  const select = document.createElement("select");
  DATA.sheetOrder.forEach(sheetName => {
    const option = document.createElement("option");
    option.value = sheetName;
    option.textContent = `${sheetName} (${DATA.rowCounts[sheetName] || 0})`;
    select.appendChild(option);
  });
  select.value = state.rawSheet;
  select.addEventListener("change", () => {
    state.rawSheet = select.value;
    renderRawData();
  });
  label.append(createElement("span", "Workbook sheet"), select);
  tools.append(label, createElement("p", "Raw Data exposes every sheet, row, and column from the workbook.", "muted"));

  els.contentPanel.replaceChildren(
    createSectionHeading("Raw Data", "Full workbook view"),
    tools,
    createTable(sheet, rows, sheet.columns)
  );
}

function createTable(sheet, rows, columns) {
  const tableWrap = document.createElement("div");
  tableWrap.className = "table-wrap";
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  columns.forEach(column => headerRow.appendChild(createElement("th", column)));
  thead.appendChild(headerRow);
  const tbody = document.createElement("tbody");
  rows.forEach(row => {
    const tr = document.createElement("tr");
    columns.forEach(column => {
      const key = keyForColumn(sheet, column);
      tr.appendChild(createElement("td", formatCell(row[key])));
    });
    tbody.appendChild(tr);
  });
  if (!rows.length) {
    const tr = document.createElement("tr");
    const cell = createElement("td", "No rows for the current filters.");
    cell.colSpan = Math.max(columns.length, 1);
    tr.appendChild(cell);
    tbody.appendChild(tr);
  }
  table.append(thead, tbody);
  tableWrap.appendChild(table);
  return tableWrap;
}

function showDetails(row, sheetName) {
  const sheet = getSheet(sheetName);
  state.selectedRow = row;
  els.detailSheet.textContent = sheetName;
  els.detailTitle.textContent = row.employerName || "Workbook row";
  const table = document.createElement("table");
  table.className = "detail-table";
  const tbody = document.createElement("tbody");
  sheet.columns.forEach(column => {
    const key = keyForColumn(sheet, column);
    const tr = document.createElement("tr");
    tr.append(createElement("th", column), createElement("td", formatCell(row[key])));
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  els.detailBody.replaceChildren(table);
  renderSelectedPanel(row, sheetName);
  els.detailDialog.showModal();
}

function renderSelectedPanel(row, sheetName) {
  els.selectedPanel.innerHTML = "";
  els.selectedPanel.append(
    createElement("h2", row.employerName || "Selected company"),
    createElement("p", `${sheetName} - Fit ${formatScore(row.candidateFitScore)}`, "muted"),
    createElement("p", row.whyApply || row.recommendedAction || "No note supplied.", "card-note"),
    createActions(row, sheetName)
  );
}

function matchesEmployerFilters(row) {
  const text = getSearchText(row);
  const query = normalize(els.searchInput.value);
  if (query && !text.includes(query)) return false;
  if (els.roleFamilyFilter.value && !splitList(row.topRoleFamilies).includes(els.roleFamilyFilter.value)) return false;
  if (els.stateFilter.value && !splitList(row.topWorksiteStates).includes(els.stateFilter.value)) return false;
  if (els.cityFilter.value && !splitList(row.topCities).includes(els.cityFilter.value)) return false;
  if (els.priorityFilter.value && row.applicationPriority !== els.priorityFilter.value) return false;
  if (els.evidenceFilter.value && row.sponsorshipEvidence !== els.evidenceFilter.value) return false;
  if (els.confidenceFilter.value && row.dataConfidence !== els.confidenceFilter.value) return false;
  if (els.modelFilter.value && row.employerModel !== els.modelFilter.value) return false;
  if (Number(els.minScoreFilter.value || 0) && Number(row.candidateFitScore || 0) < Number(els.minScoreFilter.value)) return false;
  if (Number(els.minNewFilter.value || 0) && Number(row.newEmploymentPositions || 0) < Number(els.minNewFilter.value)) return false;
  return true;
}

function matchesWeeklyFilters(row) {
  const text = getSearchText(row);
  const query = normalize(els.searchInput.value);
  if (query && !text.includes(query)) return false;
  if (els.roleFamilyFilter.value && !splitList(row.topRoleFamilies).includes(els.roleFamilyFilter.value)) return false;
  if (els.stateFilter.value && !splitList(row.topWorksiteStates).includes(els.stateFilter.value)) return false;
  if (els.priorityFilter.value && row.applicationPriority !== els.priorityFilter.value) return false;
  if (Number(els.minScoreFilter.value || 0) && Number(row.candidateFitScore || 0) < Number(els.minScoreFilter.value)) return false;
  return true;
}

function filterRawRows(rows) {
  const query = normalize(els.searchInput.value);
  if (!query) return rows;
  return rows.filter(row => Object.values(row).some(value => normalize(value).includes(query)));
}

function getSearchText(row) {
  return normalize([
    row.employerName,
    row.whyApply,
    row.topRoleFamilies,
    row.topWorksiteStates,
    row.topCities,
    row.topJobTitles,
    row.recommendedAction,
    row.employerReviewFlag
  ].filter(Boolean).join(" "));
}

function resetFilters() {
  [
    els.searchInput,
    els.minScoreFilter,
    els.minNewFilter
  ].forEach(input => {
    input.value = "";
  });
  [
    els.roleFamilyFilter,
    els.stateFilter,
    els.cityFilter,
    els.priorityFilter,
    els.evidenceFilter,
    els.confidenceFilter,
    els.modelFilter
  ].forEach(select => {
    select.value = "";
  });
  render();
}

function copyVisiblePackets() {
  if (!state.visibleRows.length) {
    showToast("No rows to copy");
    return;
  }
  copyRowsAsPackets(state.visibleRows);
}

function copyRowsAsPackets(rows) {
  const packets = rows.map(row => [
    `Employer: ${row.employerName || "Unknown"}`,
    `Fit score: ${formatScore(row.candidateFitScore)}`,
    `Priority: ${row.applicationPriority || "n/a"}`,
    `Student friendliness: ${row.studentFriendliness || "n/a"}`,
    `Sponsorship evidence: ${row.sponsorshipEvidence || "n/a"}`,
    `Data confidence: ${row.dataConfidence || "n/a"}`,
    `Why apply: ${row.whyApply || row.recommendedAction || "n/a"}`,
    `New employment positions: ${formatNumber(row.newEmploymentPositions)}`,
    `Certified tech LCAs: ${formatNumber(row.certifiedTechLcas)}`,
    `Entry cases: ${formatNumber(row.explicitEntryCases)}`,
    `Top role families: ${row.topRoleFamilies || "n/a"}`,
    `Top states: ${row.topWorksiteStates || "n/a"}`,
    `Top cities: ${row.topCities || "n/a"}`,
    `Median wage: ${formatCurrency(row.medianAnnualWage)}`,
    `Review flag: ${row.employerReviewFlag || "n/a"}`,
    `Career search: ${row.careerSearchUrl || buildGoogleCompanyUrl(row)}`
  ].join("\n"));
  copyText(packets.join("\n\n---\n\n"), `Copied ${rows.length} sponsorship packet${rows.length === 1 ? "" : "s"}`);
}

function copyVisibleCsv() {
  if (!state.visibleRows.length) {
    showToast("No rows to copy");
    return;
  }
  const sheet = getSheet(state.visibleSheet);
  const rows = state.visibleRows;
  const csvRows = [sheet.columns.join(",")];
  rows.forEach(row => {
    csvRows.push(sheet.columns.map(column => {
      const value = formatCell(row[keyForColumn(sheet, column)]);
      return `"${String(value).replace(/"/g, '""')}"`;
    }).join(","));
  });
  copyText(csvRows.join("\n"), `Copied ${rows.length} rows as CSV`);
}

function copyText(text, message) {
  navigator.clipboard.writeText(text).then(() => showToast(message)).catch(() => showToast("Copy failed"));
}

function showToast(message) {
  els.toast.textContent = message;
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    els.toast.textContent = "";
  }, 2200);
}

function getSheet(sheetName) {
  return DATA.sheets[sheetName] || { name: sheetName, columns: [], columnKeys: [], rows: [] };
}

function getSheetRows(sheetName) {
  return getSheet(sheetName).rows || [];
}

function keyForColumn(sheet, column) {
  const index = sheet.columns.indexOf(column);
  return index >= 0 ? sheet.columnKeys[index] : "";
}

function createSectionHeading(title, meta) {
  const heading = document.createElement("div");
  heading.className = "section-heading";
  const block = document.createElement("div");
  block.append(createElement("p", "Workbook view", "eyebrow"), createElement("h2", title));
  heading.append(block, createElement("span", meta, "status-pill"));
  return heading;
}

function createEvidence(label, value) {
  const item = document.createElement("div");
  item.className = "evidence-item";
  item.append(createElement("span", label), createElement("strong", value || "0"));
  return item;
}

function createLink(label, url) {
  const link = document.createElement("a");
  link.href = url || "#";
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = label;
  if (!url) {
    link.setAttribute("aria-disabled", "true");
  }
  return link;
}

function createButton(label, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", handler);
  return button;
}

function createPill(text, className = "") {
  const pill = createElement("span", text, className ? `pill ${className}` : "pill");
  return pill;
}

function createElement(tag, text, className = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text == null || text === "" ? "n/a" : String(text);
  return element;
}

function buildGoogleCompanyUrl(row) {
  const query = `"${row.employerName || ""}" careers jobs sponsorship software data`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function buildLinkedInJobsUrl(row) {
  const params = new URLSearchParams();
  params.set("keywords", `${row.employerName || ""} software data`);
  params.set("location", "United States");
  params.set("sortBy", "DD");
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

function buildLinkedInRecruiterUrl(row) {
  const params = new URLSearchParams();
  params.set("keywords", `"${row.employerName || ""}" recruiter "talent acquisition"`);
  params.set("origin", "GLOBAL_SEARCH_HEADER");
  return `https://www.linkedin.com/search/results/people/?${params.toString()}`;
}

function splitList(value) {
  return String(value || "").split(",").map(item => item.trim()).filter(Boolean);
}

function normalize(value) {
  return String(value || "").toLowerCase();
}

function groupBy(rows, getter) {
  return rows.reduce((acc, row) => {
    const key = getter(row);
    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});
}

function formatScore(value) {
  return Number.isFinite(Number(value)) ? Number(value).toFixed(1) : "n/a";
}

function formatNumber(value) {
  if (value == null || value === "") return "0";
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString() : String(value);
}

function formatCurrency(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0
    ? number.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : "n/a";
}

function formatMetric(value) {
  if (String(value).match(/^\d+(\.\d+)?$/)) {
    return formatNumber(value);
  }
  return formatCell(value);
}

function formatCell(value) {
  if (value == null || value === "") return "";
  if (typeof value === "number") return Number.isInteger(value) ? value.toLocaleString() : value.toLocaleString(undefined, { maximumFractionDigits: 3 });
  return String(value);
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("h1b-intel-theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  syncThemeButton();
}

function loadTheme() {
  const stored = localStorage.getItem("h1b-intel-theme");
  if (stored === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
  syncThemeButton();
}

function syncThemeButton() {
  els.themeToggle.textContent = document.documentElement.classList.contains("dark") ? "Light mode" : "Dark mode";
}
