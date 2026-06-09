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
  { id: "greenhouse", name: "Greenhouse", category: "Direct ATS", sites: ["greenhouse.io"], priority: 10 },
  { id: "lever", name: "Lever", category: "Direct ATS", sites: ["lever.co"], priority: 10 },
  { id: "ashby", name: "Ashby", category: "Direct ATS", sites: ["ashbyhq.com"], priority: 10 },
  { id: "workday", name: "Workday", category: "Direct ATS", sites: ["myworkdayjobs.com"], priority: 9 },
  { id: "smartrecruiters", name: "SmartRecruiters", category: "Direct ATS", sites: ["jobs.smartrecruiters.com"], priority: 9 },
  { id: "icims", name: "iCIMS", category: "Direct ATS", sites: ["icims.com/jobs"], priority: 8 },
  { id: "jobvite", name: "Jobvite", category: "Direct ATS", sites: ["jobvite.com"], priority: 8 },
  { id: "workable", name: "Workable", category: "Direct ATS", sites: ["jobs.workable.com"], priority: 9 },
  { id: "recruitee", name: "Recruitee", category: "Direct ATS", sites: ["recruitee.com"], priority: 8 },
  { id: "teamtailor", name: "Teamtailor", category: "Direct ATS", sites: ["teamtailor.com"], priority: 8 },
  { id: "breezy", name: "Breezy HR", category: "Direct ATS", sites: ["breezy.hr"], priority: 7 },
  { id: "pinpoint", name: "Pinpoint", category: "Direct ATS", sites: ["pinpointhq.com"], priority: 7 },
  { id: "paylocity", name: "Paylocity", category: "Direct ATS", sites: ["recruiting.paylocity.com"], priority: 7 },
  { id: "adp", name: "ADP", category: "Direct ATS", sites: ["workforcenow.adp.com", "myjobs.adp.com"], priority: 7 },
  { id: "oracle", name: "Oracle Recruiting", category: "Direct ATS", sites: ["oraclecloud.com"], priority: 7 },
  { id: "successfactors", name: "SAP SuccessFactors", category: "Direct ATS", sites: ["successfactors.com", "career5.successfactors.eu", "career2.successfactors.eu"], priority: 7 },
  { id: "dayforce", name: "Dayforce", category: "Direct ATS", sites: ["dayforcehcm.com"], priority: 7 },
  { id: "ukg", name: "UKG", category: "Direct ATS", sites: ["ultipro.com", "ukg.com/careers"], priority: 6 },
  { id: "bamboohr", name: "BambooHR", category: "Direct ATS", sites: ["bamboohr.com/careers"], priority: 6 },
  { id: "jazzhr", name: "JazzHR", category: "Direct ATS", sites: ["applytojob.com"], priority: 6 },
  { id: "comeet", name: "Comeet", category: "Direct ATS", sites: ["comeet.com/jobs"], priority: 6 },
  { id: "personio", name: "Personio", category: "Direct ATS", sites: ["jobs.personio.com"], priority: 6 },
  { id: "rippling", name: "Rippling", category: "Direct ATS", sites: ["rippling.com", "rippling-ats.com"], priority: 6 },
  { id: "gem", name: "Gem", category: "Direct ATS", sites: ["gem.com"], priority: 5 },
  { id: "trakstar", name: "Trakstar", category: "Direct ATS", sites: ["trakstar.com"], priority: 5 },
  { id: "catsone", name: "CATS", category: "Direct ATS", sites: ["catsone.com"], priority: 5 },
  { id: "linkedin", name: "LinkedIn", category: "General Boards", sites: ["linkedin.com/jobs/view"], native: "linkedin", priority: 10 },
  { id: "indeed", name: "Indeed", category: "General Boards", sites: ["indeed.com/jobs", "indeed.com/viewjob"], native: "indeed", priority: 10 },
  { id: "glassdoor", name: "Glassdoor", category: "General Boards", sites: ["glassdoor.com/job-listing"], priority: 7 },
  { id: "ziprecruiter", name: "ZipRecruiter", category: "General Boards", sites: ["ziprecruiter.com/jobs"], priority: 7 },
  { id: "monster", name: "Monster", category: "General Boards", sites: ["monster.com/job-openings"], priority: 5 },
  { id: "careerbuilder", name: "CareerBuilder", category: "General Boards", sites: ["careerbuilder.com/job"], priority: 5 },
  { id: "dice", name: "Dice", category: "General Boards", sites: ["dice.com/job-detail"], priority: 9 },
  { id: "talent", name: "Talent.com", category: "General Boards", sites: ["talent.com/view"], priority: 6 },
  { id: "simplyhired", name: "SimplyHired", category: "General Boards", sites: ["simplyhired.com/job"], priority: 5 },
  { id: "remoterocketship", name: "Remote Rocketship", category: "Remote Boards", sites: ["remoterocketship.com"], priority: 5 },
  { id: "remotive", name: "Remotive", category: "Remote Boards", sites: ["remotive.com/remote-jobs"], priority: 5 },
  { id: "weworkremotely", name: "We Work Remotely", category: "Remote Boards", sites: ["weworkremotely.com/remote-jobs"], priority: 5 },
  { id: "remoteok", name: "Remote OK", category: "Remote Boards", sites: ["remoteok.com/remote-jobs"], priority: 5 },
  { id: "himalayas", name: "Himalayas", category: "Remote Boards", sites: ["himalayas.app/jobs"], priority: 5 },
  { id: "workingnomads", name: "Working Nomads", category: "Remote Boards", sites: ["workingnomads.com/jobs"], priority: 4 },
  { id: "otta", name: "Otta", category: "Startup and Tech", sites: ["otta.com/jobs"], priority: 8 },
  { id: "wellfound", name: "Wellfound", category: "Startup and Tech", sites: ["wellfound.com/jobs"], priority: 8 },
  { id: "yc", name: "YC Work at a Startup", category: "Startup and Tech", sites: ["workatastartup.com/jobs"], priority: 8 },
  { id: "builtin", name: "Built In", category: "Startup and Tech", sites: ["builtin.com/job"], priority: 8 },
  { id: "themuse", name: "The Muse", category: "Startup and Tech", sites: ["themuse.com/jobs"], priority: 6 },
  { id: "cord", name: "Cord", category: "Startup and Tech", sites: ["cord.co"], priority: 5 },
  { id: "techladder", name: "Ladders", category: "Startup and Tech", sites: ["theladders.com/job"], priority: 5 },
  { id: "usajobs", name: "USAJobs", category: "Public and Nonprofit", sites: ["usajobs.gov/job"], native: "usajobs", priority: 6 },
  { id: "idealist", name: "Idealist", category: "Public and Nonprofit", sites: ["idealist.org/en/job"], priority: 5 },
  { id: "higheredjobs", name: "HigherEdJobs", category: "Public and Nonprofit", sites: ["higheredjobs.com/admin/details.cfm", "higheredjobs.com/faculty/details.cfm"], priority: 5 },
  { id: "governmentjobs", name: "GovernmentJobs", category: "Public and Nonprofit", sites: ["governmentjobs.com/careers"], priority: 5 },
  { id: "unjobs", name: "UN Jobs", category: "Public and Nonprofit", sites: ["unjobs.org/vacancies"], priority: 4 },
  { id: "careersSubdomain", name: "Careers Subdomains", category: "Company Career Pages", rawSiteQuery: "(site:careers.* OR site:*/careers/* OR site:*/career/*)", priority: 7 },
  { id: "jobsSubdomain", name: "Jobs Subdomains", category: "Company Career Pages", rawSiteQuery: "(site:jobs.* OR site:*/jobs/* OR site:*/job/*)", priority: 7 },
  { id: "talentSubdomain", name: "Talent Pages", category: "Company Career Pages", rawSiteQuery: "(site:talent.* OR site:people.* OR site:*/talent/*)", priority: 6 },
  { id: "joinPages", name: "Join Us Pages", category: "Company Career Pages", rawSiteQuery: "(site:*/join-us/* OR site:*/work-with-us/* OR site:*/opportunities/* OR site:*/openings/*)", priority: 6 },
  { id: "notion", name: "Notion Career Pages", category: "Company Career Pages", sites: ["notion.site"], priority: 5 }
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
  ["usa", "United States", '("United States" OR USA OR "U.S.")', "United States"],
  ["remote-us", "Remote, US", '("United States" OR USA OR "U.S.") remote', "United States"],
  ["new-york-ny", "New York, NY", '("New York" OR NYC) "United States"', "New York, NY"],
  ["bay-area-ca", "San Francisco Bay Area, CA", '("San Francisco" OR "Bay Area" OR "San Jose" OR "Palo Alto") California', "San Francisco Bay Area"],
  ["seattle-wa", "Seattle, WA", '"Seattle" Washington', "Seattle, WA"],
  ["austin-tx", "Austin, TX", '"Austin" Texas', "Austin, TX"],
  ["dallas-tx", "Dallas, TX", '("Dallas" OR "Fort Worth") Texas', "Dallas-Fort Worth, TX"],
  ["houston-tx", "Houston, TX", '"Houston" Texas', "Houston, TX"],
  ["boston-ma", "Boston, MA", '"Boston" Massachusetts', "Boston, MA"],
  ["chicago-il", "Chicago, IL", '"Chicago" Illinois', "Chicago, IL"],
  ["atlanta-ga", "Atlanta, GA", '"Atlanta" Georgia', "Atlanta, GA"],
  ["raleigh-nc", "Raleigh-Durham, NC", '("Raleigh" OR "Durham" OR "Research Triangle") "North Carolina"', "Raleigh-Durham, NC"],
  ["washington-dc", "Washington, DC", '("Washington DC" OR "Washington, DC" OR "District of Columbia")', "Washington, DC"],
  ["los-angeles-ca", "Los Angeles, CA", '("Los Angeles" OR LA) California', "Los Angeles, CA"],
  ["san-diego-ca", "San Diego, CA", '"San Diego" California', "San Diego, CA"],
  ["denver-co", "Denver, CO", '"Denver" Colorado', "Denver, CO"],
  ["phoenix-az", "Phoenix, AZ", '"Phoenix" Arizona', "Phoenix, AZ"],
  ["miami-fl", "Miami, FL", '"Miami" Florida', "Miami, FL"],
  ["orlando-fl", "Orlando, FL", '"Orlando" Florida', "Orlando, FL"],
  ["philadelphia-pa", "Philadelphia, PA", '"Philadelphia" Pennsylvania', "Philadelphia, PA"],
  ["pittsburgh-pa", "Pittsburgh, PA", '"Pittsburgh" Pennsylvania', "Pittsburgh, PA"],
  ["minneapolis-mn", "Minneapolis, MN", '"Minneapolis" Minnesota', "Minneapolis, MN"],
  ["detroit-mi", "Detroit, MI", '"Detroit" Michigan', "Detroit, MI"],
  ["columbus-oh", "Columbus, OH", '"Columbus" Ohio', "Columbus, OH"],
  ["salt-lake-city-ut", "Salt Lake City, UT", '"Salt Lake City" Utah', "Salt Lake City, UT"],
  ["portland-or", "Portland, OR", '"Portland" Oregon', "Portland, OR"]
];

const RELATED_TITLE_GROUPS = [
  ["Software Engineer", "Software Developer", "Full Stack Developer", "Frontend Developer", "Backend Developer", "Platform Engineer", "DevOps Engineer", "Site Reliability Engineer", "Application Developer"],
  ["Data Analyst", "Business Intelligence Analyst", "Analytics Engineer", "Data Scientist", "Machine Learning Engineer", "Data Engineer", "Power BI Developer", "Reporting Analyst"],
  ["Product Manager", "Product Owner", "Technical Product Manager", "Product Analyst", "Program Manager", "Project Manager"],
  ["UX Designer", "UI Designer", "Product Designer", "Design Researcher", "Content Designer", "UX Researcher"],
  ["Digital Marketing Specialist", "Growth Marketer", "SEO Specialist", "Content Strategist", "Lifecycle Marketing Manager", "Social Media Manager"],
  ["Cybersecurity Analyst", "Security Engineer", "SOC Analyst", "GRC Analyst", "Cloud Security Engineer", "Application Security Engineer"],
  ["Sales Development Representative", "Account Executive", "Customer Success Manager", "Solutions Engineer", "Revenue Operations Analyst"],
  ["HR Generalist", "Recruiter", "Talent Acquisition Specialist", "People Operations Manager", "Compensation Analyst"],
  ["Financial Analyst", "Accountant", "FP&A Analyst", "Controller", "Revenue Accountant", "Business Operations Analyst"]
];

const ACRONYMS = new Set(["AI", "API", "BI", "CRM", "FP&A", "GRC", "HR", "ML", "QA", "SEO", "SOC", "SRE", "UI", "UX"]);

const FILTER_LABELS = {
  remoteMode: {
    neutral: "All work settings",
    "onsite-hybrid": "On-site or hybrid",
    hybrid: "Hybrid",
    onsite: "On-site",
    only: "Remote only",
    exclude: "Exclude remote"
  },
  matchMode: {
    smart: "Smart related titles",
    exact: "Exact title only"
  },
  experience: {
    any: "Any level",
    entry: "Entry or new grad",
    mid: "Mid level",
    senior: "Senior or lead",
    manager: "Manager plus",
    internship: "Internship"
  },
  employment: {
    any: "Any employment",
    fulltime: "Full-time",
    contract: "Contract",
    parttime: "Part-time",
    internship: "Internship"
  },
  authorization: {
    optBroad: "OPT-aware broad",
    none: "No auth filter",
    currentAuthorized: "US work authorized",
    sponsorNeeded: "Future sponsorship",
    everify: "E-Verify",
    optStrict: "OPT/STEM OPT exact"
  },
  sort: {
    recommended: "Recommended",
    latest: "Newest first",
    direct: "Direct apply first",
    coverage: "Broad coverage"
  }
};

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
    sortSelect: document.getElementById("sortSelect"),
    engineSelect: document.getElementById("engineSelect"),
    remoteMode: document.getElementById("remoteMode"),
    matchMode: document.getElementById("matchMode"),
    experienceSelect: document.getElementById("experienceSelect"),
    employmentSelect: document.getElementById("employmentSelect"),
    authorizationSelect: document.getElementById("authorizationSelect"),
    includeTerms: document.getElementById("includeTerms"),
    excludeTerms: document.getElementById("excludeTerms"),
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

  [
    els.timeFilter,
    els.locationSelect,
    els.sortSelect,
    els.remoteMode,
    els.matchMode,
    els.experienceSelect,
    els.employmentSelect,
    els.authorizationSelect
  ].forEach(control => {
    control.addEventListener("change", () => {
      if (hasJobTitle()) {
        generateResults();
      } else {
        updatePortalCount();
      }
    });
  });

  [els.includeTerms, els.excludeTerms].forEach(input => {
    input.addEventListener("change", () => {
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
  els.locationSelect.value = "usa";
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
  const sort = params.get("sort");
  const remote = params.get("remote");
  const match = params.get("match");
  const experience = params.get("experience");
  const employment = params.get("employment");
  const authorization = params.get("authorization");
  const include = params.get("include");
  const exclude = params.get("exclude");
  const groups = params.get("groups");

  if (engine && TIME_OPTIONS[engine]) {
    els.engineSelect.value = engine;
    rebuildTimeOptions(engine, time || undefined);
  } else if (time) {
    rebuildTimeOptions("google", time);
  }

  setSelectIfValid(els.locationSelect, location || "usa");
  setSelectIfValid(els.sortSelect, sort || "recommended");
  setSelectIfValid(els.remoteMode, remote || "neutral");
  setSelectIfValid(els.matchMode, match || "smart");
  setSelectIfValid(els.experienceSelect, experience || "any");
  setSelectIfValid(els.employmentSelect, employment || "any");
  setSelectIfValid(els.authorizationSelect, authorization || "optBroad");
  els.includeTerms.value = include ? decodeURIComponent(include) : "";
  els.excludeTerms.value = exclude ? decodeURIComponent(exclude) : "";

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
    updatePreviewForEmptyState();
  }
}

function setSelectIfValid(select, value) {
  if ([...select.options].some(option => option.value === value)) {
    select.value = value;
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
    updatePreviewForEmptyState();
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
    meta.textContent = getActiveFilterSummary(context);

    heading.append(h3, meta);
    group.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "portal-grid";

    portals.forEach(portal => {
      const query = buildPortalQuery(title, portal, context);
      const url = buildSearchUrl(context.engine, query, context.time, portal, title, context);
      const key = `${title}|${portal.id}|${context.engine}|${context.time}|${context.location}|${context.remoteMode}|${context.matchMode}|${context.experience}|${context.employment}|${context.authorization}|${context.sort}`;
      const searchFormat = shouldUseNativeUrl(portal, context) ? "native filters" : context.engine;
      state.results.push({ key, title, portal, query, url, searchFormat });
      grid.appendChild(renderPortalRow({ key, title, portal, query, url, searchFormat }));
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
      row.classList.add("checked");
    } else {
      state.checked.delete(item.key);
      row.classList.remove("checked");
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
    row.classList.add("checked");
    updateCounts();
  });

  const meta = document.createElement("div");
  meta.className = "portal-meta";
  meta.append(
    createPill(item.portal.category),
    createPill(getPortalScopeLabel(item.portal)),
    createPill(item.searchFormat)
  );

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

function getPortalScopeLabel(portal) {
  if (portal.rawSiteQuery) {
    return "operator set";
  }
  return portal.sites.length === 1 ? portal.sites[0] : `${portal.sites.length} domains`;
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
    sort: els.sortSelect.value,
    remoteMode: els.remoteMode.value,
    matchMode: els.matchMode.value,
    experience: els.experienceSelect.value,
    employment: els.employmentSelect.value,
    authorization: els.authorizationSelect.value,
    includeTerms: parseTermList(els.includeTerms.value),
    excludeTerms: parseTermList(els.excludeTerms.value)
  };
}

function parseTermList(value) {
  return value
    .split(",")
    .map(term => term.trim())
    .filter(Boolean);
}

function getSelectedPortals() {
  const categories = getSelectedCategories();
  const selected = PORTALS.filter(portal => categories.has(portal.category));
  return sortPortals(selected, els.sortSelect.value);
}

function sortPortals(portals, sortMode) {
  const categoryWeight = {
    "Direct ATS": 70,
    "General Boards": 60,
    "Startup and Tech": 50,
    "Company Career Pages": 45,
    "Public and Nonprofit": 35,
    "Remote Boards": 30
  };

  const modeBonus = {
    recommended: portal => portal.priority * 10 + (categoryWeight[portal.category] || 0),
    latest: portal => (portal.native ? 200 : 0) + portal.priority * 10,
    direct: portal => (portal.category === "Direct ATS" ? 200 : 0) + (portal.category === "Company Career Pages" ? 120 : 0) + portal.priority * 10,
    coverage: portal => (portal.category === "General Boards" ? 200 : 0) + (portal.category === "Company Career Pages" ? 150 : 0) + portal.priority * 10
  };

  const scorer = modeBonus[sortMode] || modeBonus.recommended;
  return [...portals].sort((a, b) => scorer(b) - scorer(a) || a.name.localeCompare(b.name));
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
    els.relatedBlock.hidden = true;
    els.resultMeta.textContent = "Ready";
  }
}

function updatePreviewForEmptyState() {
  const context = getContext();
  els.queryPreview.textContent = [
    "US market default",
    FILTER_LABELS.authorization[context.authorization],
    FILTER_LABELS.matchMode[context.matchMode],
    FILTER_LABELS.sort[context.sort]
  ].join("\n");
}

function updatePreview(title, portal, context) {
  els.queryPreview.textContent = buildPortalQuery(title, portal, context);
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
  const parts = [
    buildTitleExpression(title, context),
    buildSiteExpression(portal),
    getLocationQuery(context.location),
    getWorkSettingQuery(context.remoteMode),
    getExperienceQuery(context.experience),
    getEmploymentQuery(context.employment),
    getAuthorizationQuery(context.authorization),
    buildIncludeQuery(context.includeTerms),
    buildExcludeQuery(context.excludeTerms)
  ].filter(Boolean);

  return parts.join(" ");
}

function buildTitleExpression(title, context) {
  if (context.matchMode === "exact") {
    return quoteTerm(title);
  }
  const related = findTitleGroup(title);
  const titles = related.length ? related : [title];
  return `(${titles.map(quoteTerm).join(" OR ")})`;
}

function findTitleGroup(title) {
  const normalized = title.toLowerCase();
  const group = RELATED_TITLE_GROUPS.find(items => items.some(item => item.toLowerCase() === normalized));
  return group || [title];
}

function buildSiteExpression(portal) {
  if (portal.rawSiteQuery) {
    return portal.rawSiteQuery;
  }
  if (portal.sites.length === 1) {
    return `site:${portal.sites[0]}`;
  }
  return `(${portal.sites.map(site => `site:${site}`).join(" OR ")})`;
}

function getLocationQuery(value) {
  const match = LOCATIONS.find(item => item[0] === value);
  return match ? match[2] : LOCATIONS[0][2];
}

function getLocationLabel(value) {
  const match = LOCATIONS.find(item => item[0] === value);
  return match ? match[1] : "United States";
}

function getNativeLocation(value) {
  const match = LOCATIONS.find(item => item[0] === value);
  return match ? match[3] : "United States";
}

function getWorkSettingQuery(mode) {
  switch (mode) {
    case "onsite-hybrid":
      return '(onsite OR "on-site" OR hybrid OR "in office") -remote';
    case "hybrid":
      return '(hybrid OR "hybrid remote")';
    case "onsite":
      return '(onsite OR "on-site" OR "in office") -remote';
    case "only":
      return '(remote OR "work from home" OR "work from anywhere")';
    case "exclude":
      return '-remote -"work from home" -"work from anywhere"';
    default:
      return "";
  }
}

function getExperienceQuery(value) {
  switch (value) {
    case "entry":
      return '("entry level" OR junior OR "new grad" OR university OR "0-2 years")';
    case "mid":
      return '("mid level" OR "2+ years" OR "3+ years" OR associate) -senior -principal';
    case "senior":
      return '(senior OR lead OR staff OR principal OR "5+ years")';
    case "manager":
      return '(manager OR director OR "team lead" OR head)';
    case "internship":
      return '(intern OR internship OR co-op)';
    default:
      return "";
  }
}

function getEmploymentQuery(value) {
  switch (value) {
    case "fulltime":
      return '("full-time" OR "full time" OR FTE)';
    case "contract":
      return '(contract OR contractor OR "contract-to-hire" OR C2H)';
    case "parttime":
      return '("part-time" OR "part time")';
    case "internship":
      return '(internship OR intern OR co-op)';
    default:
      return "";
  }
}

function getAuthorizationQuery(value) {
  switch (value) {
    case "optBroad":
      return '("OPT" OR "STEM OPT" OR "F-1" OR "E-Verify" OR "visa sponsorship" OR "H-1B" OR "work authorization" OR "authorized to work in the United States")';
    case "currentAuthorized":
      return '("authorized to work in the United States" OR "legally authorized" OR "work authorization" OR "US work authorization")';
    case "sponsorNeeded":
      return '("visa sponsorship" OR "H-1B sponsorship" OR "will sponsor" OR "sponsorship available" OR "OPT" OR "STEM OPT") -"unable to sponsor" -"no sponsorship" -"will not sponsor" -"cannot sponsor"';
    case "everify":
      return '("E-Verify" OR "e verify")';
    case "optStrict":
      return '("OPT" OR "STEM OPT" OR "F-1 OPT" OR "CPT")';
    default:
      return "";
  }
}

function buildIncludeQuery(terms) {
  return terms.map(formatTerm).join(" ");
}

function buildExcludeQuery(terms) {
  return terms.map(term => `-${formatTerm(term)}`).join(" ");
}

function formatTerm(term) {
  const cleaned = term.trim();
  if (!cleaned) {
    return "";
  }
  if (/^[-+()"]/.test(cleaned) || /\bOR\b/i.test(cleaned)) {
    return cleaned;
  }
  return cleaned.includes(" ") ? quoteTerm(cleaned) : cleaned;
}

function quoteTerm(term) {
  return `"${term.replace(/"/g, "").trim()}"`;
}

function buildSearchUrl(engine, query, time, portal, title, context) {
  if (shouldUseNativeUrl(portal, context)) {
    return buildNativeUrl(portal, title, context);
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
      return buildGoogleUrl(query, time, context.sort);
  }
}

function shouldUseNativeUrl(portal, context) {
  if (!portal.native) {
    return false;
  }
  return context.sort === "latest" || portal.native === "linkedin" || portal.native === "indeed" || portal.native === "usajobs";
}

function buildNativeUrl(portal, title, context) {
  switch (portal.native) {
    case "linkedin":
      return buildLinkedInUrl(title, context);
    case "indeed":
      return buildIndeedUrl(title, context);
    case "usajobs":
      return buildUSAJobsUrl(title, context);
    default:
      return buildGoogleUrl(buildPortalQuery(title, portal, context), context.time, context.sort);
  }
}

function buildNativeKeywordQuery(title, context) {
  const parts = [title];
  if (context.authorization === "optBroad") {
    parts.push("OPT OR STEM OPT OR sponsorship OR E-Verify");
  } else if (context.authorization === "sponsorNeeded") {
    parts.push("visa sponsorship OR H-1B");
  } else if (context.authorization === "optStrict") {
    parts.push("OPT OR STEM OPT");
  } else if (context.authorization === "everify") {
    parts.push("E-Verify");
  }
  parts.push(...context.includeTerms);
  return parts.filter(Boolean).join(" ");
}

function buildLinkedInUrl(title, context) {
  const params = new URLSearchParams();
  params.set("keywords", buildNativeKeywordQuery(title, context));
  params.set("location", getNativeLocation(context.location));
  params.set("sortBy", context.sort === "latest" ? "DD" : "R");
  const timeParam = getLinkedInTimeParam(context.time);
  if (timeParam) {
    params.set("f_TPR", timeParam);
  }
  if (context.remoteMode === "only") {
    params.set("f_WT", "2");
  } else if (context.remoteMode === "hybrid") {
    params.set("f_WT", "3");
  } else if (context.remoteMode === "onsite") {
    params.set("f_WT", "1");
  }
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

function buildIndeedUrl(title, context) {
  const params = new URLSearchParams();
  params.set("q", buildNativeKeywordQuery(title, context));
  params.set("l", getNativeLocation(context.location));
  if (context.sort === "latest") {
    params.set("sort", "date");
  }
  const fromage = getIndeedFromAge(context.time);
  if (fromage) {
    params.set("fromage", fromage);
  }
  if (context.remoteMode === "only") {
    params.set("sc", "0kf:attr(DSQF7);");
  }
  return `https://www.indeed.com/jobs?${params.toString()}`;
}

function buildUSAJobsUrl(title, context) {
  const params = new URLSearchParams();
  params.set("k", title);
  params.set("l", getNativeLocation(context.location));
  params.set("s", "startdate");
  params.set("sd", "desc");
  return `https://www.usajobs.gov/Search/Results?${params.toString()}`;
}

function getLinkedInTimeParam(time) {
  const map = {
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
  return map[time] || "";
}

function getIndeedFromAge(time) {
  const map = {
    "24hours": "1",
    "48hours": "3",
    "72hours": "3",
    week: "7",
    month: "14"
  };
  return map[time] || "";
}

function buildGoogleUrl(query, time, sort) {
  const tbs = getGoogleTbs(time, sort);
  return `https://www.google.com/search?q=${encodeURIComponent(query)}${tbs ? `&tbs=${encodeURIComponent(tbs)}` : ""}`;
}

function getGoogleTbs(time, sort) {
  const map = {
    "1hour": "qdr:h1",
    "4hours": "qdr:h4",
    "8hours": "qdr:h8",
    "12hours": "qdr:h12",
    "24hours": "qdr:d",
    "48hours": "qdr:h48",
    "72hours": "qdr:h72",
    week: "qdr:w",
    month: "qdr:m",
    year: "qdr:y",
    older1month: `cdr:1,cd_max:${getPastDate(1, "us")}`,
    older3months: `cdr:1,cd_max:${getPastDate(3, "us")}`,
    older6months: `cdr:1,cd_max:${getPastDate(6, "us")}`
  };
  const timePart = map[time] || "";
  if (sort === "latest") {
    return timePart ? `${timePart},sbd:1` : "sbd:1";
  }
  return timePart;
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

function getTimeLabel(value) {
  const option = Object.values(TIME_OPTIONS).flat().find(item => item.value === value);
  return option ? option.label : "All";
}

function getActiveFilterSummary(context) {
  return [
    getLocationLabel(context.location),
    getTimeLabel(context.time),
    FILTER_LABELS.sort[context.sort],
    FILTER_LABELS.remoteMode[context.remoteMode],
    FILTER_LABELS.authorization[context.authorization],
    FILTER_LABELS.experience[context.experience],
    FILTER_LABELS.employment[context.employment]
  ].filter(Boolean).join(" - ");
}

function updateAddressBar(titles, context) {
  const params = new URLSearchParams();
  params.set("job", titles.join(","));
  params.set("location", context.location);
  params.set("time", context.time);
  if (context.sort !== "recommended") {
    params.set("sort", context.sort);
  }
  if (context.engine !== "google") {
    params.set("engine", context.engine);
  }
  if (context.remoteMode !== "neutral") {
    params.set("remote", context.remoteMode);
  }
  if (context.matchMode !== "smart") {
    params.set("match", context.matchMode);
  }
  if (context.experience !== "any") {
    params.set("experience", context.experience);
  }
  if (context.employment !== "any") {
    params.set("employment", context.employment);
  }
  if (context.authorization !== "optBroad") {
    params.set("authorization", context.authorization);
  }
  if (context.includeTerms.length) {
    params.set("include", context.includeTerms.join(","));
  }
  if (context.excludeTerms.length) {
    params.set("exclude", context.excludeTerms.join(","));
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
  els.locationSelect.value = "usa";
  els.sortSelect.value = "recommended";
  els.remoteMode.value = "neutral";
  els.matchMode.value = "smart";
  els.experienceSelect.value = "any";
  els.employmentSelect.value = "any";
  els.authorizationSelect.value = "optBroad";
  els.includeTerms.value = "";
  els.excludeTerms.value = "";
  els.categoryFilters.querySelectorAll("input").forEach(input => {
    input.checked = true;
  });
  state.results = [];
  state.checked.clear();
  els.results.innerHTML = "";
  setEmptyState(true);
  updateCounts();
  updatePreviewForEmptyState();
  history.pushState(null, "", window.location.pathname);
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("portalScoutTheme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  syncThemeButton();
}

function loadTheme() {
  const stored = localStorage.getItem("portalScoutTheme");
  if (stored === "dark") {
    document.documentElement.classList.add("dark");
  }
  syncThemeButton();
}

function syncThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");
  els.themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  els.themeToggle.setAttribute("aria-pressed", String(isDark));
}
