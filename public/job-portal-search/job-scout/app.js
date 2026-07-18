"use strict";

const STORAGE_KEY = "taranJobScoutVaultV1";
const BACKUP_KEY = "taranJobScoutVaultBackupV1";

const state = {
  candidates: [],
  selectedCandidateId: "",
  checkedSources: new Set(["linkedinJobs", "indeed", "googleFresh", "directAts", "linkedinPosts"]),
  pinnedSources: new Set(["linkedinJobs", "indeed", "googleFresh"]),
  theme: "dark"
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  loadVault();
  hydrateFromUrl();
  bindEvents();
  renderAll();
  saveVault();
});

function cacheElements() {
  Object.assign(els, {
    vaultStatus: document.getElementById("vaultStatus"),
    themeToggle: document.getElementById("themeToggle"),
    targetRoles: document.getElementById("targetRoles"),
    roleVariants: document.getElementById("roleVariants"),
    skillTerms: document.getElementById("skillTerms"),
    locationTerms: document.getElementById("locationTerms"),
    domainTerms: document.getElementById("domainTerms"),
    levelTerms: document.getElementById("levelTerms"),
    authTerms: document.getElementById("authTerms"),
    minScore: document.getElementById("minScore"),
    freshness: document.getElementById("freshness"),
    customSources: document.getElementById("customSources"),
    saveProfileButton: document.getElementById("saveProfileButton"),
    copySyncButton: document.getElementById("copySyncButton"),
    sourceGrid: document.getElementById("sourceGrid"),
    openTopSearchesButton: document.getElementById("openTopSearchesButton"),
    copySearchesButton: document.getElementById("copySearchesButton"),
    leadTitle: document.getElementById("leadTitle"),
    leadCompany: document.getElementById("leadCompany"),
    leadLocation: document.getElementById("leadLocation"),
    leadPosted: document.getElementById("leadPosted"),
    leadSource: document.getElementById("leadSource"),
    leadUrl: document.getElementById("leadUrl"),
    leadDescription: document.getElementById("leadDescription"),
    clearLeadButton: document.getElementById("clearLeadButton"),
    scoreLeadButton: document.getElementById("scoreLeadButton"),
    resultSort: document.getElementById("resultSort"),
    showOnlyPassed: document.getElementById("showOnlyPassed"),
    resultsGrid: document.getElementById("resultsGrid"),
    copyRankedButton: document.getElementById("copyRankedButton"),
    exportVaultButton: document.getElementById("exportVaultButton"),
    importVaultButton: document.getElementById("importVaultButton"),
    copyPacketButton: document.getElementById("copyPacketButton"),
    packetPreview: document.getElementById("packetPreview"),
    metricLeads: document.getElementById("metricLeads"),
    metricPassed: document.getElementById("metricPassed"),
    metricAvg: document.getElementById("metricAvg"),
    toast: document.getElementById("toast")
  });
}

function bindEvents() {
  [
    els.targetRoles,
    els.roleVariants,
    els.skillTerms,
    els.locationTerms,
    els.domainTerms,
    els.levelTerms,
    els.authTerms,
    els.minScore,
    els.freshness,
    els.customSources
  ].forEach(control => {
    control.addEventListener("change", () => {
      saveVault();
      renderAll();
    });
  });

  els.saveProfileButton.addEventListener("click", () => {
    saveVault();
    renderAll();
    showToast("Scout profile saved");
  });
  els.copySyncButton.addEventListener("click", copySyncLink);
  els.openTopSearchesButton.addEventListener("click", openTopSearches);
  els.copySearchesButton.addEventListener("click", copyAllSearches);
  els.scoreLeadButton.addEventListener("click", scoreLeadFromForm);
  els.clearLeadButton.addEventListener("click", clearLeadForm);
  els.resultSort.addEventListener("change", renderResults);
  els.showOnlyPassed.addEventListener("change", renderResults);
  els.copyRankedButton.addEventListener("click", copyRankedTable);
  els.exportVaultButton.addEventListener("click", exportVault);
  els.importVaultButton.addEventListener("click", importVault);
  els.copyPacketButton.addEventListener("click", copySelectedPacket);
  els.themeToggle.addEventListener("click", toggleTheme);
  window.addEventListener("beforeunload", saveVault);
}

function getProfile() {
  return {
    targetRoles: splitTerms(els.targetRoles.value),
    roleVariants: splitTerms(els.roleVariants.value),
    skills: splitTerms(els.skillTerms.value),
    locations: splitTerms(els.locationTerms.value),
    domains: splitTerms(els.domainTerms.value),
    levels: splitTerms(els.levelTerms.value),
    authTerms: splitTerms(els.authTerms.value),
    minScore: Number(els.minScore.value || 6),
    freshness: els.freshness.value,
    customSources: els.customSources.value
  };
}

function splitTerms(value) {
  return String(value || "")
    .split(/\r?\n|,/)
    .map(item => item.trim())
    .filter(Boolean);
}

function loadVault() {
  const saved = normalizeVault(readJson(STORAGE_KEY));
  const backup = normalizeVault(readJson(BACKUP_KEY));
  const vault = {
    ...saved,
    candidates: mergeCandidates(backup.candidates, saved.candidates),
    checkedSources: [...new Set([...backup.checkedSources, ...saved.checkedSources])],
    pinnedSources: [...new Set([...backup.pinnedSources, ...saved.pinnedSources])]
  };
  applyVault(vault);
}

function readJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") || null;
  } catch (error) {
    return null;
  }
}

function normalizeVault(raw) {
  const source = raw || {};
  return {
    profile: source.profile && typeof source.profile === "object" ? source.profile : {},
    candidates: Array.isArray(source.candidates) ? source.candidates.filter(item => item && item.id) : [],
    selectedCandidateId: typeof source.selectedCandidateId === "string" ? source.selectedCandidateId : "",
    checkedSources: Array.isArray(source.checkedSources) ? source.checkedSources.filter(Boolean) : [],
    pinnedSources: Array.isArray(source.pinnedSources) ? source.pinnedSources.filter(Boolean) : [],
    theme: source.theme === "light" ? "light" : "dark",
    updatedAt: source.updatedAt || ""
  };
}

function applyVault(vault) {
  const profile = vault.profile || {};
  setValue(els.targetRoles, profile.targetRoles || els.targetRoles.value);
  setValue(els.roleVariants, profile.roleVariants || els.roleVariants.value);
  setValue(els.skillTerms, profile.skills || els.skillTerms.value);
  setValue(els.locationTerms, profile.locations || els.locationTerms.value);
  setValue(els.domainTerms, profile.domains || els.domainTerms.value);
  setValue(els.levelTerms, profile.levels || els.levelTerms.value);
  setValue(els.authTerms, profile.authTerms || els.authTerms.value);
  setValue(els.minScore, profile.minScore || els.minScore.value);
  setValue(els.freshness, profile.freshness || els.freshness.value);
  setValue(els.customSources, profile.customSources || els.customSources.value);
  state.candidates = mergeCandidates(state.candidates, vault.candidates || []);
  state.selectedCandidateId = vault.selectedCandidateId || state.selectedCandidateId;
  state.checkedSources = new Set(vault.checkedSources.length ? vault.checkedSources : Array.from(state.checkedSources));
  state.pinnedSources = new Set(vault.pinnedSources.length ? vault.pinnedSources : Array.from(state.pinnedSources));
  state.theme = vault.theme || state.theme;
  document.documentElement.classList.toggle("dark", state.theme !== "light");
  syncThemeButton();
}

function setValue(control, value) {
  if (Array.isArray(value)) {
    control.value = control.tagName === "TEXTAREA" ? value.join("\n") : value.join(", ");
    return;
  }
  if (control.tagName === "SELECT") {
    control.value = [...control.options].some(option => option.value === String(value)) ? String(value) : control.value;
    return;
  }
  control.value = value == null ? "" : String(value);
}

function saveVault() {
  const vault = {
    profile: getProfile(),
    candidates: state.candidates,
    selectedCandidateId: state.selectedCandidateId,
    checkedSources: Array.from(state.checkedSources),
    pinnedSources: Array.from(state.pinnedSources),
    theme: state.theme,
    updatedAt: new Date().toISOString()
  };
  const serialized = JSON.stringify(vault);
  localStorage.setItem(STORAGE_KEY, serialized);
  localStorage.setItem(BACKUP_KEY, serialized);
  syncVaultStatus(vault);
}

function hydrateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("scout");
  if (!token) {
    return;
  }
  const decoded = decodeToken(token);
  if (!decoded) {
    showToast("Scout sync link could not be read");
    return;
  }
  applyVault(normalizeVault(decoded));
  saveVault();
  showToast("Scout sync loaded");
}

function syncVaultStatus(vault = normalizeVault(readJson(STORAGE_KEY))) {
  const passed = getScoredCandidates().filter(item => item.score >= getProfile().minScore).length;
  els.vaultStatus.textContent = `${vault.candidates.length} leads, ${passed} passed, saved ${formatTime(vault.updatedAt)}`;
}

function renderAll() {
  renderSources();
  rescoreAll();
  renderResults();
  renderPacket();
}

function getSourceDefinitions() {
  const profile = getProfile();
  const role = getPrimaryRole(profile);
  const location = getPrimaryLocation(profile);
  const custom = parseCustomSources(profile.customSources, profile, role, location);
  const builtIns = [
    {
      id: "linkedinJobs",
      name: "LinkedIn Jobs",
      note: "Native LinkedIn job search with fresh and entry-level filters.",
      health: "native clean",
      priority: 100,
      url: buildLinkedInJobsUrl(role, location, profile)
    },
    {
      id: "indeed",
      name: "Indeed",
      note: "Compact native query with date sorting.",
      health: "native clean",
      priority: 94,
      url: buildIndeedUrl(role, location, profile)
    },
    {
      id: "googleFresh",
      name: "Google Fresh Jobs",
      note: "Google advanced date search across job posts and career pages.",
      health: "Google advanced",
      priority: 92,
      url: buildGoogleUrl(buildGoogleJobQuery(role, location, profile), profile.freshness)
    },
    {
      id: "directAts",
      name: "Direct ATS Radar",
      note: "Greenhouse, Lever, Ashby, Workday, and SmartRecruiters search.",
      health: "direct apply",
      priority: 90,
      url: buildGoogleUrl(`${quote(role)} (${profile.levels.map(quote).join(" OR ")}) (site:greenhouse.io OR site:jobs.lever.co OR site:ashbyhq.com OR site:myworkdayjobs.com OR site:smartrecruiters.com) ${location}`, profile.freshness)
    },
    {
      id: "linkedinPosts",
      name: "LinkedIn Posts",
      note: "Recruiter and hiring posts sorted by newest.",
      health: "minute signal",
      priority: 88,
      url: buildLinkedInPostsUrl(role, location, profile)
    },
    {
      id: "h1bIntel",
      name: "H1B Intelligence",
      note: "Open sponsor targets with your current role context.",
      health: "OPT research",
      priority: 86,
      url: `../h1b-intelligence/?h1bTab=applyFirst`
    },
    {
      id: "builtin",
      name: "Built In",
      note: "Tech/startup board with US city coverage.",
      health: "native broad",
      priority: 80,
      url: `https://builtin.com/jobs?search=${encodeURIComponent(role)}&location=${encodeURIComponent(location)}`
    },
    {
      id: "dice",
      name: "Dice",
      note: "Technology-heavy job board.",
      health: "native broad",
      priority: 78,
      url: `https://www.dice.com/jobs?q=${encodeURIComponent(role)}&location=${encodeURIComponent(location)}&radius=30&radiusUnit=mi&page=1&pageSize=20&filters.postedDate=ONE`
    },
    {
      id: "simplify",
      name: "Simplify",
      note: "Fast apply and new-grad friendly discovery.",
      health: "direct apply",
      priority: 76,
      url: `https://simplify.jobs/jobs?query=${encodeURIComponent(role)}`
    },
    {
      id: "hiringCafe",
      name: "HiringCafe",
      note: "Fast job search engine with broad company coverage.",
      health: "native broad",
      priority: 74,
      url: `https://hiring.cafe/?search=${encodeURIComponent(role)}`
    },
    {
      id: "wellfound",
      name: "Wellfound",
      note: "Startup roles and early-stage companies.",
      health: "startup",
      priority: 70,
      url: `https://wellfound.com/jobs?keyword=${encodeURIComponent(role)}`
    },
    {
      id: "yc",
      name: "YC Work at a Startup",
      note: "Y Combinator company jobs.",
      health: "startup",
      priority: 68,
      url: `https://www.ycombinator.com/jobs?query=${encodeURIComponent(role)}`
    }
  ];
  return [...builtIns, ...custom].sort((a, b) =>
    Number(state.pinnedSources.has(b.id)) - Number(state.pinnedSources.has(a.id)) ||
    b.priority - a.priority
  );
}

function parseCustomSources(raw, profile, role, location) {
  return String(raw || "")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const match = line.match(/^(.+?)\s*(?:\||=>)\s*(https?:\/\/.+)$/i);
      const label = match ? match[1].trim() : `Custom Source ${index + 1}`;
      const template = match ? match[2].trim() : line;
      const url = applyTemplate(template, {
        role,
        query: buildCompactQuery(role, profile),
        location,
        time: profile.freshness
      });
      return /^https?:\/\//i.test(url) ? {
        id: `custom-${slug(label)}-${index}`,
        name: label,
        note: "Saved custom scout link.",
        health: "custom",
        priority: 66 - index,
        url
      } : null;
    })
    .filter(Boolean);
}

function renderSources() {
  const sources = getSourceDefinitions();
  els.sourceGrid.innerHTML = "";
  sources.forEach(source => {
    const card = document.createElement("article");
    card.className = "source-card";
    if (state.checkedSources.has(source.id)) {
      card.classList.add("is-selected");
    }
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = state.checkedSources.has(source.id);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) state.checkedSources.add(source.id);
      else state.checkedSources.delete(source.id);
      saveVault();
      renderSources();
    });
    const title = document.createElement("h3");
    title.textContent = source.name;
    const note = document.createElement("p");
    note.textContent = source.note;
    const meta = document.createElement("div");
    meta.className = "meta-row";
    meta.append(createPill(source.health), createPill(`Priority ${source.priority}`));
    if (state.pinnedSources.has(source.id)) {
      meta.append(createPill("pinned", "pill-fit"));
    }
    const actions = document.createElement("div");
    actions.className = "card-actions";
    actions.append(createLink("Open", source.url));
    actions.append(createButton("Copy", () => copyText(source.url, `Copied ${source.name}`)));
    actions.append(createButton(state.pinnedSources.has(source.id) ? "Unpin" : "Pin", () => toggleSourcePin(source.id)));
    card.append(checkbox, title, note, meta, actions);
    els.sourceGrid.appendChild(card);
  });
}

function toggleSourcePin(id) {
  if (state.pinnedSources.has(id)) state.pinnedSources.delete(id);
  else state.pinnedSources.add(id);
  saveVault();
  renderSources();
}

function getSelectedSources(limit) {
  const sources = getSourceDefinitions().filter(source => state.checkedSources.has(source.id));
  return typeof limit === "number" ? sources.slice(0, limit) : sources;
}

function openTopSearches() {
  getSelectedSources(5).forEach(source => window.open(source.url, "_blank", "noopener"));
  showToast("Opened top scout searches");
}

function copyAllSearches() {
  const lines = getSelectedSources().map(source => `${source.name}: ${source.url}`);
  copyText(lines.join("\n"), `Copied ${lines.length} scout searches`);
}

function scoreLeadFromForm() {
  const lead = {
    id: "",
    title: els.leadTitle.value.trim(),
    company: els.leadCompany.value.trim(),
    location: els.leadLocation.value.trim(),
    posted: els.leadPosted.value,
    source: els.leadSource.value.trim() || "Manual",
    url: els.leadUrl.value.trim(),
    description: els.leadDescription.value.trim(),
    addedAt: new Date().toISOString()
  };
  if (!lead.title || !lead.company) {
    showToast("Add a job title and company first");
    return;
  }
  if (lead.url && !/^https?:\/\//i.test(lead.url)) {
    showToast("Apply URL must start with http:// or https://");
    return;
  }
  lead.id = candidateId(lead);
  const scored = scoreCandidate(lead, getProfile());
  state.candidates = mergeCandidates(state.candidates.filter(item => item.id !== scored.id), [scored]);
  state.selectedCandidateId = scored.id;
  saveVault();
  clearLeadForm();
  renderAll();
  showToast(`${scored.company} scored ${scored.score.toFixed(1)}/10`);
}

function clearLeadForm() {
  [els.leadTitle, els.leadCompany, els.leadLocation, els.leadSource, els.leadUrl, els.leadDescription].forEach(input => {
    input.value = "";
  });
  els.leadPosted.value = "today";
}

function rescoreAll() {
  const profile = getProfile();
  state.candidates = state.candidates.map(candidate => scoreCandidate(candidate, profile));
}

function scoreCandidate(candidate, profile) {
  const text = normalize(`${candidate.title} ${candidate.company} ${candidate.location} ${candidate.description}`);
  const titleText = normalize(candidate.title);
  const roleTerms = [...profile.targetRoles, ...profile.roleVariants];
  const roleMatches = roleTerms.filter(term => includesTerm(titleText, term));
  const roleScore = roleMatches.length ? 2 : /\b(engineer|developer|analyst|scientist|cloud|data|software|machine)\b/i.test(candidate.title) ? 1.2 : 0;

  const responsibilityTerms = ["build", "develop", "ship", "api", "pipeline", "dashboard", "model", "deploy", "cloud", "analysis", "etl", "frontend", "backend", "full stack", "production", "automation"];
  const responsibilityHits = responsibilityTerms.filter(term => includesTerm(text, term));
  const responsibilityScore = responsibilityHits.length >= 5 ? 2 : responsibilityHits.length >= 2 ? 1 : 0;

  const skillHits = profile.skills.filter(term => includesTerm(text, term));
  const skillRatio = profile.skills.length ? skillHits.length / profile.skills.length : 0;
  const skillsScore = skillHits.length >= 5 || skillRatio >= .35 ? 2 : skillHits.length >= 2 ? 1 : 0;

  const seniorFlags = ["senior", "staff", "principal", "lead", "manager", "director", "architect"].filter(term => includesTerm(titleText, term));
  const entryHits = profile.levels.filter(term => includesTerm(text, term));
  const experienceScore = seniorFlags.length ? .7 : entryHits.length ? 2 : 1.4;

  const domainHits = profile.domains.filter(term => includesTerm(text, term));
  const domainScore = domainHits.length ? 1 : 0;

  const locationHits = profile.locations.filter(term => includesTerm(text, term));
  const locationScore = locationHits.length || /\b(remote|united states|usa|u\.s\.)\b/i.test(candidate.location) ? 1 : 0;

  const warnings = getWarnings(text);
  const score = Math.max(0, Math.min(10, roleScore + responsibilityScore + skillsScore + experienceScore + domainScore + locationScore - warnings.penalty));
  const reasons = [
    roleMatches.length ? `Role matched: ${roleMatches.slice(0, 3).join(", ")}` : "Role is adjacent, not exact",
    skillHits.length ? `Skill hits: ${skillHits.slice(0, 6).join(", ")}` : "Few explicit skill hits",
    responsibilityHits.length ? `Work signals: ${responsibilityHits.slice(0, 5).join(", ")}` : "Responsibilities need review",
    locationScore ? "Location matches US/remote target" : "Location needs review",
    domainHits.length ? `Domain hits: ${domainHits.slice(0, 3).join(", ")}` : "Domain not obvious"
  ];
  const gaps = [];
  if (seniorFlags.length) gaps.push(`Possible seniority mismatch: ${seniorFlags.join(", ")}`);
  if (!skillHits.length) gaps.push("Paste fuller description to verify skill overlap");
  if (!locationScore) gaps.push("Confirm US/remote eligibility");
  warnings.items.forEach(item => gaps.push(item));

  return {
    ...candidate,
    score,
    breakdown: {
      role: roleScore,
      responsibilities: responsibilityScore,
      skills: skillsScore,
      experience: experienceScore,
      domain: domainScore,
      location: locationScore
    },
    reasons,
    gaps,
    skillHits,
    roleMatches,
    freshnessRank: getFreshnessRank(candidate.posted),
    scoredAt: new Date().toISOString()
  };
}

function getWarnings(text) {
  const warningTerms = [
    ["US citizenship required", "Citizenship-only wording"],
    ["must be a US citizen", "Citizenship-only wording"],
    ["clearance", "Clearance wording"],
    ["unpaid", "Unpaid warning"],
    ["commission only", "Commission-only warning"]
  ];
  const items = warningTerms.filter(([term]) => includesTerm(text, term)).map(([, label]) => label);
  return { items, penalty: items.length ? Math.min(2, items.length * .8) : 0 };
}

function renderResults() {
  const profile = getProfile();
  const scored = getScoredCandidates();
  const visible = scored.filter(candidate => !els.showOnlyPassed.checked || candidate.score >= profile.minScore);
  els.resultsGrid.innerHTML = "";
  visible.forEach(candidate => {
    const card = document.createElement("article");
    card.className = "job-card";
    if (candidate.id === state.selectedCandidateId) {
      card.classList.add("is-selected");
    }
    const score = document.createElement("div");
    score.className = "score-number";
    score.textContent = `${candidate.score.toFixed(1)}/10`;
    const title = document.createElement("h3");
    title.textContent = `${candidate.title} - ${candidate.company}`;
    const summary = document.createElement("p");
    summary.textContent = `${candidate.location || "Location unknown"} | ${formatPosted(candidate.posted)} | ${candidate.source || "Manual"}`;
    const meta = document.createElement("div");
    meta.className = "meta-row";
    meta.append(createPill(candidate.score >= profile.minScore ? "passed" : "below threshold", candidate.score >= profile.minScore ? "pill-fit" : "pill-warning"));
    meta.append(createPill(formatPosted(candidate.posted), "pill-fresh"));
    candidate.skillHits.slice(0, 4).forEach(skill => meta.append(createPill(skill, "pill-domain")));
    candidate.gaps.slice(0, 2).forEach(gap => meta.append(createPill(gap, "pill-warning")));
    const reasons = document.createElement("p");
    reasons.textContent = candidate.reasons.slice(0, 3).join(" | ");
    const actions = document.createElement("div");
    actions.className = "card-actions";
    if (candidate.url) actions.append(createLink("Apply", candidate.url));
    actions.append(createButton("Select", () => selectCandidate(candidate.id)));
    actions.append(createButton("Copy Packet", () => copyPacket(candidate)));
    actions.append(createButton("Remove", () => removeCandidate(candidate.id)));
    card.append(score, title, summary, meta, reasons, actions);
    els.resultsGrid.appendChild(card);
  });
  if (!visible.length) {
    const empty = document.createElement("article");
    empty.className = "job-card";
    empty.innerHTML = "<h3>No scored jobs yet</h3><p>Add a job lead or lower the threshold to widen the view.</p>";
    els.resultsGrid.appendChild(empty);
  }
  updateMetrics(scored, profile);
  renderPacket();
}

function getScoredCandidates() {
  return [...state.candidates].sort((a, b) => {
    if (els.resultSort.value === "fresh") return b.freshnessRank - a.freshnessRank || b.score - a.score;
    if (els.resultSort.value === "company") return a.company.localeCompare(b.company) || b.score - a.score;
    return b.score - a.score || b.freshnessRank - a.freshnessRank || a.company.localeCompare(b.company);
  });
}

function updateMetrics(scored, profile) {
  const passed = scored.filter(item => item.score >= profile.minScore);
  const average = scored.length ? scored.reduce((sum, item) => sum + item.score, 0) / scored.length : 0;
  els.metricLeads.textContent = String(scored.length);
  els.metricPassed.textContent = String(passed.length);
  els.metricAvg.textContent = average.toFixed(1);
  syncVaultStatus();
}

function selectCandidate(id) {
  state.selectedCandidateId = id;
  saveVault();
  renderResults();
}

function removeCandidate(id) {
  state.candidates = state.candidates.filter(candidate => candidate.id !== id);
  if (state.selectedCandidateId === id) {
    state.selectedCandidateId = state.candidates[0]?.id || "";
  }
  saveVault();
  renderAll();
  showToast("Job lead removed");
}

function renderPacket() {
  const candidate = state.candidates.find(item => item.id === state.selectedCandidateId) || getScoredCandidates()[0];
  if (!candidate) {
    els.packetPreview.textContent = "Select a scored job to build the packet.";
    return;
  }
  els.packetPreview.textContent = buildPacket(candidate);
}

function buildPacket(candidate) {
  const profile = getProfile();
  return [
    `Job Scout Packet - ${candidate.title} at ${candidate.company}`,
    "",
    `Fit score: ${candidate.score.toFixed(1)}/10`,
    `Posted: ${formatPosted(candidate.posted)}`,
    `Location: ${candidate.location || "Unknown"}`,
    `Source: ${candidate.source || "Manual"}`,
    `Apply: ${candidate.url || "No URL pasted"}`,
    "",
    "Why this fits:",
    ...candidate.reasons.map(reason => `- ${reason}`),
    "",
    "Review before applying:",
    ...(candidate.gaps.length ? candidate.gaps.map(gap => `- ${gap}`) : ["- No major gaps detected from pasted text."]),
    "",
    "ATS keywords from my profile:",
    profile.skills.slice(0, 18).join(", "),
    "",
    "OPT wording:",
    "I am an F-1 OPT candidate with current US work authorization. My role must be related to my field of study. For STEM OPT, I will need an employer/payroll setup that supports the required training-plan process and E-Verify where applicable.",
    "",
    "No-fabrication note:",
    "Tailor the resume by reordering and emphasizing verified experience only. Do not invent skills, metrics, employers, dates, or certifications."
  ].join("\n");
}

function copySelectedPacket() {
  const candidate = state.candidates.find(item => item.id === state.selectedCandidateId) || getScoredCandidates()[0];
  if (!candidate) {
    showToast("Score a job first");
    return;
  }
  copyPacket(candidate);
}

function copyPacket(candidate) {
  copyText(buildPacket(candidate), `Copied packet for ${candidate.company}`);
}

function copyRankedTable() {
  const profile = getProfile();
  const rows = getScoredCandidates()
    .filter(candidate => candidate.score >= profile.minScore)
    .slice(0, 20);
  const table = [
    "| # | Role | Company | Posted | Location | Source | Fit | Apply |",
    "|---|------|---------|--------|----------|--------|-----|-------|",
    ...rows.map((candidate, index) => `| ${index + 1} | ${escapeCell(candidate.title)} | ${escapeCell(candidate.company)} | ${formatPosted(candidate.posted)} | ${escapeCell(candidate.location)} | ${escapeCell(candidate.source)} | ${candidate.score.toFixed(1)}/10 | ${candidate.url ? `[Apply](${candidate.url})` : "n/a"} |`)
  ];
  copyText(table.join("\n"), `Copied ${rows.length} ranked jobs`);
}

function exportVault() {
  saveVault();
  copyText(JSON.stringify(normalizeVault(readJson(STORAGE_KEY)), null, 2), "Copied Job Scout vault");
}

async function importVault() {
  const raw = await requestTextInput({
    title: "Import Job Scout Vault",
    message: "Paste exported Job Scout JSON. Leads, profile, pinned sources, and selected job are merged into this browser.",
    value: "",
    multiline: true
  });
  if (!raw || !raw.trim()) return;
  try {
    const vault = normalizeVault(JSON.parse(raw));
    applyVault(vault);
    saveVault();
    renderAll();
    showToast("Job Scout vault imported");
  } catch (error) {
    showToast("Invalid Job Scout JSON");
  }
}

function copySyncLink() {
  saveVault();
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("scout", encodeToken(normalizeVault(readJson(STORAGE_KEY))));
  copyText(url.toString(), "Copied Job Scout sync link");
}

function requestTextInput({ title, message, value = "", multiline = false }) {
  return new Promise(resolve => {
    const dialog = document.createElement("dialog");
    dialog.className = "settings-dialog";
    const form = document.createElement("form");
    form.method = "dialog";
    const heading = document.createElement("h3");
    heading.textContent = title;
    const note = document.createElement("p");
    note.textContent = message;
    const input = multiline ? document.createElement("textarea") : document.createElement("input");
    input.value = value;
    if (multiline) input.rows = 10;
    else input.type = "text";
    const actions = document.createElement("div");
    actions.className = "settings-dialog-actions";
    const cancel = createButton("Cancel", () => finish(null));
    cancel.className = "secondary-button";
    const save = document.createElement("button");
    save.type = "submit";
    save.className = "primary-button";
    save.textContent = "Save";
    actions.append(cancel, save);
    form.append(heading, note, input, actions);
    dialog.appendChild(form);
    document.body.appendChild(dialog);
    let done = false;
    function finish(result) {
      if (done) return;
      done = true;
      dialog.close();
      dialog.remove();
      resolve(result);
    }
    form.addEventListener("submit", event => {
      event.preventDefault();
      finish(input.value);
    });
    dialog.addEventListener("cancel", event => {
      event.preventDefault();
      finish(null);
    });
    dialog.showModal();
    input.focus();
  });
}

function buildLinkedInJobsUrl(role, location, profile) {
  const params = new URLSearchParams({
    keywords: role,
    location,
    geoId: "103644278",
    origin: "JOB_SEARCH_PAGE_SEARCH_BUTTON",
    refresh: "true",
    sortBy: "DD",
    spellCorrectionEnabled: "true"
  });
  params.set("f_E", "1,2");
  const time = linkedinTime(profile.freshness);
  if (time) params.set("f_TPR", time);
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

function buildLinkedInPostsUrl(role, location, profile) {
  const params = new URLSearchParams({
    keywords: `"hiring" "${role}" ${location}`,
    origin: "GLOBAL_SEARCH_HEADER",
    sortBy: JSON.stringify(["date_posted"]),
    contentType: JSON.stringify(["jobs"])
  });
  const datePosted = profile.freshness === "1h" || profile.freshness === "24h" ? "past-24h" : profile.freshness === "week" ? "past-week" : "past-month";
  params.set("datePosted", JSON.stringify([datePosted]));
  return `https://www.linkedin.com/search/results/content/?${params.toString()}`;
}

function buildIndeedUrl(role, location, profile) {
  const params = new URLSearchParams({ q: role, l: location, sort: "date" });
  params.set("fromage", profile.freshness === "week" ? "7" : profile.freshness === "month" ? "14" : "1");
  return `https://www.indeed.com/jobs?${params.toString()}`;
}

function buildGoogleJobQuery(role, location, profile) {
  const level = profile.levels.slice(0, 6).map(quote).join(" OR ");
  const auth = profile.authTerms.slice(0, 7).map(quote).join(" OR ");
  return `${quote(role)} (${level}) (${auth}) (${quote(location)} OR USA OR "U.S.") (jobs OR careers OR hiring)`;
}

function buildGoogleUrl(query, freshness) {
  const params = new URLSearchParams({ q: query });
  const tbs = freshness === "1h" ? "qdr:h,sbd:1" : freshness === "24h" ? "qdr:d,sbd:1" : freshness === "week" ? "qdr:w,sbd:1" : "qdr:m,sbd:1";
  params.set("tbs", tbs);
  return `https://www.google.com/search?${params.toString()}`;
}

function buildCompactQuery(role, profile) {
  return [role, getPrimaryLocation(profile), profile.levels.slice(0, 2).join(" ")].filter(Boolean).join(" ");
}

function linkedinTime(freshness) {
  return {
    "1h": "r3600",
    "24h": "r86400",
    week: "r604800",
    month: "r2592000"
  }[freshness] || "r86400";
}

function getPrimaryRole(profile) {
  return profile.targetRoles[0] || profile.roleVariants[0] || "Software Engineer";
}

function getPrimaryLocation(profile) {
  return profile.locations[0] || "United States";
}

function quote(value) {
  return `"${String(value || "").replace(/"/g, "").trim()}"`;
}

function applyTemplate(template, values) {
  return String(template || "").replace(/\{(role|query|location|time)\}/gi, (match, key) => encodeURIComponent(values[key.toLowerCase()] || ""));
}

function createPill(text, className = "") {
  const pill = document.createElement("span");
  pill.className = `pill ${className}`.trim();
  pill.textContent = text;
  return pill;
}

function createButton(label, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", handler);
  return button;
}

function createLink(label, url) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = label;
  return link;
}

function candidateId(candidate) {
  return slug(`${candidate.company}-${candidate.title}-${candidate.url || candidate.location}`);
}

function mergeCandidates(left = [], right = []) {
  const byId = new Map();
  [...left, ...right].forEach(candidate => {
    if (!candidate || !candidate.id) return;
    byId.set(candidate.id, { ...byId.get(candidate.id), ...candidate });
  });
  return Array.from(byId.values());
}

function includesTerm(text, term) {
  const cleanTerm = normalize(term);
  return cleanTerm && text.includes(cleanTerm);
}

function normalize(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function slug(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `lead-${Date.now()}`;
}

function getFreshnessRank(value) {
  return { minutes: 5, today: 4, "24h": 3, week: 2, old: 1 }[value] || 1;
}

function formatPosted(value) {
  return {
    minutes: "Minutes ago",
    today: "Today",
    "24h": "Within 24h",
    week: "This week",
    old: "Older/unknown"
  }[value] || "Unknown";
}

function formatTime(value) {
  if (!value) return "now";
  try {
    return new Date(value).toLocaleString();
  } catch (error) {
    return "now";
  }
}

function escapeCell(value) {
  return String(value || "n/a").replace(/\|/g, "/");
}

function encodeToken(value) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(value))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function decodeToken(token) {
  try {
    const normalized = String(token || "").replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    return JSON.parse(decodeURIComponent(escape(atob(padded))));
  } catch (error) {
    return null;
  }
}

function toggleTheme() {
  state.theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
  document.documentElement.classList.toggle("dark", state.theme === "dark");
  syncThemeButton();
  saveVault();
}

function syncThemeButton() {
  els.themeToggle.textContent = document.documentElement.classList.contains("dark") ? "Light mode" : "Dark mode";
}

function copyText(text, message) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => showToast(message)).catch(() => showToast("Copy failed"));
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    els.toast.classList.remove("show");
  }, 2200);
}
