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
const PRIMARY_EMPLOYER_SHEETS = [
  "Apply First",
  "Strong Targets",
  "Hidden Gems",
  "Entry Level Evidence",
  "Sponsorship Review",
  "Personalized Shortlist",
  "Weekly Plan"
];
const STORAGE_KEY = "taran-h1b-intelligence-preferences-v2";
const DEFAULT_ROLE_QUERY = "software data AI";

const state = {
  tab: "applyFirst",
  visibleRows: [],
  visibleSheet: "Apply First",
  selectedRow: null,
  rawSheet: "Personalized Shortlist",
  pinnedEmployers: new Set(),
  favoriteEmployers: new Set(),
  checkedEmployers: new Set(),
  customCareerLinks: {}
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  populateSummaryMetrics();
  populateTabs();
  populateFilters();
  loadPreferences();
  applySyncFromUrl();
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
    sponsorTierFilter: document.getElementById("sponsorTierFilter"),
    minEntryFilter: document.getElementById("minEntryFilter"),
    minWageFilter: document.getElementById("minWageFilter"),
    reviewFilter: document.getElementById("reviewFilter"),
    resetFiltersButton: document.getElementById("resetFiltersButton"),
    tabList: document.getElementById("tabList"),
    visibleSummary: document.getElementById("visibleSummary"),
    openTopFiveButton: document.getElementById("openTopFiveButton"),
    copyTopFiveButton: document.getElementById("copyTopFiveButton"),
    openSelectedButton: document.getElementById("openSelectedButton"),
    copySelectedButton: document.getElementById("copySelectedButton"),
    copyPacketsButton: document.getElementById("copyPacketsButton"),
    copyCsvButton: document.getElementById("copyCsvButton"),
    clearCheckedButton: document.getElementById("clearCheckedButton"),
    copySyncButton: document.getElementById("copySyncButton"),
    contentPanel: document.getElementById("contentPanel"),
    selectedPanel: document.getElementById("selectedPanel"),
    pinnedEmployersPanel: document.getElementById("pinnedEmployersPanel"),
    pinnedCount: document.getElementById("pinnedCount"),
    pinnedEmployersGrid: document.getElementById("pinnedEmployersGrid"),
    openPinnedButton: document.getElementById("openPinnedButton"),
    copyPinnedButton: document.getElementById("copyPinnedButton"),
    clearPinnedButton: document.getElementById("clearPinnedButton"),
    clearFavoritesButton: document.getElementById("clearFavoritesButton"),
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
    els.minNewFilter,
    els.sponsorTierFilter,
    els.minEntryFilter,
    els.minWageFilter,
    els.reviewFilter
  ].forEach(control => {
    control.addEventListener("input", handleFilterChange);
    control.addEventListener("change", handleFilterChange);
  });

  els.resetFiltersButton.addEventListener("click", resetFilters);
  els.openTopFiveButton.addEventListener("click", openTopFive);
  els.copyTopFiveButton.addEventListener("click", copyTopFive);
  els.openSelectedButton.addEventListener("click", openCheckedEmployers);
  els.copySelectedButton.addEventListener("click", copyCheckedPackets);
  els.copyPacketsButton.addEventListener("click", copyVisiblePackets);
  els.copyCsvButton.addEventListener("click", copyVisibleCsv);
  els.clearCheckedButton.addEventListener("click", clearCheckedEmployers);
  els.copySyncButton.addEventListener("click", copySyncLink);
  els.openPinnedButton.addEventListener("click", openPinnedEmployers);
  els.copyPinnedButton.addEventListener("click", copyPinnedPackets);
  els.clearPinnedButton.addEventListener("click", clearPinnedEmployers);
  els.clearFavoritesButton.addEventListener("click", clearFavoriteEmployers);
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
      persistPreferences();
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
  fillSelect(els.reviewFilter, "All review flags", collectValues(rows, "employerReviewFlag"));
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
  syncActionButtons();
  renderPinnedEmployers();
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
  const key = getEmployerKey(row);
  if (state.pinnedEmployers.has(key)) {
    card.classList.add("is-pinned");
  }
  if (state.favoriteEmployers.has(key)) {
    card.classList.add("is-favorite");
  }
  if (state.checkedEmployers.has(key)) {
    card.classList.add("is-checked");
  }

  const cardControls = document.createElement("div");
  cardControls.className = "card-controls";
  const checkLabel = document.createElement("label");
  checkLabel.className = "check-control";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = state.checkedEmployers.has(key);
  checkbox.addEventListener("change", () => toggleCheckedEmployer(row, checkbox.checked));
  checkLabel.append(checkbox, document.createElement("span"));
  checkLabel.lastChild.textContent = "Select";
  cardControls.append(
    checkLabel,
    createButton(state.pinnedEmployers.has(key) ? "Unpin" : "Pin", () => togglePinnedEmployer(row)),
    createButton(state.favoriteEmployers.has(key) ? "Unfavorite" : "Favorite", () => toggleFavoriteEmployer(row))
  );

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
    row.employerReviewFlag,
    state.favoriteEmployers.has(key) ? "favorite" : ""
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

  card.append(cardControls, heading, pills, note, evidence, rolePills, createActions(row, sheetName));
  return card;
}

function createActions(row, sheetName) {
  const actions = document.createElement("div");
  actions.className = "card-actions";
  getEmployerActionItems(row).forEach(action => actions.appendChild(createLink(action.label, action.url)));
  actions.append(
    createButton("Update Link", () => editCareerLink(row)),
    createButton("Reset Link", () => resetCareerLink(row)),
    createButton("Open All", () => openEmployerLinkPack(row)),
    createButton("Copy All", () => copyEmployerLinkPack(row)),
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
    persistPreferences();
    render();
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

function renderPinnedEmployers() {
  const rows = getSavedEmployerRows();
  els.pinnedCount.textContent = `${formatNumber(state.pinnedEmployers.size)} pinned / ${formatNumber(state.favoriteEmployers.size)} favorites`;
  els.openPinnedButton.disabled = rows.length === 0;
  els.copyPinnedButton.disabled = rows.length === 0;
  els.clearPinnedButton.disabled = rows.length === 0;
  els.clearFavoritesButton.disabled = state.favoriteEmployers.size === 0;

  if (!rows.length) {
    const empty = document.createElement("article");
    empty.className = "company-card empty-card";
    empty.append(
      createElement("h3", "No saved H-1B companies yet"),
      createElement("p", "Use Pin or Favorite on any employer card to keep the company here with all actions available.", "muted")
    );
    els.pinnedEmployersGrid.replaceChildren(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  rows.forEach(row => fragment.appendChild(createEmployerCard(row, row._sourceSheet || "Personalized Shortlist")));
  els.pinnedEmployersGrid.replaceChildren(fragment);
}

function syncActionButtons() {
  const selectedRows = getVisibleCheckedRows();
  const uncheckedRows = getUncheckedEmployerRows();
  const batchSize = Math.min(5, uncheckedRows.length);
  els.openTopFiveButton.textContent = selectedRows.length ? `Open Next ${batchSize || 5}` : `Open Top ${batchSize || 5}`;
  els.openTopFiveButton.disabled = uncheckedRows.length === 0;
  els.copyTopFiveButton.textContent = selectedRows.length ? `Copy Next ${batchSize || 5}` : `Copy Top ${batchSize || 5}`;
  els.copyTopFiveButton.disabled = uncheckedRows.length === 0;
  els.openSelectedButton.disabled = selectedRows.length === 0;
  els.copySelectedButton.disabled = selectedRows.length === 0;
  els.clearCheckedButton.disabled = state.checkedEmployers.size === 0;
}

function handleFilterChange() {
  persistPreferences();
  render();
}

function toggleCheckedEmployer(row, checked) {
  const key = getEmployerKey(row);
  if (!key) return;
  if (checked) {
    state.checkedEmployers.add(key);
  } else {
    state.checkedEmployers.delete(key);
  }
  persistPreferences();
  render();
}

function togglePinnedEmployer(row, forcePinned) {
  const key = getEmployerKey(row);
  if (!key) return;
  const shouldPin = typeof forcePinned === "boolean" ? forcePinned : !state.pinnedEmployers.has(key);
  if (shouldPin) {
    state.pinnedEmployers.add(key);
  } else {
    state.pinnedEmployers.delete(key);
  }
  persistPreferences();
  render();
  showToast(`${row.employerName || "Employer"} ${shouldPin ? "pinned" : "unpinned"}`);
}

function toggleFavoriteEmployer(row, forceFavorite) {
  const key = getEmployerKey(row);
  if (!key) return;
  const shouldFavorite = typeof forceFavorite === "boolean" ? forceFavorite : !state.favoriteEmployers.has(key);
  if (shouldFavorite) {
    state.favoriteEmployers.add(key);
  } else {
    state.favoriteEmployers.delete(key);
  }
  persistPreferences();
  render();
  showToast(`${row.employerName || "Employer"} ${shouldFavorite ? "favorited" : "unfavorited"}`);
}

function clearCheckedEmployers() {
  state.checkedEmployers.clear();
  persistPreferences();
  render();
  showToast("Cleared selected employers");
}

function clearPinnedEmployers() {
  state.pinnedEmployers.clear();
  persistPreferences();
  render();
  showToast("Cleared pinned employers");
}

function clearFavoriteEmployers() {
  state.favoriteEmployers.clear();
  persistPreferences();
  render();
  showToast("Cleared favorite employers");
}

function openTopFive() {
  const rows = getUncheckedEmployerRows().slice(0, 5);
  openCareerLinks(rows, "All visible employers are already selected", `Opened ${rows.length} employer links`, { markChecked: true });
}

function copyTopFive() {
  const rows = getUncheckedEmployerRows().slice(0, 5);
  if (!rows.length) {
    showToast("All visible employers are already selected");
    return;
  }
  copyEmployerCareerLinks(rows, `Copied ${rows.length} employer career links`);
}

function openCheckedEmployers() {
  openCareerLinks(getVisibleCheckedRows(), "Select visible employers first", "Opened selected employer links");
}

function openPinnedEmployers() {
  openCareerLinks(getSavedEmployerRows(), "Save employers first", "Opened saved employer links");
}

function openCareerLinks(rows, emptyMessage, successMessage, options = {}) {
  const links = rows.map(getCareerUrl).filter(Boolean);
  if (!links.length) {
    showToast(emptyMessage);
    return;
  }
  if (options.markChecked) {
    rows.forEach(row => {
      const key = getEmployerKey(row);
      if (key) state.checkedEmployers.add(key);
    });
    persistPreferences();
  }
  links.forEach(url => window.open(url, "_blank", "noopener"));
  if (options.markChecked) {
    render();
  }
  showToast(successMessage);
}

function copyCheckedPackets() {
  const rows = getVisibleCheckedRows();
  if (!rows.length) {
    showToast("Select visible employers first");
    return;
  }
  copyRowsAsPackets(rows);
}

function copyPinnedPackets() {
  const rows = getSavedEmployerRows();
  if (!rows.length) {
    showToast("Save employers first");
    return;
  }
  copyRowsAsPackets(rows);
}

function getSavedEmployerRows() {
  const keys = [...new Set([...state.pinnedEmployers, ...state.favoriteEmployers])];
  return keys.map(getEmployerByKey).filter(Boolean);
}

function getUncheckedEmployerRows() {
  return state.visibleRows
    .filter(row => row.employerName)
    .filter(row => !state.checkedEmployers.has(getEmployerKey(row)));
}

function copyEmployerCareerLinks(rows, message) {
  const links = rows.map(row => `${row.employerName || "Employer"}: ${getCareerUrl(row)}`).filter(Boolean);
  if (!links.length) {
    showToast("No links to copy");
    return;
  }
  copyText(links.join("\n"), message);
}

function openEmployerLinkPack(row) {
  const links = getEmployerLinkPack(row);
  if (!links.length) {
    showToast("No links to open");
    return;
  }
  links.forEach(url => window.open(url, "_blank", "noopener"));
  showToast(`Opened ${links.length} links for ${row.employerName || "employer"}`);
}

function copyEmployerLinkPack(row) {
  const lines = getEmployerActionItems(row).map(action => `${action.label}: ${action.url}`);
  copyText(lines.join("\n"), `Copied links for ${row.employerName || "employer"}`);
}

function editCareerLink(row) {
  const current = getCareerUrl(row);
  const next = window.prompt(`Update saved career/search link for ${row.employerName || "this employer"}`, current);
  if (next === null) return;
  const trimmed = next.trim();
  const key = getEmployerKey(row);
  if (!trimmed) {
    delete state.customCareerLinks[key];
    persistPreferences();
    render();
    showToast("Custom link removed");
    return;
  }
  if (!/^https?:\/\//i.test(trimmed)) {
    showToast("Use a full https:// link");
    return;
  }
  state.customCareerLinks[key] = trimmed;
  persistPreferences();
  render();
  showToast("Custom link saved");
}

function resetCareerLink(row) {
  const key = getEmployerKey(row);
  delete state.customCareerLinks[key];
  persistPreferences();
  render();
  showToast("Career link reset");
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
  if (els.sponsorTierFilter.value && getSponsorTier(row) !== els.sponsorTierFilter.value) return false;
  if (Number(els.minEntryFilter.value || 0) && Number(row.explicitEntryCases || 0) < Number(els.minEntryFilter.value)) return false;
  if (Number(els.minWageFilter.value || 0) && Number(row.medianAnnualWage || 0) < Number(els.minWageFilter.value)) return false;
  if (els.reviewFilter.value && row.employerReviewFlag !== els.reviewFilter.value) return false;
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
  if (els.sponsorTierFilter.value && getSponsorTier(row) !== els.sponsorTierFilter.value) return false;
  if (Number(els.minEntryFilter.value || 0) && Number(row.explicitEntryCases || 0) < Number(els.minEntryFilter.value)) return false;
  if (Number(els.minWageFilter.value || 0) && Number(row.medianAnnualWage || 0) < Number(els.minWageFilter.value)) return false;
  if (els.reviewFilter.value && row.employerReviewFlag !== els.reviewFilter.value) return false;
  return true;
}

function getSponsorTier(row) {
  const score = Number(row.candidateFitScore || 0);
  const positions = Number(row.newEmploymentPositions || 0);
  const evidence = normalize(row.sponsorshipEvidence);
  if (score >= 88 || positions >= 200 || evidence.includes("strong")) return "tier1";
  if (score >= 82 || positions >= 25 || evidence.includes("moderate")) return "tier2";
  return "tier3";
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
    els.minNewFilter,
    els.minEntryFilter,
    els.minWageFilter
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
    els.modelFilter,
    els.sponsorTierFilter,
    els.reviewFilter
  ].forEach(select => {
    select.value = "";
  });
  persistPreferences();
  render();
}

function getEmployerActionItems(row) {
  const actions = [
    { label: "Careers", url: getCareerUrl(row) },
    { label: "Command Center", url: buildCommandCenterUrl(row) },
    { label: "Google Company", url: buildGoogleCompanyUrl(row) },
    { label: "LinkedIn Jobs", url: buildLinkedInJobsUrl(row) },
    { label: "LinkedIn Posts", url: buildLinkedInPostsUrl(row) },
    { label: "LinkedIn Recruiters", url: buildLinkedInRecruiterUrl(row) },
    { label: "LinkedIn Company", url: buildLinkedInCompanyUrl(row) },
    { label: "Indeed", url: buildIndeedUrl(row) }
  ];
  return actions.filter(action => action.url);
}

function getEmployerLinkPack(row) {
  return getEmployerActionItems(row).map(action => action.url).filter(Boolean);
}

function getCareerUrl(row) {
  const key = getEmployerKey(row);
  return state.customCareerLinks[key] || row.careerSearchUrl || buildGoogleCompanyUrl(row);
}

function hasCustomCareerLink(row) {
  return Boolean(state.customCareerLinks[getEmployerKey(row)]);
}

function getCheckedRows() {
  return Array.from(state.checkedEmployers).map(getEmployerByKey).filter(Boolean);
}

function getVisibleCheckedRows() {
  return state.visibleRows
    .filter(row => row.employerName)
    .filter(row => state.checkedEmployers.has(getEmployerKey(row)));
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
    `Career link: ${getCareerUrl(row)}`,
    `LinkedIn jobs: ${buildLinkedInJobsUrl(row)}`,
    `Command Center: ${buildCommandCenterUrl(row)}`
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

function getPreferencesSnapshot() {
  return {
    tab: state.tab,
    rawSheet: state.rawSheet,
    filters: {
      search: els.searchInput.value,
      roleFamily: els.roleFamilyFilter.value,
      state: els.stateFilter.value,
      city: els.cityFilter.value,
      priority: els.priorityFilter.value,
      evidence: els.evidenceFilter.value,
      confidence: els.confidenceFilter.value,
      model: els.modelFilter.value,
      minScore: els.minScoreFilter.value,
      minNew: els.minNewFilter.value,
      sponsorTier: els.sponsorTierFilter.value,
      minEntry: els.minEntryFilter.value,
      minWage: els.minWageFilter.value,
      review: els.reviewFilter.value
    },
    pinnedEmployers: Array.from(state.pinnedEmployers),
    favoriteEmployers: Array.from(state.favoriteEmployers),
    checkedEmployers: Array.from(state.checkedEmployers),
    customCareerLinks: sanitizeCustomLinks(state.customCareerLinks)
  };
}

function persistPreferences() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(getPreferencesSnapshot()));
}

function loadPreferences() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (stored) applyPreferences(stored);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function applySyncFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("h1bPrefs");
  if (!token) return;
  const prefs = decodeSyncToken(token);
  if (!prefs) {
    showToast("Sync link could not be read");
    return;
  }
  applyPreferences(prefs);
  persistPreferences();
  showToast("H-1B settings synced");
}

function applyPreferences(prefs) {
  if (!prefs || typeof prefs !== "object") return;
  const validTab = ALL_TABS.some(tab => tab.id === prefs.tab);
  if (validTab) state.tab = prefs.tab;
  if (DATA.sheets[prefs.rawSheet]) state.rawSheet = prefs.rawSheet;

  const filters = prefs.filters || {};
  setControlValue(els.searchInput, filters.search || "");
  setControlValue(els.roleFamilyFilter, filters.roleFamily || "");
  setControlValue(els.stateFilter, filters.state || "");
  setControlValue(els.cityFilter, filters.city || "");
  setControlValue(els.priorityFilter, filters.priority || "");
  setControlValue(els.evidenceFilter, filters.evidence || "");
  setControlValue(els.confidenceFilter, filters.confidence || "");
  setControlValue(els.modelFilter, filters.model || "");
  setControlValue(els.minScoreFilter, filters.minScore || "");
  setControlValue(els.minNewFilter, filters.minNew || "");
  setControlValue(els.sponsorTierFilter, filters.sponsorTier || "");
  setControlValue(els.minEntryFilter, filters.minEntry || "");
  setControlValue(els.minWageFilter, filters.minWage || "");
  setControlValue(els.reviewFilter, filters.review || "");

  state.pinnedEmployers = new Set(Array.isArray(prefs.pinnedEmployers) ? prefs.pinnedEmployers : []);
  state.favoriteEmployers = new Set(Array.isArray(prefs.favoriteEmployers) ? prefs.favoriteEmployers : []);
  state.checkedEmployers = new Set(Array.isArray(prefs.checkedEmployers) ? prefs.checkedEmployers : []);
  state.customCareerLinks = sanitizeCustomLinks(prefs.customCareerLinks || {});
}

function setControlValue(control, value) {
  if (!control) return;
  if (control.tagName === "SELECT") {
    control.value = [...control.options].some(option => option.value === value) ? value : "";
  } else {
    control.value = value;
  }
}

function sanitizeCustomLinks(links) {
  if (!links || typeof links !== "object" || Array.isArray(links)) return {};
  return Object.fromEntries(Object.entries(links).filter(([, value]) => typeof value === "string" && /^https?:\/\//i.test(value)));
}

function copySyncLink() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("h1bPrefs", encodeSyncToken(getPreferencesSnapshot()));
  copyText(url.toString(), "Copied portable H-1B sync link");
}

function encodeSyncToken(value) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(value))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function decodeSyncToken(token) {
  try {
    const normalized = token.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    return JSON.parse(decodeURIComponent(escape(atob(padded))));
  } catch {
    return null;
  }
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

function getEmployerKey(row) {
  if (!row) return "";
  return row._employerKey || normalizeEmployerKey(row.employerName);
}

function normalizeEmployerKey(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/[^A-Z0-9 ]+/g, " ")
    .replace(/\b(INCORPORATED|INC|CORPORATION|CORP|COMPANY|CO|LLC|LLP|LP|LTD|LIMITED|PLC)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getEmployerByKey(key) {
  if (!key) return null;
  for (const sheetName of PRIMARY_EMPLOYER_SHEETS) {
    const row = getSheetRows(sheetName).find(item => getEmployerKey(item) === key);
    if (row) return row;
  }
  return null;
}

function buildGoogleCompanyUrl(row) {
  const query = `"${row.employerName || ""}" careers jobs sponsorship ${DEFAULT_ROLE_QUERY}`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function buildLinkedInJobsUrl(row) {
  const params = new URLSearchParams();
  params.set("keywords", `${row.employerName || ""} ${DEFAULT_ROLE_QUERY}`);
  params.set("location", "United States");
  params.set("sortBy", "DD");
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

function buildLinkedInPostsUrl(row) {
  const params = new URLSearchParams();
  params.set("keywords", `"${row.employerName || ""}" hiring ${DEFAULT_ROLE_QUERY}`);
  params.set("origin", "GLOBAL_SEARCH_HEADER");
  params.set("sortBy", "[\"date_posted\"]");
  params.set("datePosted", "[\"past-week\"]");
  params.set("contentType", "[\"jobs\"]");
  return `https://www.linkedin.com/search/results/content/?${params.toString()}`;
}

function buildLinkedInRecruiterUrl(row) {
  const params = new URLSearchParams();
  params.set("keywords", `"${row.employerName || ""}" recruiter "talent acquisition" ${DEFAULT_ROLE_QUERY}`);
  params.set("origin", "GLOBAL_SEARCH_HEADER");
  return `https://www.linkedin.com/search/results/people/?${params.toString()}`;
}

function buildLinkedInCompanyUrl(row) {
  const params = new URLSearchParams();
  params.set("keywords", row.employerName || "");
  params.set("origin", "GLOBAL_SEARCH_HEADER");
  return `https://www.linkedin.com/search/results/companies/?${params.toString()}`;
}

function buildIndeedUrl(row) {
  const params = new URLSearchParams();
  params.set("q", `${row.employerName || ""} ${DEFAULT_ROLE_QUERY}`);
  params.set("l", "United States");
  params.set("sort", "date");
  return `https://www.indeed.com/jobs?${params.toString()}`;
}

function buildCommandCenterUrl(row) {
  const params = new URLSearchParams();
  params.set("profile", "freshDirect");
  params.set("rolePack", "all-role-families");
  params.set("companyRole", "Software Engineer");
  params.set("companyFilter", row.employerName || "");
  params.set("companyLocation", "usa");
  params.set("companyTime", "24hours");
  params.set("companySort", "latest");
  return `../?${params.toString()}#careersHeading`;
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
