"use strict";

const CATEGORIES = [
  "Direct ATS",
  "General Boards",
  "Remote Boards",
  "Startup and Tech",
  "Public and Nonprofit",
  "Company Career Pages"
];

const PORTALS = [
  { id: "greenhouse", name: "Greenhouse", category: "Direct ATS", sites: ["greenhouse.io"] },
  { id: "lever", name: "Lever", category: "Direct ATS", sites: ["lever.co"] },
  { id: "ashby", name: "Ashby", category: "Direct ATS", sites: ["ashbyhq.com"] },
  { id: "workday", name: "Workday", category: "Direct ATS", sites: ["myworkdayjobs.com"] },
  { id: "smartrecruiters", name: "SmartRecruiters", category: "Direct ATS", sites: ["jobs.smartrecruiters.com"] },
  { id: "icims", name: "iCIMS", category: "Direct ATS", sites: ["icims.com/jobs"] },
  { id: "jobvite", name: "Jobvite", category: "Direct ATS", sites: ["jobvite.com"] },
  { id: "workable", name: "Workable", category: "Direct ATS", sites: ["jobs.workable.com"] },
  { id: "recruitee", name: "Recruitee", category: "Direct ATS", sites: ["recruitee.com"] },
  { id: "teamtailor", name: "Teamtailor", category: "Direct ATS", sites: ["teamtailor.com"] },
  { id: "breezy", name: "Breezy HR", category: "Direct ATS", sites: ["breezy.hr"] },
  { id: "pinpoint", name: "Pinpoint", category: "Direct ATS", sites: ["pinpointhq.com"] },
  { id: "paylocity", name: "Paylocity", category: "Direct ATS", sites: ["recruiting.paylocity.com"] },
  { id: "adp", name: "ADP", category: "Direct ATS", sites: ["workforcenow.adp.com", "myjobs.adp.com"] },
  { id: "oracle", name: "Oracle Recruiting", category: "Direct ATS", sites: ["oraclecloud.com"] },
  { id: "successfactors", name: "SAP SuccessFactors", category: "Direct ATS", sites: ["successfactors.com", "career5.successfactors.eu", "career2.successfactors.eu"] },
  { id: "dayforce", name: "Dayforce", category: "Direct ATS", sites: ["dayforcehcm.com"] },
  { id: "ukg", name: "UKG", category: "Direct ATS", sites: ["ultipro.com", "ukg.com/careers"] },
  { id: "bamboohr", name: "BambooHR", category: "Direct ATS", sites: ["bamboohr.com/careers"] },
  { id: "jazzhr", name: "JazzHR", category: "Direct ATS", sites: ["applytojob.com"] },
  { id: "comeet", name: "Comeet", category: "Direct ATS", sites: ["comeet.com/jobs"] },
  { id: "personio", name: "Personio", category: "Direct ATS", sites: ["jobs.personio.com"] },
  { id: "rippling", name: "Rippling", category: "Direct ATS", sites: ["rippling.com", "rippling-ats.com"] },
  { id: "gem", name: "Gem", category: "Direct ATS", sites: ["gem.com"] },
  { id: "trakstar", name: "Trakstar", category: "Direct ATS", sites: ["trakstar.com"] },
  { id: "catsone", name: "CATS", category: "Direct ATS", sites: ["catsone.com"] },
  { id: "linkedin", name: "LinkedIn", category: "General Boards", sites: ["linkedin.com/jobs/view"], special: "linkedin" },
  { id: "indeed", name: "Indeed", category: "General Boards", sites: ["indeed.com/jobs", "indeed.com/viewjob"] },
  { id: "glassdoor", name: "Glassdoor", category: "General Boards", sites: ["glassdoor.com/job-listing"] },
  { id: "ziprecruiter", name: "ZipRecruiter", category: "General Boards", sites: ["ziprecruiter.com/jobs"] },
  { id: "monster", name: "Monster", category: "General Boards", sites: ["monster.com/job-openings"] },
  { id: "careerbuilder", name: "CareerBuilder", category: "General Boards", sites: ["careerbuilder.com/job"] },
  { id: "dice", name: "Dice", category: "General Boards", sites: ["dice.com/job-detail"] },
  { id: "talent", name: "Talent.com", category: "General Boards", sites: ["talent.com/view"] },
  { id: "simplyhired", name: "SimplyHired", category: "General Boards", sites: ["simplyhired.com/job"] },
  { id: "remoterocketship", name: "Remote Rocketship", category: "Remote Boards", sites: ["remoterocketship.com"] },
  { id: "remotive", name: "Remotive", category: "Remote Boards", sites: ["remotive.com/remote-jobs"] },
  { id: "weworkremotely", name: "We Work Remotely", category: "Remote Boards", sites: ["weworkremotely.com/remote-jobs"] },
  { id: "remoteok", name: "Remote OK", category: "Remote Boards", sites: ["remoteok.com/remote-jobs"] },
  { id: "himalayas", name: "Himalayas", category: "Remote Boards", sites: ["himalayas.app/jobs"] },
  { id: "workingnomads", name: "Working Nomads", category: "Remote Boards", sites: ["workingnomads.com/jobs"] },
  { id: "otta", name: "Otta", category: "Startup and Tech", sites: ["otta.com/jobs"] },
  { id: "wellfound", name: "Wellfound", category: "Startup and Tech", sites: ["wellfound.com/jobs"] },
  { id: "yc", name: "YC Work at a Startup", category: "Startup and Tech", sites: ["workatastartup.com/jobs"] },
  { id: "builtin", name: "Built In", category: "Startup and Tech", sites: ["builtin.com/job"] },
  { id: "themuse", name: "The Muse", category: "Startup and Tech", sites: ["themuse.com/jobs"] },
  { id: "cord", name: "Cord", category: "Startup and Tech", sites: ["cord.co"] },
  { id: "techladder", name: "Ladders", category: "Startup and Tech", sites: ["theladders.com/job"] },
  { id: "usajobs", name: "USAJobs", category: "Public and Nonprofit", sites: ["usajobs.gov/job"] },
  { id: "idealist", name: "Idealist", category: "Public and Nonprofit", sites: ["idealist.org/en/job"] },
  { id: "higheredjobs", name: "HigherEdJobs", category: "Public and Nonprofit", sites: ["higheredjobs.com/admin/details.cfm", "higheredjobs.com/faculty/details.cfm"] },
  { id: "governmentjobs", name: "GovernmentJobs", category: "Public and Nonprofit", sites: ["governmentjobs.com/careers"] },
  { id: "unjobs", name: "UN Jobs", category: "Public and Nonprofit", sites: ["unjobs.org/vacancies"] },
  { id: "careersSubdomain", name: "Careers Subdomains", category: "Company Career Pages", rawSiteQuery: "(site:careers.* OR site:*/careers/* OR site:*/career/*)" },
  { id: "jobsSubdomain", name: "Jobs Subdomains", category: "Company Career Pages", rawSiteQuery: "(site:jobs.* OR site:*/jobs/* OR site:*/job/*)" },
  { id: "talentSubdomain", name: "Talent Pages", category: "Company Career Pages", rawSiteQuery: "(site:talent.* OR site:people.* OR site:*/talent/*)" },
  { id: "joinPages", name: "Join Us Pages", category: "Company Career Pages", rawSiteQuery: "(site:*/join-us/* OR site:*/work-with-us/* OR site:*/opportunities/* OR site:*/openings/*)" },
  { id: "notion", name: "Notion Career Pages", category: "Company Career Pages", sites: ["notion.site"] }
];

const OLDER_OPTIONS = [
  { value: "older1month", label: "Older than 1 month" },
  { value: "older3months", label: "Older than 3 months" },
  { value: "older6months", label: "Older than 6 months" }
];

const TIME_OPTIONS = {
  google: [
    { value: "all", label: "All" },
    { value: "1hour", label: "Past Hour" },
    { value: "4hours", label: "Past 4 Hours" },
    { value: "8hours", label: "Past 8 Hours" },
    { value: "12hours", label: "Past 12 Hours" },
    { value: "24hours", label: "Past 24 Hours" },
    { value: "48hours", label: "Past 48 Hours" },
    { value: "72hours", label: "Past 72 Hours" },
    { value: "week", label: "Past Week" },
    { value: "month", label: "Past Month" },
    { value: "year", label: "Past Year" },
    ...OLDER_OPTIONS
  ],
  duckduckgo: [
    { value: "all", label: "All" },
    { value: "24hours", label: "Past 24 Hours" },
    { value: "week", label: "Past Week" },
    { value: "month", label: "Past Month" },
    { value: "year", label: "Past Year" },
    ...OLDER_OPTIONS
  ],
  bing: [
    { value: "all", label: "All" },
    { value: "24hours", label: "Past 24 Hours" },
    { value: "week", label: "Past Week" },
    { value: "month", label: "Past Month" },
    ...OLDER_OPTIONS
  ],
  yahoo: [
    { value: "all", label: "All" },
    { value: "24hours", label: "Past 24 Hours" },
    { value: "week", label: "Past Week" },
    { value: "month", label: "Past Month" },
    ...OLDER_OPTIONS
  ],
  kagi: [
    { value: "all", label: "All" },
    { value: "24hours", label: "Past 24 Hours" },
    { value: "week", label: "Past Week" },
    { value: "month", label: "Past Month" },
    { value: "year", label: "Past Year" },
    ...OLDER_OPTIONS
  ],
  qwant: [
    { value: "all", label: "All" },
    { value: "24hours", label: "Past 24 Hours" },
    { value: "week", label: "Past Week" },
    { value: "month", label: "Past Month" },
    ...OLDER_OPTIONS
  ],
  brave: [
    { value: "all", label: "All" },
    { value: "24hours", label: "Past 24 Hours" },
    { value: "week", label: "Past Week" },
    { value: "month", label: "Past Month" },
    { value: "year", label: "Past Year" },
    ...OLDER_OPTIONS
  ],
  startpage: [
    { value: "all", label: "All" },
    { value: "24hours", label: "Past 24 Hours" },
    { value: "week", label: "Past Week" },
    { value: "month", label: "Past Month" },
    { value: "year", label: "Past Year" },
    ...OLDER_OPTIONS
  ]
};

const LOCATIONS = [
  ["", "All Locations", ""],
  ["usa", "United States", "usa"],
  ["canada", "Canada", "canada"],
  ["uk", "United Kingdom", "uk"],
  ["india", "India", "india"],
  ["germany", "Germany", "germany"],
  ["france", "France", "france"],
  ["australia", "Australia", "australia"],
  ["new zealand", "New Zealand", "new zealand"],
  ["ireland", "Ireland", "ireland"],
  ["netherlands", "Netherlands", "netherlands"],
  ["spain", "Spain", "spain"],
  ["italy", "Italy", "italy"],
  ["sweden", "Sweden", "sweden"],
  ["norway", "Norway", "norway"],
  ["denmark", "Denmark", "denmark"],
  ["finland", "Finland", "finland"],
  ["poland", "Poland", "poland"],
  ["switzerland", "Switzerland", "switzerland"],
  ["singapore", "Singapore", "singapore"],
  ["japan", "Japan", "japan"],
  ["south korea", "South Korea", "south korea"],
  ["brazil", "Brazil", "brazil"],
  ["mexico", "Mexico", "mexico"],
  ["south africa", "South Africa", "south africa"],
  ["united arab emirates", "United Arab Emirates", "united arab emirates"],
  ["california", "California", "california"],
  ["new york", "New York", "new york"],
  ["texas", "Texas", "texas"],
  ["florida", "Florida", "florida"],
  ["washington", "Washington", "washington"],
  ["massachusetts", "Massachusetts", "massachusetts"],
  ["illinois", "Illinois", "illinois"],
  ["georgia", "Georgia", "georgia"],
  ["north carolina", "North Carolina", "north carolina"],
  ["virginia", "Virginia", "virginia"],
  ["colorado", "Colorado", "colorado"],
  ["arizona", "Arizona", "arizona"],
  ["ohio", "Ohio", "ohio"],
  ["pennsylvania", "Pennsylvania", "pennsylvania"],
  ["new jersey", "New Jersey", "new jersey"],
  ["washington dc", "Washington DC", "washington dc"]
];

const RELATED_TITLE_GROUPS = [
  ["Software Engineer", "Full Stack Developer", "Frontend Developer", "Backend Developer", "Platform Engineer", "DevOps Engineer", "Site Reliability Engineer", "Engineering Manager"],
  ["Data Analyst", "Business Intelligence Analyst", "Analytics Engineer", "Data Scientist", "Machine Learning Engineer", "Data Engineer", "Power BI Developer"],
  ["Product Manager", "Product Owner", "Technical Product Manager", "Product Analyst", "Program Manager", "Project Manager"],
  ["UX Designer", "UI Designer", "Product Designer", "Design Researcher", "Content Designer", "UX Researcher"],
  ["Digital Marketing Specialist", "Growth Marketer", "SEO Specialist", "Content Strategist", "Lifecycle Marketing Manager", "Social Media Manager"],
  ["Cybersecurity Analyst", "Security Engineer", "SOC Analyst", "GRC Analyst", "Cloud Security Engineer", "Application Security Engineer"],
  ["Sales Development Representative", "Account Executive", "Customer Success Manager", "Solutions Engineer", "Revenue Operations Analyst"],
  ["HR Generalist", "Recruiter", "Talent Acquisition Specialist", "People Operations Manager", "Compensation Analyst"],
  ["Financial Analyst", "Accountant", "FP&A Analyst", "Controller", "Revenue Accountant", "Business Operations Analyst"]
];

const ACRONYMS = new Set(["AI", "API", "BI", "CRM", "FP&A", "GRC", "HR", "ML", "QA", "SEO", "SOC", "SRE", "UI", "UX"]);

const state = {
  results: [],
  checked: new Set()
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  populateCategories();
  populateLocations();
  rebuildTimeOptions("google", "24hours");
  loadTheme();
  bindEvents();
  hydrateFromUrl();
});

function cacheElements() {
  Object.assign(els, {
    form: document.getElementById("searchForm"),
    jobTitle: document.getElementById("jobTitle"),
    timeFilter: document.getElementById("timeFilter"),
    locationSelect: document.getElementById("locationSelect"),
    engineSelect: document.getElementById("engineSelect"),
    remoteMode: document.getElementById("remoteMode"),
    categoryFilters: document.getElementById("categoryFilters"),
    portalCount: document.getElementById("portalCount"),
    checkedCount: document.getElementById("checkedCount"),
    copyAllButton: document.getElementById("copyAllButton"),
    copyCheckedButton: document.getElementById("copyCheckedButton"),
    shareButton: document.getElementById("shareButton"),
    resetButton: document.getElementById("resetButton"),
    themeToggle: document.getElementById("themeToggle"),
    results: document.getElementById("results"),
    emptyState: document.getElementById("emptyState"),
    resultMeta: document.getElementById("resultMeta"),
    queryPreview: document.getElementById("queryPreview"),
    relatedBlock: document.getElementById("relatedBlock"),
    relatedTitles: document.getElementById("relatedTitles"),
    toast: document.getElementById("toast")
  });
}

function bindEvents() {
  els.form.addEventListener("submit", event => {
    event.preventDefault();
    generateResults();
  });

  els.engineSelect.addEventListener("change", () => {
    rebuildTimeOptions(els.engineSelect.value);
    if (hasJobTitle()) {
      generateResults();
    }
  });

  [els.timeFilter, els.locationSelect, els.remoteMode].forEach(control => {
    control.addEventListener("change", () => {
      if (hasJobTitle()) {
        generateResults();
      }
    });
  });

  els.categoryFilters.addEventListener("change", () => {
    if (hasJobTitle()) {
      generateResults();
    } else {
      updatePortalCount();
    }
  });

  els.copyAllButton.addEventListener("click", () => copyLinks(state.results.map(item => item.url), "Copied all links"));
  els.copyCheckedButton.addEventListener("click", () => {
    const checkedLinks = state.results.filter(item => state.checked.has(item.key)).map(item => item.url);
    copyLinks(checkedLinks, "Copied checked links");
  });
  els.shareButton.addEventListener("click", () => copyLinks([window.location.href], "Copied share link"));
  els.resetButton.addEventListener("click", resetSearch);
  els.themeToggle.addEventListener("click", toggleTheme);
}

function populateCategories() {
  els.categoryFilters.innerHTML = "";
  CATEGORIES.forEach(category => {
    const label = document.createElement("label");
    label.className = "filter-chip";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = category;
    input.checked = true;

    label.append(input, document.createTextNode(category));
    els.categoryFilters.appendChild(label);
  });
  updatePortalCount();
}

function populateLocations() {
  els.locationSelect.innerHTML = "";
  LOCATIONS.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    els.locationSelect.appendChild(option);
  });
}

function rebuildTimeOptions(engine, preferredValue) {
  const options = TIME_OPTIONS[engine] || TIME_OPTIONS.google;
  const current = preferredValue || els.timeFilter.value || "24hours";
  els.timeFilter.innerHTML = "";

  options.forEach(item => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    els.timeFilter.appendChild(option);
  });

  els.timeFilter.value = options.some(item => item.value === current) ? current : "24hours";
}

function hydrateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const job = params.get("job");
  const engine = params.get("engine");
  const time = params.get("time");
  const location = params.get("location");
  const remote = params.get("remote");
  const groups = params.get("groups");

  if (engine && TIME_OPTIONS[engine]) {
    els.engineSelect.value = engine;
    rebuildTimeOptions(engine, time || undefined);
  } else if (time) {
    rebuildTimeOptions("google", time);
  }

  if (location && LOCATIONS.some(item => item[0] === location)) {
    els.locationSelect.value = location;
  }

  if (remote && ["include", "only", "exclude", "neutral"].includes(remote)) {
    els.remoteMode.value = remote;
  } else {
    els.remoteMode.value = "neutral";
  }

  if (groups) {
    const selected = new Set(groups.split(",").map(decodeURIComponent));
    els.categoryFilters.querySelectorAll("input").forEach(input => {
      input.checked = selected.has(input.value);
    });
  }

  if (job) {
    els.jobTitle.value = decodeURIComponent(job.replace(/\+/g, " "));
    generateResults(false);
  } else {
    updatePortalCount();
  }
}

function hasJobTitle() {
  return els.jobTitle.value.trim().length > 0;
}

function generateResults(updateUrl = true) {
  const titles = parseTitles(els.jobTitle.value);
  const portals = getSelectedPortals();
  const context = getContext();

  state.results = [];
  state.checked.clear();
  els.results.innerHTML = "";

  if (titles.length === 0 || portals.length === 0) {
    setEmptyState(true);
    updateCounts();
    return;
  }

  titles.forEach(title => {
    const group = document.createElement("section");
    group.className = "result-group";

    const heading = document.createElement("div");
    heading.className = "result-title";

    const h3 = document.createElement("h3");
    h3.textContent = title;

    const meta = document.createElement("p");
    meta.textContent = [getTimeLabel(context.time), getLocationLabel(context.location), getRemoteLabel(context.remoteMode)]
      .filter(Boolean)
      .join(" - ");

    heading.append(h3, meta);
    group.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "portal-grid";

    portals.forEach(portal => {
      const query = buildPortalQuery(title, portal, context);
      const url = buildSearchUrl(context.engine, query, context.time, portal, title, context);
      const key = `${title}|${portal.id}|${context.engine}|${context.time}|${context.location}|${context.remoteMode}`;
      state.results.push({ key, title, portal, query, url });
      grid.appendChild(renderPortalRow({ key, title, portal, query, url }));
    });

    group.appendChild(grid);
    els.results.appendChild(group);
  });

  setEmptyState(false);
  updateCounts();
  updatePreview(titles[0], portals[0], context);
  updateRelatedTitles(titles[0]);
  if (updateUrl) {
    updateAddressBar(titles, context);
  }
}

function renderPortalRow(item) {
  const row = document.createElement("article");
  row.className = "portal-row";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("aria-label", `Mark ${item.portal.name} checked`);
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      state.checked.add(item.key);
    } else {
      state.checked.delete(item.key);
    }
    updateCounts();
  });

  const content = document.createElement("div");

  const link = document.createElement("a");
  link.className = "portal-link";
  link.href = item.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = item.portal.name;
  link.addEventListener("click", () => {
    checkbox.checked = true;
    state.checked.add(item.key);
    updateCounts();
  });

  const meta = document.createElement("div");
  meta.className = "portal-meta";
  meta.append(createPill(item.portal.category), createPill(item.portal.sites ? item.portal.sites.length === 1 ? item.portal.sites[0] : `${item.portal.sites.length} domains` : "operator set"));

  content.append(link, meta);

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "copy-button";
  copyButton.textContent = "Copy";
  copyButton.setAttribute("aria-label", `Copy ${item.portal.name} link`);
  copyButton.addEventListener("click", () => copyLinks([item.url], "Copied link"));

  row.append(checkbox, content, copyButton);
  return row;
}

function createPill(text) {
  const span = document.createElement("span");
  span.className = "pill";
  span.textContent = text;
  return span;
}

function parseTitles(input) {
  return input
    .split(",")
    .map(value => value.trim())
    .filter(Boolean)
    .map(smartTitleCase);
}

function smartTitleCase(value) {
  return value
    .split(/\s+/)
    .map(word => {
      const clean = word.replace(/[^a-zA-Z&]/g, "").toUpperCase();
      if (ACRONYMS.has(clean)) {
        return clean;
      }
      if (word.includes("-")) {
        return word.split("-").map(smartTitleCase).join("-");
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function getContext() {
  return {
    engine: els.engineSelect.value,
    time: els.timeFilter.value,
    location: els.locationSelect.value,
    remoteMode: els.remoteMode.value
  };
}

function getSelectedPortals() {
  const categories = getSelectedCategories();
  return PORTALS.filter(portal => categories.has(portal.category));
}

function getSelectedCategories() {
  const selected = new Set();
  els.categoryFilters.querySelectorAll("input:checked").forEach(input => selected.add(input.value));
  return selected;
}

function updatePortalCount() {
  els.portalCount.textContent = String(getSelectedPortals().length);
}

function updateCounts() {
  els.portalCount.textContent = String(getSelectedPortals().length);
  els.checkedCount.textContent = String(state.checked.size);
  const hasResults = state.results.length > 0;
  els.copyAllButton.disabled = !hasResults;
  els.copyCheckedButton.disabled = state.checked.size === 0;
  els.shareButton.disabled = !hasResults;
  els.resultMeta.textContent = hasResults ? `${state.results.length} links across ${getSelectedPortals().length} portals` : "Ready";
}

function setEmptyState(show) {
  els.emptyState.hidden = !show;
  els.results.hidden = show;
  if (show) {
    els.queryPreview.textContent = "Ready";
    els.relatedBlock.hidden = true;
    els.resultMeta.textContent = "Ready";
  }
}

function updatePreview(title, portal, context) {
  const query = buildPortalQuery(title, portal, context);
  els.queryPreview.textContent = query;
}

function updateRelatedTitles(title) {
  const related = findRelatedTitles(title);
  els.relatedTitles.innerHTML = "";
  els.relatedBlock.hidden = related.length === 0;

  related.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tag-button";
    button.textContent = item;
    button.addEventListener("click", () => {
      els.jobTitle.value = item;
      generateResults();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    els.relatedTitles.appendChild(button);
  });
}

function findRelatedTitles(title) {
  const normalized = title.toLowerCase();
  const group = RELATED_TITLE_GROUPS.find(items => items.some(item => item.toLowerCase() === normalized));
  return group ? group.filter(item => item.toLowerCase() !== normalized) : [];
}

function buildPortalQuery(title, portal, context) {
  const parts = [`"${title}"`];

  if (portal.rawSiteQuery) {
    parts.push(portal.rawSiteQuery);
  } else if (portal.sites.length === 1) {
    parts.push(`site:${portal.sites[0]}`);
  } else {
    parts.push(`(${portal.sites.map(site => `site:${site}`).join(" OR ")})`);
  }

  const remoteTerm = getRemoteQueryTerm(context.remoteMode);
  if (remoteTerm) {
    parts.push(remoteTerm);
  }

  const locationTerm = getLocationQuery(context.location);
  if (locationTerm) {
    parts.push(locationTerm);
  }

  return parts.join(" ");
}

function getRemoteQueryTerm(mode) {
  switch (mode) {
    case "include":
      return "remote";
    case "only":
      return '(remote OR "work from home" OR "work from anywhere")';
    case "exclude":
      return '-remote -"work from home" -"work from anywhere"';
    default:
      return "";
  }
}

function getLocationQuery(value) {
  const match = LOCATIONS.find(item => item[0] === value);
  return match ? match[2] : "";
}

function buildSearchUrl(engine, query, time, portal, title, context) {
  if (portal.special === "linkedin" && context.remoteMode !== "neutral" && !isOlderFilter(time) && ["google", "duckduckgo", "bing"].includes(engine)) {
    return buildLinkedInUrl(title, time, context);
  }

  const queryWithOlder = addOlderOperator(query, time);

  switch (engine) {
    case "duckduckgo":
      return buildDuckDuckGoUrl(queryWithOlder, time);
    case "bing":
      return buildBingUrl(queryWithOlder, time);
    case "yahoo":
      return buildYahooUrl(queryWithOlder, time);
    case "kagi":
      return buildKagiUrl(queryWithOlder, time);
    case "qwant":
      return buildQwantUrl(queryWithOlder, time);
    case "brave":
      return buildBraveUrl(queryWithOlder, time);
    case "startpage":
      return buildStartpageUrl(queryWithOlder, time);
    default:
      return buildGoogleUrl(query, time);
  }
}

function buildLinkedInUrl(title, time, context) {
  const timeMap = {
    "1hour": "r3600",
    "4hours": "r14400",
    "8hours": "r28800",
    "12hours": "r43200",
    "24hours": "r86400",
    "48hours": "r172800",
    "72hours": "r259200",
    week: "r604800",
    month: "r2592000",
    year: "r31536000"
  };
  const params = new URLSearchParams();
  params.set("keywords", title);
  params.set("location", getLinkedInLocation(context));
  if (timeMap[time]) {
    params.set("f_TPR", timeMap[time]);
  }
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

function getLinkedInLocation(context) {
  if (context.location) {
    return getLocationLabel(context.location);
  }
  if (context.remoteMode === "exclude") {
    return "United States";
  }
  return "Remote";
}

function buildGoogleUrl(query, time) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}${getGoogleTimeParam(time)}`;
}

function buildDuckDuckGoUrl(query, time) {
  const map = { "24hours": "d", week: "w", month: "m", year: "y" };
  const params = new URLSearchParams({ q: query });
  if (map[time]) {
    params.set("df", map[time]);
  }
  return `https://duckduckgo.com/?${params.toString()}`;
}

function buildBingUrl(query, time) {
  const map = { "24hours": "ez1", week: "ez2", month: "ez3" };
  const filter = map[time] ? `&filters=ex1%3a%22${map[time]}%22` : "";
  return `https://www.bing.com/search?q=${encodeURIComponent(query)}${filter}`;
}

function buildYahooUrl(query, time) {
  const map = { "24hours": "d", week: "w", month: "m" };
  const filter = map[time] ? `&fr2=time&btf=${map[time]}&fr=sfp` : "";
  return `https://search.yahoo.com/search?p=${encodeURIComponent(query)}${filter}`;
}

function buildKagiUrl(query, time) {
  const map = { "24hours": "1", week: "2", month: "3", year: "4" };
  const filter = map[time] ? `&dr=${map[time]}` : "";
  return `https://kagi.com/search?q=${encodeURIComponent(query)}${filter}`;
}

function buildQwantUrl(query, time) {
  const map = { "24hours": "day", week: "week", month: "month" };
  const filter = map[time] ? `&freshness=${map[time]}` : "";
  return `https://www.qwant.com/?q=${encodeURIComponent(query)}&t=web${filter}`;
}

function buildBraveUrl(query, time) {
  const map = { "24hours": "pd", week: "pw", month: "pm", year: "py" };
  const filter = map[time] ? `&tf=${map[time]}` : "";
  return `https://search.brave.com/search?q=${encodeURIComponent(query)}&source=web${filter}`;
}

function buildStartpageUrl(query, time) {
  const afterDate = getStartpageAfterDate(time);
  const finalQuery = afterDate ? `${query} after:${afterDate}` : query;
  return `https://www.startpage.com/sp/search?query=${encodeURIComponent(finalQuery)}`;
}

function getGoogleTimeParam(time) {
  const map = {
    "1hour": "&tbs=qdr:h1",
    "4hours": "&tbs=qdr:h4",
    "8hours": "&tbs=qdr:h8",
    "12hours": "&tbs=qdr:h12",
    "24hours": "&tbs=qdr:d",
    "48hours": "&tbs=qdr:h48",
    "72hours": "&tbs=qdr:h72",
    week: "&tbs=qdr:w",
    month: "&tbs=qdr:m",
    year: "&tbs=qdr:y",
    older1month: `&tbs=cdr:1,cd_max:${getPastDate(1, "us")}`,
    older3months: `&tbs=cdr:1,cd_max:${getPastDate(3, "us")}`,
    older6months: `&tbs=cdr:1,cd_max:${getPastDate(6, "us")}`
  };
  return map[time] || "";
}

function addOlderOperator(query, time) {
  const months = getOlderMonths(time);
  return months ? `${query} before:${getPastDate(months, "iso")}` : query;
}

function getStartpageAfterDate(time) {
  const dayMap = { "24hours": 1, week: 7, month: 30, year: 365 };
  if (!dayMap[time]) {
    return "";
  }
  const date = new Date(Date.now() - dayMap[time] * 24 * 60 * 60 * 1000);
  return date.toISOString().slice(0, 10);
}

function getPastDate(monthsBack, format) {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsBack);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return format === "iso" ? `${yyyy}-${mm}-${dd}` : `${mm}/${dd}/${yyyy}`;
}

function getOlderMonths(time) {
  if (time === "older1month") {
    return 1;
  }
  if (time === "older3months") {
    return 3;
  }
  if (time === "older6months") {
    return 6;
  }
  return 0;
}

function isOlderFilter(time) {
  return getOlderMonths(time) > 0;
}

function getTimeLabel(value) {
  const option = Object.values(TIME_OPTIONS).flat().find(item => item.value === value);
  return option ? option.label : "All";
}

function getLocationLabel(value) {
  const match = LOCATIONS.find(item => item[0] === value);
  return match ? match[1] : "";
}

function getRemoteLabel(value) {
  return {
    include: "Remote-friendly",
    only: "Remote only",
    exclude: "Exclude remote",
    neutral: "All job types"
  }[value];
}

function updateAddressBar(titles, context) {
  const params = new URLSearchParams();
  params.set("job", titles.join(","));
  params.set("time", context.time);
  if (context.engine !== "google") {
    params.set("engine", context.engine);
  }
  if (context.location) {
    params.set("location", context.location);
  }
  if (context.remoteMode !== "neutral") {
    params.set("remote", context.remoteMode);
  }
  const categories = Array.from(getSelectedCategories());
  if (categories.length !== CATEGORIES.length) {
    params.set("groups", categories.join(","));
  }
  history.pushState(null, "", `${window.location.pathname}?${params.toString()}`);
}

async function copyLinks(links, message) {
  if (!links.length) {
    return;
  }
  try {
    await navigator.clipboard.writeText(links.join("\n"));
    showToast(message);
  } catch (error) {
    showToast("Copy failed. Select and copy from the address bar.");
  }
}

function showToast(message) {
  els.toast.textContent = message;
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    els.toast.textContent = "";
  }, 2200);
}

function resetSearch() {
  els.jobTitle.value = "";
  els.engineSelect.value = "google";
  rebuildTimeOptions("google", "24hours");
  els.locationSelect.value = "";
  els.remoteMode.value = "neutral";
  els.categoryFilters.querySelectorAll("input").forEach(input => {
    input.checked = true;
  });
  state.results = [];
  state.checked.clear();
  els.results.innerHTML = "";
  setEmptyState(true);
  updateCounts();
  history.pushState(null, "", window.location.pathname);
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("portalScoutTheme", document.documentElement.classList.contains("dark") ? "dark" : "light");
}

function loadTheme() {
  const stored = localStorage.getItem("portalScoutTheme");
  if (stored === "dark") {
    document.documentElement.classList.add("dark");
  }
}
