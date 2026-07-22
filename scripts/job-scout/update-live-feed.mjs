import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUTPUT_PATH = fileURLToPath(new URL("../../public/job-portal-search/job-scout/data/live-jobs.json", import.meta.url));
const REQUEST_TIMEOUT_MS = 16000;
const REQUEST_DELAY_MS = 220;
const MAX_JOBS = 260;

const PROFILE = {
  name: "Taran Mamidala",
  summary: "US work-authorized OPT software engineer focused on backend services, REST APIs, data pipelines, cloud systems, and AI/ML applications.",
  targetRoles: [
    "software engineer",
    "software developer",
    "backend software engineer",
    "backend engineer",
    "java backend engineer",
    "python backend engineer",
    "api engineer",
    "data engineer",
    "data platform engineer",
    "machine learning engineer",
    "ai/ml engineer",
    "ai engineer",
    "cloud engineer",
    "cloud backend engineer",
    "platform engineer"
  ],
  roleVariants: [
    "application developer",
    "data pipeline engineer",
    "etl developer",
    "ml engineer",
    "new grad software engineer",
    "early career software engineer",
    "software development engineer",
    "backend developer",
    "java developer",
    "python developer"
  ],
  skills: [
    "java",
    "python",
    "sql",
    "spring boot",
    "fastapi",
    "flask",
    "rest api",
    "microservices",
    "postgresql",
    "mysql",
    "oracle",
    "mongodb",
    "dynamodb",
    "aws",
    "ec2",
    "s3",
    "lambda",
    "rds",
    "api gateway",
    "docker",
    "ci/cd",
    "github actions",
    "kafka",
    "spark structured streaming",
    "etl",
    "data pipelines",
    "sqlalchemy",
    "pydantic",
    "alembic",
    "pytest",
    "pytorch",
    "scikit-learn",
    "pandas",
    "numpy",
    "langchain",
    "rag",
    "vector database"
  ],
  preferredLocations: [
    "united states",
    "remote us",
    "new york",
    "chicago",
    "buffalo",
    "dallas",
    "texas",
    "california",
    "seattle",
    "boston",
    "austin",
    "raleigh"
  ],
  entrySignals: ["entry level", "junior", "new grad", "university graduate", "early career", "0-2 years", "0-3 years", "associate"],
  authSignals: ["opt", "stem opt", "f-1", "e-verify", "visa sponsorship", "h-1b", "work authorization", "sponsorship"],
  titleExcludes: [
    "senior",
    "sr",
    "sr.",
    "staff",
    "principal",
    "lead",
    "manager",
    "director",
    "architect",
    "qa",
    "sdet",
    "test engineer",
    "test automation",
    "test infra",
    "test platform",
    "quality assurance",
    "security",
    "security engineer",
    "cybersecurity",
    "product analyst",
    "business analyst",
    "systems analyst",
    "salesforce",
    "project manager"
  ],
  hardExcludes: ["us citizenship required", "must be a us citizen", "security clearance", "secret clearance", "top secret", "unpaid", "commission only"]
};

const ATS_SOURCES = [
  ["greenhouse", "Databricks", "databricks", "direct ATS"],
  ["greenhouse", "Anthropic", "anthropic", "direct ATS"],
  ["greenhouse", "Scale AI", "scaleai", "direct ATS"],
  ["greenhouse", "Stripe", "stripe", "direct ATS"],
  ["greenhouse", "Reddit", "reddit", "direct ATS"],
  ["greenhouse", "DoorDash", "doordash", "direct ATS"],
  ["greenhouse", "Coinbase", "coinbase", "direct ATS"],
  ["greenhouse", "Cloudflare", "cloudflare", "direct ATS"],
  ["greenhouse", "MongoDB", "mongodb", "direct ATS"],
  ["greenhouse", "Samsara", "samsara", "direct ATS"],
  ["greenhouse", "Plaid", "plaid", "direct ATS"],
  ["greenhouse", "Notion", "notion", "direct ATS"],
  ["greenhouse", "Ramp", "ramp", "direct ATS"],
  ["greenhouse", "Instacart", "instacart", "direct ATS"],
  ["greenhouse", "Roblox", "roblox", "direct ATS"],
  ["greenhouse", "Airbnb", "airbnb", "direct ATS"],
  ["greenhouse", "Robinhood", "robinhood", "direct ATS"],
  ["greenhouse", "Affirm", "affirm", "direct ATS"],
  ["greenhouse", "HubSpot", "hubspot", "direct ATS"],
  ["greenhouse", "Snowflake", "snowflakecomputing", "direct ATS"],
  ["lever", "Vercel", "vercel", "direct ATS"],
  ["lever", "Figma", "figma", "direct ATS"],
  ["lever", "Benchling", "benchling", "direct ATS"],
  ["lever", "Postman", "postman", "direct ATS"],
  ["lever", "Niantic", "niantic", "direct ATS"],
  ["ashby", "OpenAI", "openai", "direct ATS"],
  ["ashby", "Perplexity", "perplexity", "direct ATS"],
  ["ashby", "Modal", "modal", "direct ATS"],
  ["ashby", "Anysphere", "anysphere", "direct ATS"],
  ["ashby", "Weights & Biases", "wandb", "direct ATS"]
];

const US_LOCATION_RE = /\b(united states|usa|u\.s\.|remote us|remote,? us|new york|nyc|ny|chicago|illinois|il|buffalo|dallas|texas|tx|california|ca|seattle|washington|wa|boston|massachusetts|ma|austin|raleigh|north carolina|nc|san francisco|bay area|san jose|los angeles|la|denver|colorado|co|atlanta|georgia|ga|miami|florida|fl|new jersey|nj|connecticut|ct|arizona|az|virginia|va|maryland|md|pennsylvania|pa|ohio|oh|michigan|mi|wisconsin|wi|oregon|or)\b/i;
const REMOTE_RE = /\b(remote|work from home|anywhere)\b/i;
const NON_US_REGION_RE = /\b(europe|emea|germany|berlin|france|paris|spain|madrid|uk|united kingdom|london|canada|toronto|vancouver|india|hyderabad|bangalore|bengaluru|singapore|australia|sydney|melbourne|japan|tokyo|korea|south korea|seoul|netherlands|amsterdam|ireland|dublin|poland|warsaw|portugal|lisbon|brazil|mexico)\b/i;
const GENERIC_LOCATION_RE = /^(hybrid|in-office|in office|onsite|on-site|remote|multiple locations|various locations|unknown)$/i;

async function main() {
  const generatedAt = new Date().toISOString();
  const sourceStatuses = [];
  const errors = [];
  const jobs = [];

  await collect("Hacker News Jobs", sourceStatuses, errors, jobs, fetchHackerNewsJobs);
  await collect("Arbeitnow Public API", sourceStatuses, errors, jobs, fetchArbeitnowJobs);
  await collect("Direct ATS Boards", sourceStatuses, errors, jobs, fetchDirectAtsJobs);
  await collect("USAJOBS Optional API", sourceStatuses, errors, jobs, fetchUsaJobsIfConfigured);

  const filtered = dedupeJobs(jobs)
    .map(job => ({ ...job, ...scoreJob(job) }))
    .filter(job => job.score >= 35)
    .sort((a, b) => b.score - a.score || dateValue(b.postedAt) - dateValue(a.postedAt))
    .slice(0, MAX_JOBS);
  const published = filtered.map(toPublishedJob);

  const payload = {
    generatedAt,
    refreshCadenceMinutes: 30,
    profile: PROFILE,
    stats: {
      collected: jobs.length,
      deduped: dedupeJobs(jobs).length,
      published: published.length,
      sources: sourceStatuses.length
    },
    sourceStatuses,
    errors,
    jobs: published
  };

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${published.length} jobs to ${OUTPUT_PATH}`);
}

async function collect(name, sourceStatuses, errors, jobs, fn) {
  const started = Date.now();
  try {
    const next = await fn();
    jobs.push(...next);
    sourceStatuses.push({ name, status: "ok", count: next.length, ms: Date.now() - started });
  } catch (error) {
    const message = String(error?.message || error);
    errors.push(`${name}: ${message}`);
    sourceStatuses.push({ name, status: "error", count: 0, ms: Date.now() - started, message });
  }
}

async function fetchHackerNewsJobs() {
  const ids = await fetchJson("https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty");
  const out = [];
  for (const id of (ids || []).slice(0, 80)) {
    await sleep(REQUEST_DELAY_MS / 2);
    const item = await fetchJson(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    if (!item || item.deleted || item.dead) continue;
    const title = cleanText(item.title || "");
    const company = inferCompanyFromTitle(title);
    out.push({
      id: `hn-${item.id}`,
      title,
      company,
      location: inferLocation(`${title} ${item.text || ""}`),
      workSetting: REMOTE_RE.test(`${title} ${item.text || ""}`) ? "remote" : "",
      postedAt: item.time ? new Date(item.time * 1000).toISOString() : "",
      postedLabel: item.time ? labelFromDate(new Date(item.time * 1000)) : "Unknown",
      source: "Hacker News Jobs",
      sourceType: "public API",
      url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
      description: cleanText(item.text || title),
      companyWebsite: item.url || "",
      tags: ["startup", "engineering"]
    });
  }
  return out;
}

async function fetchArbeitnowJobs() {
  const data = await fetchJson("https://www.arbeitnow.com/api/job-board-api");
  const rows = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
  return rows.slice(0, 250).map(row => ({
    id: `arbeitnow-${row.slug || row.id || row.url || row.title}`,
    title: cleanText(row.title || ""),
    company: cleanText(row.company_name || row.company || "Company"),
    location: cleanText(row.location || (row.remote ? "Remote" : "")),
    workSetting: row.remote ? "remote" : "",
    postedAt: normalizeDate(row.created_at || row.createdAt || row.date),
    postedLabel: labelFromDate(normalizeDate(row.created_at || row.createdAt || row.date)),
    source: "Arbeitnow Public API",
    sourceType: "public API",
    url: row.url || row.apply_url || "",
    description: cleanText(row.description || ""),
    companyWebsite: "",
    tags: Array.isArray(row.tags) ? row.tags : []
  }));
}

async function fetchDirectAtsJobs() {
  const out = [];
  for (const [type, company, slug, group] of ATS_SOURCES) {
    await sleep(REQUEST_DELAY_MS);
    try {
      const rows = await fetchAtsBoard(type, company, slug, group);
      out.push(...rows);
    } catch (error) {
      console.warn(`${company} ${type} skipped: ${error.message}`);
    }
  }
  return out;
}

async function fetchAtsBoard(type, company, slug, group) {
  if (type === "greenhouse") {
    const data = await fetchJson(`https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(slug)}/jobs?content=true`);
    return (data.jobs || []).map(job => ({
      id: `greenhouse-${slug}-${job.id}`,
      title: cleanText(job.title || ""),
      company,
      location: cleanText(job.location?.name || ""),
      workSetting: normalizeWorkSetting(`${job.location?.name || ""} ${job.content || ""}`),
      postedAt: normalizeDate(job.updated_at),
      postedLabel: labelFromDate(normalizeDate(job.updated_at)),
      source: `${company} Greenhouse`,
      sourceType: group,
      url: job.absolute_url || "",
      description: cleanText(job.content || ""),
      companyWebsite: job.absolute_url || "",
      tags: (job.departments || []).map(item => item.name).filter(Boolean)
    }));
  }

  if (type === "lever") {
    const data = await fetchJson(`https://api.lever.co/v0/postings/${encodeURIComponent(slug)}?mode=json`);
    return (Array.isArray(data) ? data : []).map(job => ({
      id: `lever-${slug}-${job.id}`,
      title: cleanText(job.text || ""),
      company,
      location: cleanText(job.categories?.location || ""),
      workSetting: normalizeWorkSetting(`${job.categories?.location || ""} ${job.descriptionPlain || ""}`),
      postedAt: job.createdAt ? new Date(job.createdAt).toISOString() : "",
      postedLabel: job.createdAt ? labelFromDate(new Date(job.createdAt)) : "Unknown",
      source: `${company} Lever`,
      sourceType: group,
      url: job.hostedUrl || job.applyUrl || "",
      description: cleanText([job.descriptionPlain, ...(job.lists || []).map(list => `${list.text} ${list.content}`)].join(" ")),
      companyWebsite: job.hostedUrl || "",
      tags: [job.categories?.team, job.categories?.commitment].filter(Boolean)
    }));
  }

  if (type === "ashby") {
    const data = await fetchJson(`https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(slug)}`);
    return (data.jobs || []).map(job => ({
      id: `ashby-${slug}-${job.id}`,
      title: cleanText(job.title || ""),
      company,
      location: cleanText(job.location || ""),
      workSetting: normalizeWorkSetting(`${job.location || ""} ${job.descriptionHtml || ""}`),
      postedAt: normalizeDate(job.publishedAt || job.updatedAt),
      postedLabel: labelFromDate(normalizeDate(job.publishedAt || job.updatedAt)),
      source: `${company} Ashby`,
      sourceType: group,
      url: job.jobUrl || job.applyUrl || "",
      description: cleanText(job.descriptionHtml || ""),
      companyWebsite: job.jobUrl || "",
      tags: [job.department, job.employmentType].filter(Boolean)
    }));
  }

  return [];
}

async function fetchUsaJobsIfConfigured() {
  const apiKey = process.env.USAJOBS_API_KEY;
  const userAgent = process.env.USAJOBS_USER_AGENT || process.env.USAJOBS_EMAIL;
  if (!apiKey || !userAgent) {
    return [];
  }
  const out = [];
  for (const keyword of ["software engineer", "data engineer", "python developer"]) {
    const params = new URLSearchParams({
      Keyword: keyword,
      LocationName: "United States",
      ResultsPerPage: "25",
      DatePosted: "1",
      SortField: "DatePosted",
      SortDirection: "Desc"
    });
    await sleep(REQUEST_DELAY_MS);
    const data = await fetchJson(`https://data.usajobs.gov/api/search?${params.toString()}`, {
      headers: {
        Host: "data.usajobs.gov",
        "User-Agent": userAgent,
        "Authorization-Key": apiKey
      }
    });
    const rows = data?.SearchResult?.SearchResultItems || [];
    out.push(...rows.map(item => {
      const d = item.MatchedObjectDescriptor || {};
      return {
        id: `usajobs-${d.PositionID || d.PositionURI}`,
        title: cleanText(d.PositionTitle || ""),
        company: cleanText(d.OrganizationName || "USAJOBS"),
        location: cleanText((d.PositionLocation || []).map(loc => loc.LocationName).join(", ")),
        workSetting: normalizeWorkSetting(`${d.PositionLocationDisplay || ""} ${d.UserArea?.Details?.JobSummary || ""}`),
        postedAt: normalizeDate(d.PublicationStartDate),
        postedLabel: labelFromDate(normalizeDate(d.PublicationStartDate)),
        source: "USAJOBS",
        sourceType: "official API",
        url: d.PositionURI || "",
        description: cleanText(`${d.UserArea?.Details?.JobSummary || ""} ${d.QualificationSummary || ""}`),
        companyWebsite: "",
        tags: [d.JobCategory?.[0]?.Name, d.PositionSchedule?.[0]?.Name, d.PositionOfferingType?.[0]?.Name].filter(Boolean)
      };
    }));
  }
  return out;
}

function scoreJob(job) {
  const title = normalize(job.title);
  const text = normalize(`${job.title} ${job.company} ${job.location} ${job.description} ${(job.tags || []).join(" ")}`);
  const titleExcludeHits = PROFILE.titleExcludes.filter(term => includes(title, term));
  const hardWarnings = PROFILE.hardExcludes.filter(term => includes(text, term));
  const roleHits = [...PROFILE.targetRoles, ...PROFILE.roleVariants].filter(term => includes(title, term) || titleWordsMatch(title, term));
  const skillHits = PROFILE.skills.filter(term => includes(text, term));
  const entryHits = PROFILE.entrySignals.filter(term => includes(text, term));
  const authHits = PROFILE.authSignals.filter(term => includes(text, term));
  const locationOk = isTargetLocation(job.location, text);
  const freshScore = getFreshnessScore(job.postedAt);
  const sourceScore = /direct ATS|official API/i.test(job.sourceType) ? 12 : /public API/i.test(job.sourceType) ? 8 : 5;
  const roleScore = Math.min(34, roleHits.length * 15 + (/\b(engineer|developer|software|backend|data|machine learning|ai|cloud|platform)\b/.test(title) ? 8 : 0));
  const skillScore = Math.min(26, skillHits.length * 3.3);
  const entryScore = entryHits.length ? 8 : titleExcludeHits.length ? -18 : 4;
  const locationScore = locationOk ? 9 : -14;
  const authScore = authHits.length ? 6 : 0;
  const warningPenalty = hardWarnings.length * 18 + titleExcludeHits.length * 8;
  const score = Math.max(0, Math.min(100, Math.round(roleScore + skillScore + entryScore + locationScore + authScore + sourceScore + freshScore - warningPenalty)));
  const fitReasons = [
    roleHits.length ? `Role: ${roleHits.slice(0, 3).join(", ")}` : "",
    skillHits.length ? `Skills: ${skillHits.slice(0, 8).join(", ")}` : "",
    entryHits.length ? `Level: ${entryHits.slice(0, 3).join(", ")}` : "",
    authHits.length ? `Auth signal: ${authHits.slice(0, 3).join(", ")}` : "",
    locationOk ? "US/remote target" : "",
    `${job.sourceType || "source"} source`
  ].filter(Boolean);
  const warnings = [
    ...hardWarnings.map(term => `Hard review: ${term}`),
    ...titleExcludeHits.map(term => `Seniority review: ${term}`),
    ...(!locationOk ? ["Location may not fit US target"] : [])
  ];
  return { score, fitReasons, warnings, skillHits: skillHits.slice(0, 12), roleHits: roleHits.slice(0, 5) };
}

function dedupeJobs(jobs) {
  const seen = new Map();
  jobs.forEach(job => {
    if (!job.title || !job.company || !job.url) return;
    if (!isProfileRelevant(job)) return;
    const key = normalize(job.url) || normalize(`${job.company}-${job.title}-${job.location}`);
    const current = seen.get(key);
    if (!current || dateValue(job.postedAt) > dateValue(current.postedAt)) {
      seen.set(key, job);
    }
  });
  return Array.from(seen.values());
}

function isProfileRelevant(job) {
  const title = normalize(job.title);
  const text = normalize(`${job.title} ${job.company} ${job.location} ${job.description} ${(job.tags || []).join(" ")}`);
  if (PROFILE.hardExcludes.some(term => includes(text, term))) return false;
  if (PROFILE.titleExcludes.some(term => includes(title, term))) return false;
  if (!isTargetLocation(job.location, text)) return false;
  const roleHit = [...PROFILE.targetRoles, ...PROFILE.roleVariants].some(term => includes(title, term) || titleWordsMatch(title, term));
  const skillHits = PROFILE.skills.filter(term => includes(text, term)).length;
  return roleHit || skillHits >= 3;
}

function isTargetLocation(location, text) {
  const primary = String(location || "").trim();
  if (primary) {
    if (US_LOCATION_RE.test(primary)) return true;
    if (REMOTE_RE.test(primary) && !NON_US_REGION_RE.test(primary)) return true;
    if (NON_US_REGION_RE.test(primary)) return false;
    if (!GENERIC_LOCATION_RE.test(primary)) return false;
  }
  const fallback = String(text || "");
  if (US_LOCATION_RE.test(fallback)) return true;
  if (REMOTE_RE.test(fallback) && !NON_US_REGION_RE.test(fallback)) return true;
  return false;
}

async function fetchJson(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": "TaranJobScout/1.0 (+https://taran-dev4u.github.io/job-portal-search/job-scout/)",
        Accept: "application/json,text/plain,*/*",
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function normalizeDate(value) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isFinite(date.valueOf()) ? date.toISOString() : "";
}

function dateValue(value) {
  const time = Date.parse(value || "");
  return Number.isFinite(time) ? time : 0;
}

function labelFromDate(value) {
  const iso = normalizeDate(value);
  if (!iso) return "Unknown";
  const age = Date.now() - Date.parse(iso);
  if (age < 60 * 60 * 1000) return "Minutes ago";
  if (age < 24 * 60 * 60 * 1000) return "Today";
  if (age < 7 * 24 * 60 * 60 * 1000) return "This week";
  return "Older";
}

function normalizeWorkSetting(value) {
  const text = normalize(value);
  if (/hybrid/.test(text)) return "hybrid";
  if (/remote|work from home|anywhere/.test(text) && !/not remote|no remote|non remote/.test(text)) return "remote";
  if (/onsite|on-site|in office|in-office|office/.test(text)) return "onsite";
  return "";
}

function inferCompanyFromTitle(title) {
  const first = String(title || "").split(/\s+is\s+hiring|\s+seeks|\s+looking/i)[0];
  return cleanText(first).replace(/\s*\([^)]*\)\s*/g, "").slice(0, 80) || "HN Company";
}

function inferLocation(text) {
  if (/remote/i.test(text)) return "Remote";
  const match = String(text || "").match(US_LOCATION_RE);
  return match ? match[0] : "United States";
}

function getFreshnessScore(value) {
  const time = Date.parse(value || "");
  if (!Number.isFinite(time)) return 2;
  const age = Date.now() - time;
  if (age < 60 * 60 * 1000) return 15;
  if (age < 24 * 60 * 60 * 1000) return 12;
  if (age < 7 * 24 * 60 * 60 * 1000) return 7;
  return 2;
}

function titleWordsMatch(title, term) {
  const titleTokens = new Set(normalize(title).split(/\s+/));
  const tokens = normalize(term).split(/\s+/).filter(token => token.length > 2);
  return tokens.length >= 2 && tokens.every(token => titleTokens.has(token));
}

function includes(text, term) {
  const normalizedText = normalize(text);
  const normalizedTerm = normalize(term);
  if (!normalizedTerm) return false;
  const escaped = normalizedTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`, "i").test(normalizedText);
}

function cleanText(value) {
  return String(value || "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

function toPublishedJob(job) {
  const description = cleanText(job.description || "");
  return {
    ...job,
    description: makeSnippet(description, 640),
    descriptionLength: description.length
  };
}

function makeSnippet(value, maxLength) {
  const text = cleanText(value);
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength).replace(/\s+\S*$/, "").trim();
  return `${clipped}...`;
}

function normalize(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(async error => {
  const generatedAt = new Date().toISOString();
  const fallback = await readExistingFeed(generatedAt, error);
  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(fallback, null, 2)}\n`, "utf8");
  console.error(error);
});

async function readExistingFeed(generatedAt, error) {
  try {
    const raw = await readFile(OUTPUT_PATH, "utf8");
    const existing = JSON.parse(raw);
    return {
      ...existing,
      generatedAt,
      errors: [...(existing.errors || []), `Collector failed: ${String(error?.message || error)}`]
    };
  } catch {
    return {
      generatedAt,
      refreshCadenceMinutes: 30,
      profile: PROFILE,
      stats: { collected: 0, deduped: 0, published: 0, sources: 0 },
      sourceStatuses: [],
      errors: [`Collector failed: ${String(error?.message || error)}`],
      jobs: []
    };
  }
}
