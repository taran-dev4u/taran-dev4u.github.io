"use strict";

const STORAGE_KEY = "optJobCommandCenterPrefs";
const THEME_KEY = "optJobCommandCenterTheme";
const ALL_COMPANIES_ID = "__all_companies__";
const DEFAULT_PROFILE_ID = "softwareAiDataEntryOpt";
const DEFAULT_ROLE_PACK_ID = "all-role-families";
const CAUTION_EXCLUDE_TERMS = ["unpaid", "commission only", "clearance", "US citizenship required", "must be a US citizen"];

const CATEGORY_ROWS = [
  ["top", "Top Sources", true],
  ["direct", "Direct ATS", true],
  ["signals", "LinkedIn Signals", true],
  ["general", "General Boards", true],
  ["tech", "Tech and Startups", true],
  ["company", "Company Careers", true],
  ["remote", "Remote Boards", true],
  ["public", "Public and Nonprofit", true],
  ["research", "Research Tools", false]
];

const CATEGORIES = CATEGORY_ROWS.map(([id, label, checked]) => ({ id, label, checked }));
const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map(category => [category.id, category.label]));
const DEFAULT_CATEGORY_IDS = CATEGORIES.filter(category => category.checked).map(category => category.id);

const SEARCH_PROFILES = [
  {
    id: "softwareAiDataEntryOpt",
    label: "Software / AI / Data - Entry OPT",
    description: "Personal default for US-wide entry/new-grad software, AI, and data searches. Keeps coverage broad and uses OPT/sponsor wording as companion research.",
    defaults: { time: "all", sort: "coverage", authorization: "none", experience: "entry", rolePack: "all-role-families", precision: "coverage", matchMode: "smart" },
    categories: DEFAULT_CATEGORY_IDS
  },
  {
    id: "latest1",
    label: "Latest 1h",
    description: "Urgent apply flow for postings from the last hour on sources with reliable date filters.",
    defaults: { time: "1hour", sort: "latest", authorization: "none", experience: "entry", rolePack: "all-role-families", precision: "latest1", matchMode: "smart" },
    categories: ["top", "direct", "signals", "general", "tech", "company"]
  },
  {
    id: "maxCoverage",
    label: "Max Coverage",
    description: "Broadest US search. Keeps authorization filters off so useful results are not hidden.",
    defaults: { time: "all", sort: "coverage", authorization: "none", precision: "coverage" },
    categories: DEFAULT_CATEGORY_IDS
  },
  {
    id: "latest24",
    label: "Latest 24h",
    description: "Newest-first links for daily searching across the most active job sources.",
    defaults: { time: "24hours", sort: "latest", authorization: "none", precision: "latest24" },
    categories: DEFAULT_CATEGORY_IDS
  },
  {
    id: "optFriendly",
    label: "OPT Friendly",
    description: "Adds OPT, STEM OPT, E-Verify, sponsorship, and US work authorization terms.",
    defaults: { time: "week", sort: "recommended", authorization: "optBroad", precision: "optSponsor" },
    categories: ["top", "direct", "signals", "general", "tech", "company"]
  },
  {
    id: "sponsorResearch",
    label: "Sponsor Research",
    description: "Focuses on sponsorship signals, H-1B history, E-Verify, and employer research.",
    defaults: { time: "month", sort: "coverage", authorization: "sponsorNeeded", precision: "optSponsor" },
    categories: ["top", "direct", "company", "research"]
  },
  {
    id: "directATS",
    label: "Direct ATS",
    description: "Prioritizes direct application pages and common ATS systems.",
    defaults: { time: "week", sort: "direct", authorization: "none", precision: "direct" },
    categories: ["top", "direct", "company"]
  },
  {
    id: "linkedinPosts",
    label: "LinkedIn Posts",
    description: "Surfaces fresh recruiter and hiring-manager posts using LinkedIn content search.",
    defaults: { time: "24hours", sort: "latest", authorization: "none", precision: "latest24" },
    categories: ["top", "signals"]
  }
];

const PROFILE_LABELS = Object.fromEntries(SEARCH_PROFILES.map(profile => [profile.id, profile.label]));

const PORTAL_ROWS = [
  { id: "linkedinJobs", name: "LinkedIn Jobs", category: "top", native: "linkedinJobs", sites: ["linkedin.com/jobs"], priority: 100, tags: ["native filters", "high reach"], note: "Uses LinkedIn date, experience, job type, work setting, and newest-first filters when selected." },
  { id: "indeed", name: "Indeed", category: "top", native: "indeed", sites: ["indeed.com/jobs"], priority: 99, tags: ["native filters", "high reach"], note: "Uses Indeed query, location, date, remote, and newest sorting when selected." },
  { id: "directATS", name: "Direct ATS Search", category: "direct", rawSiteQuery: "(site:greenhouse.io OR site:lever.co OR site:ashbyhq.com OR site:myworkdayjobs.com OR site:pinpointhq.com OR site:recruiting.paylocity.com OR site:keka.com OR site:jobs.workable.com OR site:breezy.hr OR site:wellfound.com OR site:workatastartup.com OR site:oraclecloud.com OR site:recruitee.com OR site:rippling.com OR site:rippling-ats.com OR site:jobs.gusto.com OR site:careerpuck.com OR site:teamtailor.com OR site:jobs.smartrecruiters.com OR site:jobappnetwork.com OR site:homerun.co OR site:gem.com OR site:trakstar.com OR site:catsone.com OR site:applytojob.com OR site:jobvite.com OR site:icims.com OR site:dover.io OR site:notion.site OR site:workforcenow.adp.com OR site:myjobs.adp.com OR site:factorialhr.com OR site:trinethire.com)", priority: 98, tags: ["direct apply", "ATS"], note: "Searches Brian's ATS/source set together for fresher direct postings." },
  { id: "linkedinPosts", name: "LinkedIn Posts", category: "signals", native: "linkedinPosts", sites: ["linkedin.com/search/results/content"], priority: 97, tags: ["hiring posts", "fresh"], note: "Uses LinkedIn content search with hiring keywords and date-posted sorting." },
  { id: "google", name: "Google Jobs Web Search", category: "top", native: "google", priority: 96, tags: ["broad web", "date tools"], note: "Broad Google query across job posts, career pages, and hiring pages." },
  { id: "glassdoor", name: "Glassdoor", category: "general", sites: ["glassdoor.com/Job", "glassdoor.com/job-listing"], priority: 95, tags: ["salary context"] },
  { id: "ziprecruiter", name: "ZipRecruiter", category: "general", native: "ziprecruiter", sites: ["ziprecruiter.com/jobs"], priority: 94, tags: ["general board"] },
  { id: "dice", name: "Dice", category: "general", native: "dice", sites: ["dice.com/jobs"], priority: 93, tags: ["tech board"] },
  { id: "builtin", name: "Built In", category: "tech", native: "builtin", sites: ["builtin.com/jobs", "builtin.com/job"], priority: 92, tags: ["tech cities"] },
  { id: "handshake", name: "Handshake", category: "general", sites: ["joinhandshake.com", "app.joinhandshake.com"], priority: 91, tags: ["students", "new grad"] },
  { id: "simplify", name: "Simplify", category: "tech", native: "simplify", sites: ["simplify.jobs"], priority: 90, tags: ["new grad", "tech"] },
  { id: "hiringCafe", name: "HiringCafe", category: "tech", sites: ["hiring.cafe"], priority: 89, tags: ["fresh listings"] },
  { id: "wellfound", name: "Wellfound", category: "tech", native: "wellfound", sites: ["wellfound.com/jobs"], priority: 88, tags: ["startups"] },
  { id: "yc", name: "Y Combinator Jobs", category: "tech", native: "yc", sites: ["ycombinator.com/jobs", "workatastartup.com/jobs"], priority: 87, tags: ["startups"] },
  { id: "levels", name: "Levels.fyi Jobs", category: "tech", native: "levels", sites: ["levels.fyi/jobs"], priority: 86, tags: ["tech pay"] },
  { id: "welcome", name: "Welcome to the Jungle", category: "tech", native: "welcome", sites: ["welcometothejungle.com/en/jobs"], priority: 85, tags: ["startups"] },
  { id: "ripplematch", name: "RippleMatch", category: "general", sites: ["ripplematch.com/careers"], priority: 84, tags: ["early career"] },
  { id: "wayup", name: "WayUp", category: "general", sites: ["wayup.com/s/jobs"], priority: 83, tags: ["students"] },
  { id: "monster", name: "Monster", category: "general", native: "monster", sites: ["monster.com/jobs", "monster.com/job-openings"], priority: 82, tags: ["general board"] },
  { id: "careerbuilder", name: "CareerBuilder", category: "general", native: "careerbuilder", sites: ["careerbuilder.com/jobs", "careerbuilder.com/job"], priority: 81, tags: ["general board"] },
  { id: "ladders", name: "Ladders", category: "general", sites: ["theladders.com/job"], priority: 80, tags: ["professional"] },
  { id: "flexjobs", name: "FlexJobs", category: "remote", sites: ["flexjobs.com/search"], priority: 79, tags: ["remote", "hybrid"] },
  { id: "remoteRocketship", name: "Remote Rocketship", category: "remote", native: "remoteRocketship", sites: ["remoterocketship.com"], priority: 78, tags: ["remote tech"] },
  { id: "remotive", name: "Remotive", category: "remote", native: "remotive", sites: ["remotive.com"], priority: 77.5, tags: ["remote"] },
  { id: "weWorkRemotely", name: "We Work Remotely", category: "remote", native: "weWorkRemotely", sites: ["weworkremotely.com/remote-jobs"], priority: 77, tags: ["remote"] },
  { id: "remoteOk", name: "Remote OK", category: "remote", native: "remoteOk", sites: ["remoteok.com/remote-jobs"], priority: 76, tags: ["remote"] },
  { id: "usajobs", name: "USAJOBS", category: "public", native: "usajobs", sites: ["usajobs.gov/job"], priority: 75, tags: ["public sector"], note: "Some federal roles require citizenship or clearance. Read eligibility carefully." },
  { id: "idealist", name: "Idealist", category: "public", native: "idealist", sites: ["idealist.org/en/jobs"], priority: 74, tags: ["nonprofit"] },
  { id: "higherEdJobs", name: "HigherEdJobs", category: "public", native: "higherEdJobs", sites: ["higheredjobs.com"], priority: 73, tags: ["universities"] },
  { id: "governmentJobs", name: "GovernmentJobs", category: "public", native: "governmentJobs", sites: ["governmentjobs.com/careers"], priority: 72, tags: ["state/local"] },
  { id: "careersSubdomains", name: "Careers Subdomains", category: "company", rawSiteQuery: "(site:careers.* OR site:*/careers/* OR site:*/career/*)", priority: 71, tags: ["company pages"] },
  { id: "jobsSubdomains", name: "Jobs Subdomains", category: "company", rawSiteQuery: "(site:jobs.* OR site:*/jobs/* OR site:*/job/*)", priority: 70, tags: ["company pages"] },
  { id: "peopleSubdomains", name: "People Subdomains", category: "company", rawSiteQuery: "(site:people.* OR site:*/people/*)", priority: 69.8, tags: ["company pages"] },
  { id: "talentSubdomains", name: "Talent Subdomains", category: "company", rawSiteQuery: "(site:talent.* OR site:*/talent/*)", priority: 69.6, tags: ["company pages"] },
  { id: "otherJobPages", name: "Other Job Pages", category: "company", rawSiteQuery: "(site:*/employment/* OR site:*/opportunities/* OR site:*/openings/* OR site:*/join-us/* OR site:*/work-with-us/*)", priority: 69.4, tags: ["company pages"] },
  { id: "greenhouse", name: "Greenhouse", category: "direct", sites: ["greenhouse.io"], priority: 69, tags: ["ATS"] },
  { id: "lever", name: "Lever", category: "direct", sites: ["lever.co"], priority: 68, tags: ["ATS"] },
  { id: "ashby", name: "Ashby", category: "direct", sites: ["ashbyhq.com"], priority: 67, tags: ["ATS"] },
  { id: "workdayAts", name: "Workday", category: "direct", sites: ["myworkdayjobs.com"], priority: 66, tags: ["ATS"] },
  { id: "smartRecruiters", name: "SmartRecruiters", category: "direct", sites: ["jobs.smartrecruiters.com"], priority: 65, tags: ["ATS"] },
  { id: "icims", name: "iCIMS", category: "direct", sites: ["icims.com/jobs"], priority: 64, tags: ["ATS"] },
  { id: "pinpoint", name: "Pinpoint", category: "direct", sites: ["pinpointhq.com"], priority: 63.8, tags: ["ATS", "Brian source"] },
  { id: "paylocity", name: "Paylocity", category: "direct", sites: ["recruiting.paylocity.com"], priority: 63.6, tags: ["ATS", "Brian source"] },
  { id: "keka", name: "Keka", category: "direct", sites: ["keka.com"], priority: 63.4, tags: ["ATS", "Brian source"] },
  { id: "workable", name: "Workable", category: "direct", sites: ["jobs.workable.com"], priority: 63.2, tags: ["ATS", "Brian source"] },
  { id: "breezy", name: "BreezyHR", category: "direct", sites: ["breezy.hr"], priority: 63, tags: ["ATS", "Brian source"] },
  { id: "oracleCloud", name: "Oracle Cloud", category: "direct", sites: ["oraclecloud.com"], priority: 62.8, tags: ["ATS", "Brian source"] },
  { id: "recruitee", name: "Recruitee", category: "direct", sites: ["recruitee.com"], priority: 62.6, tags: ["ATS", "Brian source"] },
  { id: "ripplingAts", name: "Rippling", category: "direct", rawSiteQuery: "(site:rippling.com OR site:rippling-ats.com)", priority: 62.4, tags: ["ATS", "Brian source"] },
  { id: "gustoJobs", name: "Gusto Jobs", category: "direct", sites: ["jobs.gusto.com"], priority: 62.2, tags: ["ATS", "Brian source"] },
  { id: "careerPuck", name: "CareerPuck", category: "direct", sites: ["careerpuck.com"], priority: 62, tags: ["ATS", "Brian source"] },
  { id: "teamtailor", name: "Teamtailor", category: "direct", sites: ["teamtailor.com"], priority: 61.8, tags: ["ATS", "Brian source"] },
  { id: "talentReef", name: "TalentReef", category: "direct", sites: ["jobappnetwork.com"], priority: 61.6, tags: ["ATS", "Brian source"] },
  { id: "homerun", name: "Homerun", category: "direct", sites: ["homerun.co"], priority: 61.4, tags: ["ATS", "Brian source"] },
  { id: "gem", name: "Gem", category: "direct", sites: ["gem.com"], priority: 61.2, tags: ["ATS", "Brian source"] },
  { id: "trakstar", name: "Trakstar", category: "direct", sites: ["trakstar.com"], priority: 61, tags: ["ATS", "Brian source"] },
  { id: "cats", name: "Cats", category: "direct", sites: ["catsone.com"], priority: 60.8, tags: ["ATS", "Brian source"] },
  { id: "jazzhr", name: "JazzHR", category: "direct", sites: ["applytojob.com"], priority: 60.6, tags: ["ATS", "Brian source"] },
  { id: "jobvite", name: "Jobvite", category: "direct", sites: ["jobvite.com"], priority: 60.4, tags: ["ATS", "Brian source"] },
  { id: "dover", name: "Dover", category: "direct", sites: ["dover.io"], priority: 60.2, tags: ["ATS", "Brian source"] },
  { id: "notionCareers", name: "Notion Career Pages", category: "direct", sites: ["notion.site"], priority: 60, tags: ["ATS", "Brian source"] },
  { id: "adpAts", name: "ADP", category: "direct", rawSiteQuery: "(site:workforcenow.adp.com OR site:myjobs.adp.com)", priority: 59.8, tags: ["ATS", "Brian source"] },
  { id: "factorial", name: "Factorial", category: "direct", sites: ["factorialhr.com"], priority: 59.6, tags: ["ATS", "Brian source"] },
  { id: "trinet", name: "TriNet Hire", category: "direct", sites: ["trinethire.com"], priority: 59.4, tags: ["ATS", "Brian source"] },
  { id: "myVisaJobs", name: "MyVisaJobs Sponsor Search", category: "research", sites: ["myvisajobs.com"], priority: 45, tags: ["H-1B", "sponsor"] },
  { id: "h1bData", name: "H1BData", category: "research", sites: ["h1bdata.info"], priority: 44, tags: ["salary", "H-1B"] },
  { id: "uscisHub", name: "USCIS H-1B Employer Data Hub", category: "research", native: "static", url: "https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub", priority: 43, tags: ["official", "H-1B"] },
  { id: "dolOflc", name: "DOL OFLC Disclosure Data", category: "research", native: "static", url: "https://www.dol.gov/agencies/eta/foreign-labor/performance", priority: 42, tags: ["official", "disclosure"] }
];

const PORTALS = PORTAL_ROWS.map((portal, index) => ({ ...portal, order: index + 1 }));

const SOURCE_CAPABILITIES = {
  linkedinJobs: { kind: "native-filtered", label: "Native filtered", supports: ["time", "sort", "experience", "employment", "remote", "company keywords"] },
  linkedinPosts: { kind: "native-filtered", label: "Native post search", supports: ["date posted", "content type", "company keywords"] },
  indeed: { kind: "native-filtered", label: "Native filtered", supports: ["date", "sort", "location", "remote keyword"] },
  google: { kind: "native-filtered", label: "Google date tools", supports: ["time", "sort", "operators"] },
  usajobs: { kind: "native-filtered", label: "Native public search", supports: ["date sort", "location"] },
  static: { kind: "companion-search", label: "Research link", supports: ["manual research"] },
  native: { kind: "broad-search", label: "Native broad search", supports: ["keyword", "location where supported"] },
  operator: { kind: "broad-search", label: "Broad search operator", supports: ["site operators", "date where engine supports it"] }
};

const TIME_OPTIONS = {
  google: [
    ["all", "All"],
    ["1hour", "Past Hour"],
    ["4hours", "Past 4 Hours"],
    ["8hours", "Past 8 Hours"],
    ["12hours", "Past 12 Hours"],
    ["24hours", "Past 24 Hours"],
    ["48hours", "Past 48 Hours"],
    ["72hours", "Past 72 Hours"],
    ["week", "Past Week"],
    ["month", "Past Month"],
    ["year", "Past Year"],
    ["older1month", "Older than 1 month"],
    ["older3months", "Older than 3 months"],
    ["older6months", "Older than 6 months"]
  ],
  duckduckgo: [["all", "All"], ["24hours", "Past 24 Hours"], ["week", "Past Week"], ["month", "Past Month"], ["year", "Past Year"]],
  bing: [["all", "All"], ["24hours", "Past 24 Hours"], ["week", "Past Week"], ["month", "Past Month"]],
  brave: [["all", "All"], ["24hours", "Past 24 Hours"], ["week", "Past Week"], ["month", "Past Month"], ["year", "Past Year"]],
  startpage: [["all", "All"], ["24hours", "Past 24 Hours"], ["week", "Past Week"], ["month", "Past Month"], ["year", "Past Year"]],
  yahoo: [["all", "All"], ["24hours", "Past 24 Hours"], ["week", "Past Week"], ["month", "Past Month"]],
  kagi: [["all", "All"], ["24hours", "Past 24 Hours"], ["week", "Past Week"], ["month", "Past Month"], ["year", "Past Year"]],
  qwant: [["all", "All"], ["24hours", "Past 24 Hours"], ["week", "Past Week"], ["month", "Past Month"]]
};

const LOCATIONS = [
  ["usa", "United States", '("United States" OR USA OR "U.S.")', "United States"],
  ["remote-us", "Remote, US", '("United States" OR USA OR "U.S.") remote', "United States"],
  ["new-york-ny", "New York, NY", '("New York" OR NYC) "United States"', "New York, NY"],
  ["bay-area-ca", "San Francisco Bay Area, CA", '("San Francisco" OR "Bay Area" OR "San Jose" OR "Palo Alto") California', "San Francisco Bay Area"],
  ["seattle-wa", "Seattle, WA", '"Seattle" Washington', "Seattle, WA"],
  ["austin-tx", "Austin, TX", '"Austin" Texas', "Austin, TX"],
  ["dallas-tx", "Dallas-Fort Worth, TX", '("Dallas" OR "Fort Worth") Texas', "Dallas-Fort Worth, TX"],
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
  ["Software Engineer", "Software Developer", "Full Stack Developer", "Frontend Developer", "Backend Developer", "Application Developer", "Web Developer"],
  ["Machine Learning Engineer", "ML Engineer", "AI Engineer", "Applied Scientist", "Data Scientist", "Research Engineer", "AI Data Engineer"],
  ["Data Engineer", "Analytics Engineer", "ETL Developer", "BI Engineer", "Data Platform Engineer"],
  ["Data Analyst", "Business Intelligence Analyst", "Reporting Analyst", "SQL Analyst", "Power BI Developer", "Tableau Developer"],
  ["Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer", "Platform Engineer", "Infrastructure Engineer"],
  ["Business Analyst", "Systems Analyst", "Product Analyst", "Operations Analyst", "Business Systems Analyst", "Technical Analyst"],
  ["Cybersecurity Analyst", "Security Engineer", "SOC Analyst", "GRC Analyst", "Cloud Security Engineer", "Application Security Engineer"],
  ["Product Manager", "Product Owner", "Technical Product Manager", "Program Manager", "Project Manager", "Scrum Master"],
  ["QA Engineer", "Software Test Engineer", "Automation Engineer", "SDET", "Quality Engineer"],
  ["UX Designer", "UI Designer", "Product Designer", "UX Researcher", "Content Designer"],
  ["Financial Analyst", "FP&A Analyst", "Business Operations Analyst", "Revenue Analyst", "Risk Analyst"],
  ["Video Producer", "Film Editor", "Content Producer", "Content Creator", "Media Manager", "Digital Marketing Specialist", "Multimedia Designer", "Social Media Strategist", "Brand Content Manager", "Video Production Coordinator", "Creative Director"],
  ["Salesforce Administrator", "Salesforce Developer", "Salesforce Consultant", "Salesforce Business Analyst", "Database Administrator", "IT Systems Administrator"],
  ["Project Manager", "Program Manager", "Operations Manager", "Team Lead", "Project Coordinator"],
  ["Scrum Master", "Agile Coach", "Lean Practitioner", "Kanban Coach", "Agile Project Facilitator", "Agile Transformation Lead", "Agile Team Coach", "Iteration Manager", "Scrum"]
];

const ROLE_PACKS = [
  {
    id: "all-role-families",
    label: "All Target Role Families - Max Coverage",
    primary: "Software Engineer",
    titles: ["Software Engineer", "Software Developer", "AI Engineer", "Machine Learning Engineer", "Data Scientist", "Data Engineer", "Data Analyst", "Analytics Engineer", "Business Intelligence Analyst", "Cloud Engineer", "DevOps Engineer", "QA Engineer", "SDET", "Cybersecurity Analyst", "Security Engineer", "Product Analyst", "Business Analyst", "Systems Analyst", "Salesforce Administrator", "Project Manager"],
    includes: ["Python", "SQL", "cloud", "AI", "data", "analytics"],
    query: '("software engineer" OR "software developer" OR "AI engineer" OR "machine learning engineer" OR "data scientist" OR "data engineer" OR "data analyst" OR "analytics engineer" OR "business intelligence analyst" OR "cloud engineer" OR "DevOps engineer" OR "QA engineer" OR SDET OR "cybersecurity analyst" OR "security engineer" OR "product analyst" OR "business analyst" OR "systems analyst" OR "Salesforce administrator" OR "project manager")'
  },
  {
    id: "software-ai-data",
    label: "Software / AI / Data",
    primary: "Software Engineer",
    titles: ["Software Engineer", "Software Developer", "AI Engineer", "Machine Learning Engineer", "Data Engineer", "Data Analyst", "Analytics Engineer", "Business Intelligence Analyst"],
    includes: ["Python", "SQL", "cloud", "AI", "data"],
    query: '("software engineer" OR "software developer" OR "AI engineer" OR "machine learning engineer" OR "data engineer" OR "data analyst" OR "analytics engineer" OR "business intelligence analyst")'
  },
  {
    id: "software",
    label: "Software Engineering",
    primary: "Software Engineer",
    titles: ["Software Engineer", "Software Developer", "Full Stack Developer", "Backend Developer", "Frontend Developer", "Application Developer"],
    includes: ["JavaScript", "Python", "Java", "API"],
    query: '("software engineer" OR "software developer" OR "full stack developer" OR "backend developer" OR "frontend developer" OR "application developer")'
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    primary: "Machine Learning Engineer",
    titles: ["Machine Learning Engineer", "AI Engineer", "Applied Scientist", "ML Engineer", "Data Scientist", "AI Data Engineer"],
    includes: ["Python", "machine learning", "LLM", "AI"],
    query: '("machine learning engineer" OR "AI engineer" OR "applied scientist" OR "ML engineer" OR "data scientist" OR "LLM")'
  },
  {
    id: "data-analytics",
    label: "Data / Analytics",
    primary: "Data Analyst",
    titles: ["Data Analyst", "Business Intelligence Analyst", "Analytics Engineer", "SQL Analyst", "Reporting Analyst", "Data Scientist", "Data Engineer"],
    includes: ["SQL", "Python", "Tableau", "Power BI"],
    query: '("data analyst" OR "business intelligence analyst" OR "analytics engineer" OR "SQL analyst" OR "reporting analyst" OR "data scientist" OR "data engineer")'
  },
  {
    id: "cloud-devops",
    label: "Cloud / DevOps",
    primary: "Cloud Engineer",
    titles: ["Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer", "Platform Engineer", "Infrastructure Engineer"],
    includes: ["AWS", "Azure", "Kubernetes", "Terraform"],
    query: '("cloud engineer" OR "DevOps engineer" OR "site reliability engineer" OR "platform engineer" OR "infrastructure engineer")'
  },
  {
    id: "qa-sdet",
    label: "QA / SDET",
    primary: "QA Engineer",
    titles: ["QA Engineer", "Software Test Engineer", "Automation Engineer", "SDET", "Quality Engineer"],
    includes: ["automation", "testing", "Selenium", "API"],
    query: '("QA engineer" OR "software test engineer" OR "automation engineer" OR "SDET" OR "quality engineer")'
  },
  {
    id: "product-data",
    label: "Product / Data Analyst",
    primary: "Product Analyst",
    titles: ["Product Analyst", "Business Analyst", "Business Systems Analyst", "Operations Analyst", "Technical Analyst"],
    includes: ["SQL", "metrics", "dashboard", "requirements"],
    query: '("product analyst" OR "business analyst" OR "business systems analyst" OR "operations analyst" OR "technical analyst")'
  }
];

const ROLE_PACK_LABELS = Object.fromEntries(ROLE_PACKS.map(pack => [pack.id, pack.label]));

const ACRONYMS = new Set(["AI", "API", "BI", "CRM", "FP&A", "GRC", "HR", "ML", "QA", "SEO", "SOC", "SRE", "SQL", "UI", "UX"]);

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
    none: "No auth filter",
    optBroad: "OPT-aware broad",
    currentAuthorized: "US work authorized",
    sponsorNeeded: "Future sponsorship",
    everify: "E-Verify",
    optStrict: "OPT/STEM OPT exact"
  },
  sort: {
    recommended: "Most useful first",
    latest: "Newest first",
    direct: "Direct apply first",
    coverage: "Broad coverage"
  },
  precision: {
    coverage: "Max Coverage",
    latest1: "Latest 1h",
    latest24: "Latest 24h",
    optSponsor: "OPT/Sponsor Research",
    direct: "Direct ATS",
    exact: "Exact Role"
  },
  companyKind: {
    all: "Direct and vendors",
    direct: "Direct employers",
    vendor: "Staffing/vendors"
  },
  sponsorTier: {
    all: "All sponsor tiers",
    top: "Top H1B sponsors",
    strong: "Strong sponsors",
    moderate: "Moderate sponsors",
    curated: "Curated/no filing data"
  }
};

const COMPANY_ROWS = [
  ["Amazon", "Cloud and Big Tech", "https://www.amazon.jobs/", "software, data, cloud, operations"],
  ["Microsoft", "Cloud and Big Tech", "https://careers.microsoft.com/", "software, data, cloud, AI"],
  ["Google / Alphabet", "Cloud and Big Tech", "https://www.google.com/about/careers/applications/", "software, data, AI, product"],
  ["Meta", "Cloud and Big Tech", "https://www.metacareers.com/", "software, data, AI, product"],
  ["Apple", "Cloud and Big Tech", "https://jobs.apple.com/", "software, hardware, data, product"],
  ["NVIDIA", "Cloud and Big Tech", "https://www.nvidia.com/en-us/about-nvidia/careers/", "AI, hardware, software, data"],
  ["OpenAI", "AI and Data", "https://openai.com/careers/", "AI, research, software, data"],
  ["Anthropic", "AI and Data", "https://www.anthropic.com/careers", "AI, research, software, data"],
  ["Databricks", "AI and Data", "https://www.databricks.com/company/careers", "data, AI, platform, software"],
  ["Snowflake", "AI and Data", "https://careers.snowflake.com/", "data, cloud, platform, software"],
  ["Oracle", "Enterprise Software", "https://careers.oracle.com/", "cloud, software, data, enterprise"],
  ["Salesforce", "Enterprise Software", "https://www.salesforce.com/company/careers/", "CRM, software, data, product"],
  ["Adobe", "Enterprise Software", "https://careers.adobe.com/", "software, data, product, creative"],
  ["ServiceNow", "Enterprise Software", "https://careers.servicenow.com/", "platform, software, data, enterprise"],
  ["IBM", "Enterprise Software", "https://www.ibm.com/careers", "software, data, consulting, AI"],
  ["Cisco", "Enterprise Software", "https://jobs.cisco.com/", "networking, cloud, security, software"],
  ["Intuit", "Enterprise Software", "https://www.intuit.com/careers/", "software, data, fintech, product"],
  ["Workday", "Enterprise Software", "https://www.workday.com/en-us/company/careers.html", "software, data, HR, finance"],
  ["Atlassian", "Enterprise Software", "https://www.atlassian.com/company/careers", "software, product, collaboration"],
  ["Broadcom", "Hardware and Semiconductors", "https://www.broadcom.com/company/careers", "semiconductor, software, infrastructure"],
  ["Cloudflare", "Enterprise Software", "https://www.cloudflare.com/careers/", "security, networking, cloud, software"],
  ["MongoDB", "AI and Data", "https://www.mongodb.com/company/careers", "database, data, software, cloud"],
  ["GitHub", "Enterprise Software", "https://www.github.careers/", "software, developer tools, platform"],
  ["GitLab", "Enterprise Software", "https://about.gitlab.com/jobs/", "software, DevOps, platform"],
  ["Elastic", "AI and Data", "https://www.elastic.co/careers", "search, data, security, cloud"],
  ["Okta", "Enterprise Software", "https://www.okta.com/company/careers/", "identity, security, software"],
  ["Twilio", "Enterprise Software", "https://www.twilio.com/en-us/company/jobs", "software, communications, data"],
  ["HubSpot", "Enterprise Software", "https://www.hubspot.com/careers", "CRM, software, data, product"],
  ["Zoom", "Enterprise Software", "https://careers.zoom.us/", "software, communications, platform"],
  ["Palantir", "AI and Data", "https://www.palantir.com/careers/", "data, software, government", "Some roles can be clearance-heavy."],
  ["Intel", "Hardware and Semiconductors", "https://jobs.intel.com/", "semiconductor, software, hardware"],
  ["AMD", "Hardware and Semiconductors", "https://careers.amd.com/", "semiconductor, software, hardware"],
  ["Qualcomm", "Hardware and Semiconductors", "https://careers.qualcomm.com/", "semiconductor, wireless, software"],
  ["Micron", "Hardware and Semiconductors", "https://www.micron.com/about/careers", "semiconductor, data, hardware"],
  ["Texas Instruments", "Hardware and Semiconductors", "https://careers.ti.com/", "semiconductor, hardware, software"],
  ["Applied Materials", "Hardware and Semiconductors", "https://www.appliedmaterials.com/us/en/careers.html", "semiconductor, engineering, data"],
  ["Lam Research", "Hardware and Semiconductors", "https://careers.lamresearch.com/", "semiconductor, engineering, data"],
  ["KLA", "Hardware and Semiconductors", "https://www.kla.com/careers", "semiconductor, engineering, data"],
  ["Dell", "Hardware and Semiconductors", "https://jobs.dell.com/", "hardware, cloud, software, data"],
  ["HP", "Hardware and Semiconductors", "https://jobs.hp.com/", "hardware, software, data"],
  ["HPE", "Hardware and Semiconductors", "https://careers.hpe.com/", "cloud, hardware, software"],
  ["Motorola Solutions", "Hardware and Semiconductors", "https://www.motorolasolutions.com/en_us/about/careers.html", "software, public safety, data"],
  ["Arista", "Hardware and Semiconductors", "https://www.arista.com/en/careers", "networking, software, cloud"],
  ["Juniper", "Hardware and Semiconductors", "https://www.juniper.net/us/en/company/careers.html", "networking, software, security"],
  ["Palo Alto Networks", "Cybersecurity", "https://jobs.paloaltonetworks.com/", "security, cloud, software"],
  ["Netflix", "Consumer Tech", "https://jobs.netflix.com/", "software, data, streaming, product"],
  ["Uber", "Consumer Tech", "https://www.uber.com/us/en/careers/", "software, data, product, operations"],
  ["Lyft", "Consumer Tech", "https://www.lyft.com/careers", "software, data, product, operations"],
  ["Airbnb", "Consumer Tech", "https://careers.airbnb.com/", "software, data, product, marketplace"],
  ["DoorDash", "Consumer Tech", "https://careers.doordash.com/", "software, data, logistics, product"],
  ["Instacart", "Consumer Tech", "https://instacart.careers/", "software, data, marketplace"],
  ["Pinterest", "Consumer Tech", "https://www.pinterestcareers.com/", "software, data, product"],
  ["Reddit", "Consumer Tech", "https://www.redditinc.com/careers", "software, data, community"],
  ["Snap", "Consumer Tech", "https://careers.snap.com/", "software, data, AR, product"],
  ["Roblox", "Consumer Tech", "https://careers.roblox.com/", "software, data, gaming"],
  ["Etsy", "Consumer Tech", "https://careers.etsy.com/", "software, data, marketplace"],
  ["eBay", "Consumer Tech", "https://jobs.ebayinc.com/", "software, data, marketplace"],
  ["PayPal", "Fintech and Finance", "https://careers.pypl.com/", "fintech, software, data"],
  ["Block", "Fintech and Finance", "https://block.xyz/careers", "fintech, software, data"],
  ["Stripe", "Fintech and Finance", "https://stripe.com/jobs", "fintech, software, data"],
  ["Coinbase", "Fintech and Finance", "https://www.coinbase.com/careers", "crypto, fintech, software"],
  ["Robinhood", "Fintech and Finance", "https://careers.robinhood.com/", "fintech, software, data"],
  ["Affirm", "Fintech and Finance", "https://www.affirm.com/careers", "fintech, software, data"],
  ["JPMorgan Chase", "Fintech and Finance", "https://careers.jpmorgan.com/", "banking, data, software, analytics"],
  ["Bank of America", "Fintech and Finance", "https://careers.bankofamerica.com/", "banking, data, software, analytics"],
  ["Citi", "Fintech and Finance", "https://jobs.citi.com/", "banking, data, software, analytics"],
  ["Wells Fargo", "Fintech and Finance", "https://www.wellsfargojobs.com/", "banking, data, software, analytics"],
  ["Goldman Sachs", "Fintech and Finance", "https://www.goldmansachs.com/careers/", "banking, data, software, analytics"],
  ["Morgan Stanley", "Fintech and Finance", "https://www.morganstanley.com/about-us/careers", "banking, data, software, analytics"],
  ["Capital One", "Fintech and Finance", "https://www.capitalonecareers.com/", "fintech, data, software, analytics"],
  ["American Express", "Fintech and Finance", "https://www.americanexpress.com/en-us/careers/", "payments, data, software, analytics"],
  ["Mastercard", "Fintech and Finance", "https://careers.mastercard.com/", "payments, data, software"],
  ["Visa", "Fintech and Finance", "https://usa.visa.com/careers.html", "payments, data, software"],
  ["Discover", "Fintech and Finance", "https://jobs.discover.com/", "payments, data, software"],
  ["Fiserv", "Fintech and Finance", "https://www.fiserv.com/en/about-fiserv/careers.html", "payments, fintech, software"],
  ["Fidelity", "Fintech and Finance", "https://jobs.fidelity.com/", "finance, data, software"],
  ["Charles Schwab", "Fintech and Finance", "https://www.schwabjobs.com/", "finance, data, software"],
  ["BlackRock", "Fintech and Finance", "https://careers.blackrock.com/", "finance, data, analytics"],
  ["Bloomberg", "Fintech and Finance", "https://www.bloomberg.com/company/careers/", "finance, data, software"],
  ["Moody's", "Fintech and Finance", "https://careers.moodys.com/", "finance, data, analytics"],
  ["S&P Global", "Fintech and Finance", "https://www.spglobal.com/en/careers", "finance, data, analytics"],
  ["Progressive", "Insurance", "https://www.progressive.com/careers/", "insurance, data, analytics, software"],
  ["State Farm", "Insurance", "https://www.statefarm.com/careers", "insurance, data, analytics, software"],
  ["Allstate", "Insurance", "https://www.allstate.jobs/", "insurance, data, analytics, software"],
  ["Chubb", "Insurance", "https://careers.chubb.com/", "insurance, data, analytics"],
  ["Deloitte", "Consulting and Services", "https://www.deloitte.com/us/en/careers.html", "consulting, data, technology"],
  ["Accenture", "Consulting and Services", "https://www.accenture.com/us-en/careers", "consulting, technology, data"],
  ["PwC", "Consulting and Services", "https://www.pwc.com/us/en/careers.html", "consulting, data, technology"],
  ["EY", "Consulting and Services", "https://www.ey.com/en_us/careers", "consulting, data, technology"],
  ["KPMG", "Consulting and Services", "https://kpmg.com/us/en/careers.html", "consulting, data, technology"],
  ["McKinsey", "Consulting and Services", "https://www.mckinsey.com/careers", "consulting, analytics, data"],
  ["BCG", "Consulting and Services", "https://careers.bcg.com/", "consulting, analytics, data"],
  ["Bain", "Consulting and Services", "https://www.bain.com/careers/", "consulting, analytics, data"],
  ["Cognizant", "Consulting and Services", "https://careers.cognizant.com/", "consulting, technology, data"],
  ["TCS", "Consulting and Services", "https://www.tcs.com/careers", "consulting, technology, data"],
  ["Infosys", "Consulting and Services", "https://www.infosys.com/careers/", "consulting, technology, data"],
  ["Wipro", "Consulting and Services", "https://careers.wipro.com/", "consulting, technology, data"],
  ["HCLTech", "Consulting and Services", "https://www.hcltech.com/careers", "consulting, technology, data"],
  ["Capgemini", "Consulting and Services", "https://www.capgemini.com/us-en/careers/", "consulting, technology, data"],
  ["EPAM", "Consulting and Services", "https://www.epam.com/careers", "consulting, software, data"],
  ["Globant", "Consulting and Services", "https://www.globant.com/careers", "consulting, software, data"],
  ["Slalom", "Consulting and Services", "https://www.slalom.com/careers", "consulting, data, technology"],
  ["Thoughtworks", "Consulting and Services", "https://www.thoughtworks.com/careers", "consulting, software, data"],
  ["NTT DATA", "Consulting and Services", "https://us.nttdata.com/en/careers", "consulting, technology, data"],
  ["LTIMindtree", "Consulting and Services", "https://www.ltimindtree.com/careers/", "consulting, technology, data"],
  ["Tech Mahindra", "Consulting and Services", "https://www.techmahindra.com/en-in/careers/", "consulting, technology, data"],
  ["Booz Allen Hamilton", "Consulting and Services", "https://www.boozallen.com/careers.html", "consulting, analytics, government", "Many roles may require clearance or citizenship."],
  ["UnitedHealth Group", "Health and Life Sciences", "https://careers.unitedhealthgroup.com/", "healthcare, data, software"],
  ["Optum", "Health and Life Sciences", "https://www.optum.com/en/careers.html", "healthcare, data, software"],
  ["CVS Health", "Health and Life Sciences", "https://jobs.cvshealth.com/", "healthcare, data, software"],
  ["Elevance Health", "Health and Life Sciences", "https://careers.elevancehealth.com/", "healthcare, data, software"],
  ["Cigna / Evernorth", "Health and Life Sciences", "https://jobs.thecignagroup.com/us/en", "healthcare, data, software"],
  ["Walgreens", "Health and Life Sciences", "https://jobs.walgreens.com/", "healthcare, data, software"],
  ["Johnson & Johnson", "Health and Life Sciences", "https://www.careers.jnj.com/", "life sciences, data, software"],
  ["Pfizer", "Health and Life Sciences", "https://www.pfizer.com/about/careers", "life sciences, data, analytics"],
  ["Merck", "Health and Life Sciences", "https://jobs.merck.com/", "life sciences, data, analytics"],
  ["Eli Lilly", "Health and Life Sciences", "https://careers.lilly.com/", "life sciences, data, analytics"],
  ["Moderna", "Health and Life Sciences", "https://www.modernatx.com/careers", "life sciences, data, analytics"],
  ["Amgen", "Health and Life Sciences", "https://careers.amgen.com/", "life sciences, data, analytics"],
  ["Gilead", "Health and Life Sciences", "https://www.gilead.com/careers", "life sciences, data, analytics"],
  ["AbbVie", "Health and Life Sciences", "https://careers.abbvie.com/", "life sciences, data, analytics"],
  ["Abbott", "Health and Life Sciences", "https://www.jobs.abbott/us/en", "healthcare, data, software"],
  ["Medtronic", "Health and Life Sciences", "https://www.medtronic.com/en-us/about/careers.html", "medical devices, data, software"],
  ["Boston Scientific", "Health and Life Sciences", "https://jobs.bostonscientific.com/", "medical devices, data, software"],
  ["Epic", "Health and Life Sciences", "https://careers.epic.com/", "healthcare software, data"],
  ["Walmart", "Retail and Consumer", "https://careers.walmart.com/", "retail, data, software, supply chain"],
  ["Target", "Retail and Consumer", "https://jobs.target.com/", "retail, data, software, supply chain"],
  ["Costco", "Retail and Consumer", "https://www.costco.com/jobs.html", "retail, analytics, operations"],
  ["Home Depot", "Retail and Consumer", "https://careers.homedepot.com/", "retail, data, software, supply chain"],
  ["Lowe's", "Retail and Consumer", "https://talent.lowes.com/", "retail, data, software, supply chain"],
  ["Best Buy", "Retail and Consumer", "https://jobs.bestbuy.com/", "retail, data, software"],
  ["Nike", "Retail and Consumer", "https://jobs.nike.com/", "retail, data, software, product"],
  ["Starbucks", "Retail and Consumer", "https://www.starbucks.com/careers/", "retail, analytics, technology"],
  ["PepsiCo", "Retail and Consumer", "https://www.pepsicojobs.com/", "consumer goods, data, supply chain"],
  ["Coca-Cola", "Retail and Consumer", "https://www.coca-colacompany.com/careers", "consumer goods, data, supply chain"],
  ["Procter & Gamble", "Retail and Consumer", "https://www.pgcareers.com/", "consumer goods, data, analytics"],
  ["FedEx", "Logistics and Industrial", "https://careers.fedex.com/", "logistics, data, software"],
  ["UPS", "Logistics and Industrial", "https://www.jobs-ups.com/", "logistics, data, software"],
  ["GE Aerospace", "Logistics and Industrial", "https://www.geaerospace.com/company/careers", "aerospace, data, software", "Some roles may require export-control review."],
  ["GE Vernova", "Logistics and Industrial", "https://www.gevernova.com/careers", "energy, data, software"],
  ["Honeywell", "Logistics and Industrial", "https://careers.honeywell.com/", "industrial, data, software", "Some roles may require export-control review."],
  ["Tesla", "Automotive and Mobility", "https://www.tesla.com/careers", "EV, software, data, manufacturing"],
  ["Rivian", "Automotive and Mobility", "https://careers.rivian.com/", "EV, software, data, manufacturing"],
  ["AT&T", "Telecom and Media", "https://www.att.jobs/", "telecom, data, software"],
  ["Verizon", "Telecom and Media", "https://www.verizon.com/about/careers", "telecom, data, software"],
  ["T-Mobile", "Telecom and Media", "https://careers.t-mobile.com/", "telecom, data, software"],
  ["Comcast", "Telecom and Media", "https://jobs.comcast.com/", "telecom, media, data, software"],
  ["Disney", "Telecom and Media", "https://www.disneycareers.com/", "media, data, software"],
  ["Boeing", "Aerospace and Defense", "https://jobs.boeing.com/", "aerospace, software, data", "Many roles may require US person status, clearance, or export-control eligibility."],
  ["SpaceX", "Aerospace and Defense", "https://www.spacex.com/careers/", "aerospace, software, data", "Many roles may require US person status under export-control rules."]
];

const SPONSOR_COMPANY_ROWS = [
  ["Infosys", 1795, "direct", "top", "Consulting and Services", "https://www.infosys.com/careers/", "consulting, technology, data, sponsor", "Infosys Limited"],
  ["TCS", 1438, "direct", "top", "Consulting and Services", "https://www.tcs.com/careers", "consulting, technology, data, sponsor", "Tata Consultancy Services Limited"],
  ["Amazon", 962, "direct", "top", "Cloud and Big Tech", "https://www.amazon.jobs/", "software, data, cloud, operations, sponsor", "Amazon.com Services LLC|Amazon Web Services Inc|Amazon Development Center U.S. Inc|AWS"],
  ["Meta", 533, "direct", "top", "Cloud and Big Tech", "https://www.metacareers.com/", "software, data, AI, product, sponsor", "Meta Platforms Inc|Facebook"],
  ["Google / Alphabet", 488, "direct", "top", "Cloud and Big Tech", "https://www.google.com/about/careers/applications/", "software, data, AI, product, sponsor", "Google LLC|Alphabet"],
  ["Fidelity", 374, "direct", "top", "Fintech and Finance", "https://jobs.fidelity.com/", "finance, data, software, sponsor", "Fidelity Technology Group LLC|Fidelity Investments"],
  ["JPMorgan Chase", 301, "direct", "top", "Fintech and Finance", "https://careers.jpmorgan.com/", "banking, data, software, analytics, sponsor", "JPMorgan Chase & Co"],
  ["Apple", 288, "direct", "top", "Cloud and Big Tech", "https://jobs.apple.com/", "software, hardware, data, product, sponsor", "Apple Inc"],
  ["Mphasis", 257, "direct", "top", "Consulting and Services", "https://www.mphasis.com/home/careers.html", "consulting, technology, data, sponsor", "Mphasis Corporation"],
  ["LinkedIn", 215, "direct", "top", "Consumer Tech", "https://careers.linkedin.com/", "software, data, platform, sponsor", "LinkedIn Corporation"],
  ["Walmart", 190, "direct", "top", "Retail and Consumer", "https://careers.walmart.com/", "retail, data, software, supply chain, sponsor", "WAL-MART ASSOCIATES INC|Walmart Global Tech"],
  ["IBM", 124, "direct", "strong", "Enterprise Software", "https://www.ibm.com/careers", "software, data, consulting, AI, sponsor", "IBM Corporation"],
  ["PayPal", 117, "direct", "strong", "Fintech and Finance", "https://careers.pypl.com/", "fintech, software, data, sponsor", "PayPal Inc"],
  ["U.S. Bank", 107, "direct", "strong", "Fintech and Finance", "https://careers.usbank.com/", "banking, data, software, analytics, sponsor", "U.S. Bank National Association|US Bank"],
  ["LTIMindtree", 101, "direct", "strong", "Consulting and Services", "https://www.ltimindtree.com/careers/", "consulting, technology, data, sponsor", "LTIMindtree Limited"],
  ["NVIDIA", 101, "direct", "strong", "Cloud and Big Tech", "https://www.nvidia.com/en-us/about-nvidia/careers/", "AI, hardware, software, data, sponsor", "NVIDIA Corporation"],
  ["J.B. Hunt", 86, "direct", "strong", "Logistics and Industrial", "https://careers.jbhunt.com/", "logistics, data, software, sponsor", "J.B. Hunt Transport Inc|JB Hunt"],
  ["Qualcomm", 85, "direct", "strong", "Hardware and Semiconductors", "https://careers.qualcomm.com/", "semiconductor, wireless, software, sponsor", "Qualcomm Technologies Inc"],
  ["Adobe", 83, "direct", "strong", "Enterprise Software", "https://careers.adobe.com/", "software, data, product, creative, sponsor", "Adobe Inc"],
  ["eBay", 79, "direct", "strong", "Consumer Tech", "https://jobs.ebayinc.com/", "software, data, marketplace, sponsor", "eBay Inc"],
  ["General Motors", 75, "direct", "strong", "Automotive and Mobility", "https://search-careers.gm.com/", "automotive, software, data, manufacturing, sponsor", "General Motors|GM"],
  ["Wells Fargo", 73, "direct", "moderate", "Fintech and Finance", "https://www.wellsfargojobs.com/", "banking, data, software, analytics, sponsor", "WELLS FARGO BANK N.A"],
  ["Intuit", 68, "direct", "moderate", "Enterprise Software", "https://www.intuit.com/careers/", "software, data, fintech, product, sponsor", "Intuit Inc"],
  ["Expedia Group", 68, "direct", "moderate", "Consumer Tech", "https://careers.expediagroup.com/", "travel, software, data, marketplace, sponsor", "Expedia Inc|Expedia Group"],
  ["Compunnel", 469, "vendor", "top", "Staffing Vendors", "https://www.compunnel.com/careers/", "staffing, consulting, technology, vendor, sponsor", "COMPUNNEL SOFTWARE GROUP INC"],
  ["Grandison Management", 403, "vendor", "top", "Staffing Vendors", "https://www.grandison.com/careers/", "staffing, technology, vendor, sponsor", "Grandison Management Inc"],
  ["People Tech Group", 370, "vendor", "top", "Staffing Vendors", "https://peopletech.com/careers/", "staffing, technology, vendor, sponsor", "People Tech Group Inc"],
  ["Kforce", 133, "vendor", "strong", "Staffing Vendors", "https://www.kforce.com/about/careers/", "staffing, technology, vendor, sponsor", "KFORCE INC"],
  ["UST", 114, "vendor", "strong", "Staffing Vendors", "https://www.ust.com/en/careers", "consulting, technology, vendor, sponsor", "UST Global Inc"],
  ["Randstad Digital", 114, "vendor", "strong", "Staffing Vendors", "https://www.randstaddigital.com/careers/", "staffing, digital, technology, vendor, sponsor", "RANDSTAD DIGITAL LLC"],
  ["Innova Solutions", 89, "vendor", "strong", "Staffing Vendors", "https://www.innovasolutions.com/careers/", "staffing, technology, vendor, sponsor", "INNOVA SOLUTIONS INC"],
  ["MSR Technology Group", 85, "vendor", "strong", "Staffing Vendors", "https://msrtechnologygroup.com/careers/", "staffing, technology, vendor, sponsor", "MSR TECHNOLOGY GROUP LLC"],
  ["V-Soft Consulting", 81, "vendor", "strong", "Staffing Vendors", "https://www.vsoftconsulting.com/careers/", "staffing, consulting, technology, vendor, sponsor", "V-Soft Consulting Group INC"],
  ["L&T Technology Services", 76, "vendor", "strong", "Staffing Vendors", "https://www.ltts.com/careers", "engineering, technology, vendor, sponsor", "L&T Technology Services Limited"]
];

const COMPANIES = buildCompanies();

const RESOURCE_LINKS = [
  ["USCIS OPT", "OPT basics", "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students", "Official OPT reference for F-1 students."],
  ["Study in the States", "OPT/STEM OPT", "https://studyinthestates.dhs.gov/stem-opt-hub", "DHS student guidance for STEM OPT requirements."],
  ["E-Verify", "Employer research", "https://www.e-verify.gov/about-e-verify/e-verify-data/how-to-find-participating-employers", "Find employers participating in E-Verify."],
  ["DOL OFLC Data", "H-1B/PERM", "https://www.dol.gov/agencies/eta/foreign-labor/performance", "Official disclosure files for foreign labor programs."],
  ["USCIS H-1B Hub", "H-1B employers", "https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub", "Official H-1B employer data hub."],
  ["MyVisaJobs", "Sponsor patterns", "https://www.myvisajobs.com/reports/", "Third-party sponsor history and reports."],
  ["H1BData", "Salary/sponsor", "https://h1bdata.info/", "Third-party H-1B salary and employer lookup."],
  ["BLS OOH", "Career research", "https://www.bls.gov/ooh/", "Occupation outlook, pay, and growth data."],
  ["O*NET", "Title research", "https://www.onetonline.org/", "Skill and occupation title research."],
  ["CareerOneStop", "US career tools", "https://www.careeronestop.org/", "US Department of Labor career resources."],
  ["FTC Job Scams", "Scam checks", "https://consumer.ftc.gov/articles/job-scams", "Spot fake job postings and recruiter scams."]
].map(([name, category, url, note]) => ({ name, category, url, note }));

function buildCompanies() {
  const byId = new Map();
  COMPANY_ROWS.forEach(([name, category, careersUrl, tags, caution], index) => {
    const company = {
      id: slugify(name),
      name,
      category,
      careersUrl,
      rank: index + 1,
      baseRank: index + 1,
      tags: splitTags(tags),
      caution: caution || "",
      h1bFilings: 0,
      sponsorTier: "curated",
      companyKind: "direct",
      aliases: [],
      h1bSource: ""
    };
    byId.set(company.id, company);
  });

  SPONSOR_COMPANY_ROWS.forEach(([name, filings, kind, tier, category, careersUrl, tags, aliases, caution]) => {
    const aliasList = splitAliases(aliases);
    const sponsorId = findExistingCompanyId(byId, name, aliasList) || slugify(name);
    const existing = byId.get(sponsorId);
    if (existing) {
      existing.h1bFilings = Math.max(existing.h1bFilings || 0, filings);
      existing.sponsorTier = tier;
      existing.companyKind = kind;
      existing.aliases = mergeUnique(existing.aliases, aliasList);
      existing.tags = mergeUnique(existing.tags, splitTags(tags));
      existing.h1bSource = "H1B workbook";
      existing.caution = existing.caution || caution || "";
      if (!existing.careersUrl && careersUrl) {
        existing.careersUrl = careersUrl;
      }
    } else {
      byId.set(sponsorId, {
        id: sponsorId,
        name,
        category,
        careersUrl,
        rank: 0,
        baseRank: COMPANY_ROWS.length + byId.size + 1,
        tags: splitTags(tags),
        caution: caution || "",
        h1bFilings: filings,
        sponsorTier: tier,
        companyKind: kind,
        aliases: aliasList,
        h1bSource: "H1B workbook"
      });
    }
  });

  return Array.from(byId.values())
    .sort((a, b) => getCompanyDefaultScore(b) - getCompanyDefaultScore(a) || a.name.localeCompare(b.name))
    .map((company, index) => ({ ...company, rank: index + 1 }));
}

function splitTags(value) {
  return value.split(",").map(tag => tag.trim()).filter(Boolean);
}

function splitAliases(value) {
  return String(value || "").split("|").map(alias => alias.trim()).filter(Boolean);
}

function mergeUnique(left, right) {
  return Array.from(new Set([...(left || []), ...(right || [])].filter(Boolean)));
}

function findExistingCompanyId(byId, name, aliases) {
  const candidates = [name, ...aliases].map(slugify);
  return candidates.find(candidate => byId.has(candidate)) || "";
}

function getCompanyDefaultScore(company) {
  const sponsorBoost = company.h1bFilings ? 100000 + company.h1bFilings : 0;
  const curatedBoost = company.category === "Cloud and Big Tech" || company.category === "AI and Data" ? 250 : 0;
  return sponsorBoost + curatedBoost - company.baseRank;
}

const state = {
  results: [],
  checked: new Set(),
  favoriteCompanies: new Set(),
  pinnedPortals: new Set(),
  visibleCompanies: COMPANIES
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  populateRolePacks();
  populateProfiles();
  populateCategories();
  populateLocations();
  populateCompanyControls();
  rebuildTimeOptions("google", "all");
  populateResources();
  renderCompanyOptions("");
  renderSponsorGrid();
  loadTheme();
  bindEvents();

  const hydrated = hydrateFromUrl();
  if (!hydrated) {
    loadPreferences();
  }
  if (!els.companyRole.value && els.jobTitle.value) {
    els.companyRole.value = els.jobTitle.value;
  }

  renderCompanyOptions(els.companyFilter.value);
  syncProfileDescription();
  syncCompanyCard();
  renderPinnedOperators();
  if (hasJobTitle()) {
    generateResults(false);
  } else {
    updateCounts();
    updatePreviewForEmptyState();
  }
});

function cacheElements() {
  Object.assign(els, {
    form: document.getElementById("searchForm"),
    jobTitle: document.getElementById("jobTitle"),
    rolePackSelect: document.getElementById("rolePackSelect"),
    profileSelect: document.getElementById("profileSelect"),
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
    cautionExcludes: document.getElementById("cautionExcludes"),
    categoryFilters: document.getElementById("categoryFilters"),
    companyRole: document.getElementById("companyRole"),
    companyRolePack: document.getElementById("companyRolePack"),
    companyFilter: document.getElementById("companyFilter"),
    companySelect: document.getElementById("companySelect"),
    companyTimeFilter: document.getElementById("companyTimeFilter"),
    companyExperienceSelect: document.getElementById("companyExperienceSelect"),
    companyLocationSelect: document.getElementById("companyLocationSelect"),
    companyRemoteMode: document.getElementById("companyRemoteMode"),
    companySortSelect: document.getElementById("companySortSelect"),
    companyCategorySelect: document.getElementById("companyCategorySelect"),
    companySponsorTier: document.getElementById("companySponsorTier"),
    companyKind: document.getElementById("companyKind"),
    companyCount: document.getElementById("companyCount"),
    companyCard: document.getElementById("companyCard"),
    openCompanyButton: document.getElementById("openCompanyButton"),
    searchCompanyButton: document.getElementById("searchCompanyButton"),
    companyLinkedInJobsButton: document.getElementById("companyLinkedInJobsButton"),
    companyLinkedInPostsButton: document.getElementById("companyLinkedInPostsButton"),
    companyIndeedButton: document.getElementById("companyIndeedButton"),
    copyCompanyLinksButton: document.getElementById("copyCompanyLinksButton"),
    openTopSponsorButton: document.getElementById("openTopSponsorButton"),
    favoriteCompanyButton: document.getElementById("favoriteCompanyButton"),
    sponsorGrid: document.getElementById("sponsorGrid"),
    pinnedBlock: document.getElementById("pinnedBlock"),
    pinnedOperators: document.getElementById("pinnedOperators"),
    resourceGrid: document.getElementById("resourceGrid"),
    portalCount: document.getElementById("portalCount"),
    checkedCount: document.getElementById("checkedCount"),
    openTopButton: document.getElementById("openTopButton"),
    copyAllButton: document.getElementById("copyAllButton"),
    copyCheckedButton: document.getElementById("copyCheckedButton"),
    shareButton: document.getElementById("shareButton"),
    resetButton: document.getElementById("resetButton"),
    latestOneHourButton: document.getElementById("latestOneHourButton"),
    themeToggle: document.getElementById("themeToggle"),
    results: document.getElementById("results"),
    emptyState: document.getElementById("emptyState"),
    resultMeta: document.getElementById("resultMeta"),
    queryPreview: document.getElementById("queryPreview"),
    profileDescription: document.getElementById("profileDescription"),
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

  els.profileSelect.addEventListener("change", () => {
    applyProfile(els.profileSelect.value);
    syncProfileDescription();
    persistAndMaybeGenerate();
  });

  els.rolePackSelect.addEventListener("change", persistAndMaybeGenerate);

  els.engineSelect.addEventListener("change", () => {
    rebuildTimeOptions(els.engineSelect.value);
    persistAndMaybeGenerate();
  });

  [
    els.timeFilter,
    els.locationSelect,
    els.sortSelect,
    els.remoteMode,
    els.matchMode,
    els.experienceSelect,
    els.employmentSelect,
    els.authorizationSelect,
    els.cautionExcludes
  ].forEach(control => control.addEventListener("change", persistAndMaybeGenerate));

  [els.jobTitle, els.includeTerms, els.excludeTerms].forEach(input => {
    input.addEventListener("change", persistAndMaybeGenerate);
  });

  els.categoryFilters.addEventListener("change", () => {
    persistAndMaybeGenerate();
    updateCounts();
  });

  els.companyFilter.addEventListener("input", () => {
    renderCompanyOptions(els.companyFilter.value);
    syncCompanyCard();
    renderSponsorGrid();
    savePreferences();
  });
  els.companyRole.addEventListener("input", () => {
    syncCompanyCard();
    savePreferences();
  });
  [
    els.companyRolePack,
    els.companyTimeFilter,
    els.companyExperienceSelect,
    els.companyLocationSelect,
    els.companyRemoteMode,
    els.companySortSelect,
    els.companyCategorySelect,
    els.companySponsorTier,
    els.companyKind
  ].forEach(control => {
    control.addEventListener("change", () => {
      renderCompanyOptions(els.companyFilter.value);
      syncCompanyCard();
      renderSponsorGrid();
      savePreferences();
    });
  });
  els.companySelect.addEventListener("change", () => {
    syncCompanyCard();
    savePreferences();
  });
  els.openCompanyButton.addEventListener("click", openSelectedCompany);
  els.searchCompanyButton.addEventListener("click", searchSelectedCompany);
  els.companyLinkedInJobsButton.addEventListener("click", () => openCompanySearchType("linkedinJobs"));
  els.companyLinkedInPostsButton.addEventListener("click", () => openCompanySearchType("linkedinPosts"));
  els.companyIndeedButton.addEventListener("click", () => openCompanySearchType("indeedGoogle"));
  els.copyCompanyLinksButton.addEventListener("click", copySelectedCompanyLinks);
  els.openTopSponsorButton.addEventListener("click", openTopSponsorSearches);
  els.favoriteCompanyButton.addEventListener("click", toggleFavoriteCompany);

  els.openTopButton.addEventListener("click", openTopResults);
  els.copyAllButton.addEventListener("click", () => copyLinks(state.results.map(item => item.url), "Copied all links"));
  els.copyCheckedButton.addEventListener("click", () => {
    const checkedLinks = state.results.filter(item => state.checked.has(item.key)).map(item => item.url);
    copyLinks(checkedLinks, "Copied checked links");
  });
  els.shareButton.addEventListener("click", () => copyLinks([window.location.href], "Copied share link"));
  els.resetButton.addEventListener("click", resetSearch);
  els.latestOneHourButton.addEventListener("click", applyLatestOneHourFlow);
  els.themeToggle.addEventListener("click", toggleTheme);

  els.pinnedOperators.addEventListener("click", event => {
    const button = event.target.closest("button[data-pin-remove]");
    if (!button) {
      return;
    }
    togglePinnedPortal(button.dataset.pinRemove);
  });
}

function populateRolePacks() {
  [els.rolePackSelect, els.companyRolePack].forEach(select => {
    select.innerHTML = "";
    ROLE_PACKS.forEach(pack => {
      const option = document.createElement("option");
      option.value = pack.id;
      option.textContent = pack.label;
      select.appendChild(option);
    });
    select.value = DEFAULT_ROLE_PACK_ID;
  });
}

function populateProfiles() {
  els.profileSelect.innerHTML = "";
  SEARCH_PROFILES.forEach(profile => {
    const option = document.createElement("option");
    option.value = profile.id;
    option.textContent = profile.label;
    els.profileSelect.appendChild(option);
  });
  els.profileSelect.value = DEFAULT_PROFILE_ID;
}

function populateCategories() {
  els.categoryFilters.innerHTML = "";
  CATEGORIES.forEach(category => {
    const label = document.createElement("label");
    label.className = "filter-chip";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = category.id;
    input.checked = category.checked;

    label.append(input, document.createTextNode(category.label));
    els.categoryFilters.appendChild(label);
  });
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

function populateCompanyControls() {
  els.companyLocationSelect.innerHTML = "";
  LOCATIONS.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    els.companyLocationSelect.appendChild(option);
  });
  els.companyLocationSelect.value = "usa";

  const categories = Array.from(new Set(COMPANIES.map(company => company.category))).sort();
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    els.companyCategorySelect.appendChild(option);
  });
}

function populateResources() {
  els.resourceGrid.innerHTML = "";
  RESOURCE_LINKS.forEach(resource => {
    const card = document.createElement("article");
    card.className = "resource-card";
    const title = document.createElement("a");
    title.href = resource.url;
    title.target = "_blank";
    title.rel = "noopener";
    title.textContent = resource.name;
    const category = document.createElement("span");
    category.className = "pill";
    category.textContent = resource.category;
    const note = document.createElement("p");
    note.textContent = resource.note;
    card.append(title, category, note);
    els.resourceGrid.appendChild(card);
  });
}

function renderSponsorGrid() {
  els.sponsorGrid.innerHTML = "";
  const sponsors = COMPANIES
    .filter(company => company.h1bFilings > 0)
    .sort((a, b) => b.h1bFilings - a.h1bFilings)
    .slice(0, 16);
  const fragment = document.createDocumentFragment();
  sponsors.forEach(company => {
    const card = document.createElement("article");
    card.className = "sponsor-card";
    const title = document.createElement("div");
    title.className = "sponsor-title";
    const name = document.createElement("strong");
    name.textContent = company.name;
    const filings = createPill(`${company.h1bFilings.toLocaleString()} filings`);
    title.append(name, filings);
    const meta = document.createElement("div");
    meta.className = "portal-meta";
    meta.append(createPill(company.companyKind === "vendor" ? "Vendor" : "Direct employer"));
    meta.append(createPill(FILTER_LABELS.sponsorTier[company.sponsorTier] || company.sponsorTier));
    meta.append(createPill(company.category));
    const action = document.createElement("button");
    action.type = "button";
    action.className = "secondary-button";
    action.textContent = "Use in companies";
    action.addEventListener("click", () => {
      els.companySponsorTier.value = company.sponsorTier;
      els.companyKind.value = company.companyKind;
      els.companyCategorySelect.value = "all";
      els.companyFilter.value = company.name;
      renderCompanyOptions(els.companyFilter.value);
      const match = state.visibleCompanies.find(item => item.id === company.id);
      els.companySelect.value = match ? company.id : ALL_COMPANIES_ID;
      syncCompanyCard();
      document.getElementById("careersHeading").scrollIntoView({ behavior: "smooth" });
    });
    card.append(title, meta, action);
    fragment.appendChild(card);
  });
  els.sponsorGrid.appendChild(fragment);
}

function rebuildTimeOptions(engine, preferredValue) {
  const options = TIME_OPTIONS[engine] || TIME_OPTIONS.google;
  const current = preferredValue || els.timeFilter.value || "all";
  els.timeFilter.innerHTML = "";

  options.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    els.timeFilter.appendChild(option);
  });

  els.timeFilter.value = options.some(([value]) => value === current) ? current : "all";
}

function hydrateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (![...params.keys()].length) {
    return false;
  }

  setSelectIfValid(els.profileSelect, params.get("profile") || DEFAULT_PROFILE_ID);
  setSelectIfValid(els.rolePackSelect, params.get("rolePack") || DEFAULT_ROLE_PACK_ID);
  if (params.get("engine") && TIME_OPTIONS[params.get("engine")]) {
    els.engineSelect.value = params.get("engine");
  }
  rebuildTimeOptions(els.engineSelect.value, params.get("time") || undefined);

  setSelectIfValid(els.locationSelect, params.get("location") || "usa");
  setSelectIfValid(els.timeFilter, params.get("time") || els.timeFilter.value);
  setSelectIfValid(els.sortSelect, params.get("sort") || "coverage");
  setSelectIfValid(els.remoteMode, params.get("remote") || "neutral");
  setSelectIfValid(els.matchMode, params.get("match") || "smart");
  setSelectIfValid(els.experienceSelect, params.get("experience") || "any");
  setSelectIfValid(els.employmentSelect, params.get("employment") || "any");
  setSelectIfValid(els.authorizationSelect, params.get("authorization") || "none");
  els.cautionExcludes.checked = params.get("caution") === "1";

  els.jobTitle.value = params.get("job") || "";
  els.includeTerms.value = params.get("include") || "";
  els.excludeTerms.value = params.get("exclude") || "";

  const groups = params.get("groups");
  if (groups) {
    const selected = groups === "none" ? new Set() : new Set(groups.split(",").filter(Boolean));
    setCategorySelection(selected);
  }
  const pins = params.get("pins");
  if (pins) {
    state.pinnedPortals = new Set(pins.split(",").filter(id => PORTALS.some(portal => portal.id === id)));
  }

  return true;
}

function loadPreferences() {
  let data = {};
  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (error) {
    data = {};
  }

  setSelectIfValid(els.profileSelect, data.profile || DEFAULT_PROFILE_ID);
  setSelectIfValid(els.rolePackSelect, data.rolePack || DEFAULT_ROLE_PACK_ID);
  setSelectIfValid(els.engineSelect, data.engine || "google");
  rebuildTimeOptions(els.engineSelect.value, data.time || undefined);
  setSelectIfValid(els.timeFilter, data.time || "all");
  setSelectIfValid(els.locationSelect, data.location || "usa");
  setSelectIfValid(els.sortSelect, data.sort || "coverage");
  setSelectIfValid(els.remoteMode, data.remoteMode || "neutral");
  setSelectIfValid(els.matchMode, data.matchMode || "smart");
  setSelectIfValid(els.experienceSelect, data.experience || "entry");
  setSelectIfValid(els.employmentSelect, data.employment || "any");
  setSelectIfValid(els.authorizationSelect, data.authorization || "none");
  els.cautionExcludes.checked = Boolean(data.cautionExcludes);

  els.jobTitle.value = data.jobTitle || "";
  els.includeTerms.value = data.includeTerms || "";
  els.excludeTerms.value = data.excludeTerms || "";
  els.companyRole.value = data.companyRole || "";
  els.companyFilter.value = data.companyFilter || "";
  setSelectIfValid(els.companyRolePack, data.companyRolePack || data.rolePack || DEFAULT_ROLE_PACK_ID);
  setSelectIfValid(els.companyTimeFilter, data.companyTime || "24hours");
  setSelectIfValid(els.companyExperienceSelect, data.companyExperience || "entry");
  setSelectIfValid(els.companyLocationSelect, data.companyLocation || data.location || "usa");
  setSelectIfValid(els.companyRemoteMode, data.companyRemoteMode || data.remoteMode || "neutral");
  setSelectIfValid(els.companySortSelect, data.companySort || "latest");
  setSelectIfValid(els.companyCategorySelect, data.companyCategory || "all");
  setSelectIfValid(els.companySponsorTier, data.companySponsorTier || "all");
  setSelectIfValid(els.companyKind, data.companyKind || "all");

  if (Array.isArray(data.selectedCategories)) {
    setCategorySelection(new Set(data.selectedCategories));
  }
  if (Array.isArray(data.favoriteCompanies)) {
    state.favoriteCompanies = new Set(data.favoriteCompanies);
  }
  if (Array.isArray(data.pinnedPortals)) {
    state.pinnedPortals = new Set(data.pinnedPortals.filter(id => PORTALS.some(portal => portal.id === id)));
  }
  if (data.selectedCompany) {
    setSelectIfValid(els.companySelect, data.selectedCompany);
  }
}

function savePreferences() {
  const payload = {
    profile: els.profileSelect.value,
    rolePack: els.rolePackSelect.value,
    jobTitle: els.jobTitle.value,
    engine: els.engineSelect.value,
    time: els.timeFilter.value,
    location: els.locationSelect.value,
    sort: els.sortSelect.value,
    remoteMode: els.remoteMode.value,
    matchMode: els.matchMode.value,
    hasTypedTitle: parseTitles(els.jobTitle.value).length > 0,
    experience: els.experienceSelect.value,
    employment: els.employmentSelect.value,
    authorization: els.authorizationSelect.value,
    includeTerms: els.includeTerms.value,
    excludeTerms: els.excludeTerms.value,
    cautionExcludes: els.cautionExcludes.checked,
    companyRole: els.companyRole.value,
    companyFilter: els.companyFilter.value,
    companyRolePack: els.companyRolePack.value,
    companyTime: els.companyTimeFilter.value,
    companyExperience: els.companyExperienceSelect.value,
    companyLocation: els.companyLocationSelect.value,
    companyRemoteMode: els.companyRemoteMode.value,
    companySort: els.companySortSelect.value,
    companyCategory: els.companyCategorySelect.value,
    companySponsorTier: els.companySponsorTier.value,
    companyKind: els.companyKind.value,
    selectedCategories: Array.from(getSelectedCategories()),
    favoriteCompanies: Array.from(state.favoriteCompanies),
    pinnedPortals: Array.from(state.pinnedPortals),
    selectedCompany: els.companySelect.value
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function persistAndMaybeGenerate() {
  savePreferences();
  syncProfileDescription();
  syncCompanyCard();
  if (hasJobTitle()) {
    generateResults();
  } else {
    updateCounts();
    updatePreviewForEmptyState();
  }
}

function applyProfile(profileId) {
  const profile = SEARCH_PROFILES.find(item => item.id === profileId) || SEARCH_PROFILES[0];
  if (profile.defaults.time) {
    rebuildTimeOptions(els.engineSelect.value, profile.defaults.time);
  }
  setSelectIfValid(els.rolePackSelect, profile.defaults.rolePack);
  setSelectIfValid(els.timeFilter, profile.defaults.time);
  setSelectIfValid(els.sortSelect, profile.defaults.sort);
  setSelectIfValid(els.authorizationSelect, profile.defaults.authorization);
  setSelectIfValid(els.experienceSelect, profile.defaults.experience);
  setSelectIfValid(els.matchMode, profile.defaults.matchMode);
  if (profile.categories) {
    setCategorySelection(new Set(profile.categories));
  }
}

function applyPrecision(precision) {
  switch (precision) {
    case "latest1":
      rebuildTimeOptions(els.engineSelect.value, "1hour");
      setSelectIfValid(els.timeFilter, "1hour");
      setSelectIfValid(els.sortSelect, "latest");
      setSelectIfValid(els.authorizationSelect, "none");
      setCategorySelection(new Set(["top", "direct", "signals", "general", "tech", "company"]));
      break;
    case "latest24":
      rebuildTimeOptions(els.engineSelect.value, "24hours");
      setSelectIfValid(els.timeFilter, "24hours");
      setSelectIfValid(els.sortSelect, "latest");
      setSelectIfValid(els.authorizationSelect, "none");
      setCategorySelection(new Set(DEFAULT_CATEGORY_IDS));
      break;
    case "optSponsor":
      setSelectIfValid(els.authorizationSelect, "optBroad");
      setSelectIfValid(els.sortSelect, "coverage");
      setCategorySelection(new Set(["top", "direct", "signals", "general", "tech", "company", "research"]));
      break;
    case "direct":
      setSelectIfValid(els.sortSelect, "direct");
      setCategorySelection(new Set(["top", "direct", "company"]));
      break;
    case "exact":
      setSelectIfValid(els.matchMode, "exact");
      setSelectIfValid(els.sortSelect, "recommended");
      break;
    default:
      setSelectIfValid(els.authorizationSelect, "none");
      setSelectIfValid(els.matchMode, "smart");
      setSelectIfValid(els.sortSelect, "coverage");
      setCategorySelection(new Set(DEFAULT_CATEGORY_IDS));
      break;
  }
}

function syncProfileDescription() {
  const profile = SEARCH_PROFILES.find(item => item.id === els.profileSelect.value) || SEARCH_PROFILES[0];
  const rolePack = getRolePack(els.rolePackSelect.value);
  els.profileDescription.textContent = `${profile.description} Role pack: ${rolePack.label}. Mode: ${FILTER_LABELS.precision[getPrecisionFromProfile(profile.id)] || "Max Coverage"}.`;
}

function setSelectIfValid(select, value) {
  if (!value) {
    return;
  }
  if ([...select.options].some(option => option.value === value)) {
    select.value = value;
  }
}

function setCategorySelection(selected) {
  els.categoryFilters.querySelectorAll("input").forEach(input => {
    input.checked = selected.has(input.value);
  });
}

function hasJobTitle() {
  return getSearchTitles().length > 0;
}

function generateResults(updateUrl = true) {
  const titles = getSearchTitles();
  if (!titles.length) {
    state.results = [];
    state.checked.clear();
    els.results.innerHTML = "";
    const emptyMessage = els.emptyState.querySelector("strong");
    if (emptyMessage) {
      emptyMessage.textContent = "Ready when you are.";
    }
    setEmptyState(true);
    updateCounts();
    updatePreviewForEmptyState();
    savePreferences();
    return;
  }

  const context = getContext();
  const portals = getSelectedPortals();
  if (!portals.length) {
    state.results = [];
    state.checked.clear();
    els.results.innerHTML = "";
    const emptyMessage = els.emptyState.querySelector("strong");
    if (emptyMessage) {
      emptyMessage.textContent = "Select at least one source group.";
    }
    setEmptyState(true);
    updateCounts();
    updatePreviewForEmptyState();
    savePreferences();
    if (updateUrl) {
      updateAddressBar(titles, context);
    }
    return;
  }

  const nextResults = [];

  titles.forEach(title => {
    portals.forEach(portal => {
      const query = buildPortalQuery(title, portal, context);
      const url = buildSearchUrl(portal, query, title, context);
      nextResults.push({
        key: `${title.toLowerCase()}::${portal.id}`,
        title,
        portal,
        query,
        url,
        searchKind: getSearchKind(portal)
      });
    });
  });

  state.results = nextResults;
  state.checked = new Set([...state.checked].filter(key => state.results.some(item => item.key === key)));
  renderResults();
  updateRelatedTitles(titles[0]);
  setEmptyState(false);
  updateCounts();
  updatePreview(titles[0], portals[0], context);
  savePreferences();
  if (updateUrl) {
    updateAddressBar(titles, context);
  }
}

function renderResults() {
  els.results.innerHTML = "";
  const grouped = new Map();
  state.results.forEach(item => {
    if (!grouped.has(item.title)) {
      grouped.set(item.title, []);
    }
    grouped.get(item.title).push(item);
  });

  const fragment = document.createDocumentFragment();
  grouped.forEach((items, title) => {
    const group = document.createElement("section");
    group.className = "result-group";

    const heading = document.createElement("div");
    heading.className = "result-title";
    const h3 = document.createElement("h3");
    h3.textContent = title;
    const meta = document.createElement("p");
    meta.textContent = `${items.length} source links`;
    heading.append(h3, meta);

    const grid = document.createElement("div");
    grid.className = "portal-grid";
    items.forEach(item => grid.appendChild(renderPortalRow(item)));

    group.append(heading, grid);
    fragment.appendChild(group);
  });

  els.results.appendChild(fragment);
}

function renderPortalRow(item) {
  const row = document.createElement("article");
  row.className = "portal-row";
  if (state.checked.has(item.key)) {
    row.classList.add("checked");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = state.checked.has(item.key);
  checkbox.setAttribute("aria-label", `Select ${item.portal.name}`);
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

  const body = document.createElement("div");
  body.className = "portal-body";

  const link = document.createElement("a");
  link.href = item.url;
  link.target = "_blank";
  link.rel = "noopener";
  link.className = "portal-link";
  link.textContent = item.portal.name;
  link.addEventListener("focus", () => updatePreview(item.title, item.portal, getContext()));
  link.addEventListener("mouseenter", () => updatePreview(item.title, item.portal, getContext()));

  const summary = document.createElement("p");
  summary.className = "portal-summary";
  summary.textContent = item.portal.note || getPortalScopeLabel(item.portal);

  const meta = document.createElement("div");
  meta.className = "portal-meta";
  meta.append(createPill(CATEGORY_LABELS[item.portal.category] || item.portal.category));
  meta.append(createPill(getPortalScopeLabel(item.portal)));
  meta.append(createPill(item.searchKind));
  (item.portal.tags || []).forEach(tag => meta.append(createPill(tag)));

  body.append(link, summary, meta);

  const actions = document.createElement("div");
  actions.className = "portal-actions";

  const pinButton = document.createElement("button");
  pinButton.type = "button";
  pinButton.className = "copy-button";
  pinButton.textContent = state.pinnedPortals.has(item.portal.id) ? "Unpin" : "Pin";
  pinButton.addEventListener("click", () => togglePinnedPortal(item.portal.id));

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "copy-button";
  copyButton.textContent = "Copy";
  copyButton.addEventListener("click", () => copyLinks([item.url], `Copied ${item.portal.name}`));

  actions.append(pinButton, copyButton);
  row.append(checkbox, body, actions);
  return row;
}

function getPortalScopeLabel(portal) {
  const capability = getSourceCapability(portal);
  if (capability) {
    return capability.label;
  }
  return "Broad search";
}

function getSearchKind(portal) {
  const capability = getSourceCapability(portal);
  return capability ? capability.kind : SOURCE_CAPABILITIES.operator.kind;
}

function getSourceCapability(portal) {
  if (portal.native && SOURCE_CAPABILITIES[portal.native]) {
    return SOURCE_CAPABILITIES[portal.native];
  }
  if (portal.native) {
    return SOURCE_CAPABILITIES.native;
  }
  if (portal.rawSiteQuery || portal.sites) {
    return SOURCE_CAPABILITIES.operator;
  }
  return null;
}

function getLegacyPortalScopeLabel(portal) {
  if (portal.native === "linkedinJobs" || portal.native === "indeed" || portal.native === "usajobs") {
    return "Native filters";
  }
  if (portal.native === "linkedinPosts") {
    return "Post search";
  }
  if (portal.native === "static") {
    return "Research link";
  }
  if (portal.native) {
    return "Native search";
  }
  return "Search operator";
}

function createPill(text) {
  const pill = document.createElement("span");
  pill.className = "pill";
  pill.textContent = text;
  return pill;
}

function getSearchTitles() {
  const typed = parseTitles(els.jobTitle.value);
  if (typed.length) {
    return typed;
  }
  const pack = getRolePack(els.rolePackSelect.value);
  return [pack.primary];
}

function getRolePack(id) {
  return ROLE_PACKS.find(pack => pack.id === id) || ROLE_PACKS[0];
}

function parseTitles(input) {
  return input
    .split(/[,;\n]/)
    .map(item => smartTitleCase(item.trim()))
    .filter(Boolean)
    .filter((item, index, items) => items.indexOf(item) === index);
}

function smartTitleCase(value) {
  return value
    .replace(/\s+/g, " ")
    .split(" ")
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
    profile: els.profileSelect.value,
    rolePack: els.rolePackSelect.value,
    precision: getPrecisionFromProfile(els.profileSelect.value),
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
    excludeTerms: parseTermList(els.excludeTerms.value),
    cautionExcludes: els.cautionExcludes.checked
  };
}

function getPrecisionFromProfile(profileId) {
  const profile = SEARCH_PROFILES.find(item => item.id === profileId) || SEARCH_PROFILES[0];
  return profile.defaults.precision || "coverage";
}

function parseTermList(value) {
  return value
    .split(",")
    .map(term => term.trim())
    .filter(Boolean);
}

function getSelectedPortals() {
  const selectedCategories = getSelectedCategories();
  return sortPortals(PORTALS.filter(portal => selectedCategories.has(portal.category)), els.sortSelect.value);
}

function getSelectedCategories() {
  const selected = new Set();
  els.categoryFilters.querySelectorAll("input:checked").forEach(input => selected.add(input.value));
  return selected;
}

function sortPortals(portals, sortMode) {
  const categoryBoost = {
    top: 140,
    direct: 130,
    signals: 120,
    general: 110,
    tech: 100,
    company: 90,
    remote: 70,
    public: 60,
    research: 40
  };

  const score = portal => {
    const base = portal.priority * 10 + (categoryBoost[portal.category] || 0);
    const pinnedBoost = state.pinnedPortals.has(portal.id) ? 1200 : 0;
    if (sortMode === "latest") {
      const latestBoost = ["linkedinJobs", "indeed", "linkedinPosts", "google", "usajobs"].includes(portal.id) ? 600 : 0;
      return base + latestBoost + pinnedBoost;
    }
    if (sortMode === "direct") {
      const directBoost = portal.category === "direct" ? 700 : portal.category === "company" ? 450 : 0;
      return base + directBoost + pinnedBoost;
    }
    if (sortMode === "coverage") {
      const coverageBoost = ["top", "general", "tech", "company"].includes(portal.category) ? 450 : 0;
      return base + coverageBoost + pinnedBoost;
    }
    return base + pinnedBoost;
  };

  return [...portals].sort((a, b) => score(b) - score(a) || a.order - b.order);
}

function updateCounts() {
  const selectedPortals = getSelectedPortals();
  els.portalCount.textContent = String(selectedPortals.length);
  els.checkedCount.textContent = String(state.checked.size);
  const hasResults = state.results.length > 0;
  els.openTopButton.disabled = !hasResults;
  els.copyAllButton.disabled = !hasResults;
  els.copyCheckedButton.disabled = state.checked.size === 0;
  els.shareButton.disabled = !hasResults;
  els.resultMeta.textContent = hasResults
    ? `${state.results.length} links across ${selectedPortals.length} sources - ${getActiveFilterSummary(getContext())}`
    : "Ready";
  renderPinnedOperators();
}

function togglePinnedPortal(portalId) {
  if (state.pinnedPortals.has(portalId)) {
    state.pinnedPortals.delete(portalId);
  } else {
    state.pinnedPortals.add(portalId);
  }
  savePreferences();
  renderPinnedOperators();
  if (hasJobTitle()) {
    generateResults();
  } else {
    updatePreviewForEmptyState();
    updateAddressBar(getSearchTitles(), getContext());
  }
}

function renderPinnedOperators() {
  els.pinnedOperators.innerHTML = "";
  const pinned = PORTALS.filter(portal => state.pinnedPortals.has(portal.id));
  els.pinnedBlock.hidden = pinned.length === 0;
  pinned.forEach(portal => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tag-button";
    button.dataset.pinRemove = portal.id;
    button.textContent = `${portal.name} - remove`;
    els.pinnedOperators.appendChild(button);
  });
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
    PROFILE_LABELS[context.profile],
    ROLE_PACK_LABELS[context.rolePack],
    FILTER_LABELS.precision[context.precision],
    FILTER_LABELS.authorization[context.authorization],
    FILTER_LABELS.sort[context.sort],
    getLocationLabel(context.location)
  ].filter(Boolean).join("\n");
}

function updatePreview(title, portal, context) {
  if (!portal) {
    updatePreviewForEmptyState();
    return;
  }
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
  if (portal.native === "static") {
    return `${title} ${portal.name}`;
  }

  const parts = [
    buildTitleExpression(title, context),
    buildSiteExpression(portal),
    getLocationQuery(context.location),
    getWorkSettingQuery(context.remoteMode),
    getExperienceQuery(context.experience),
    getEmploymentQuery(context.employment),
    getAuthorizationQuery(context.authorization),
    buildIncludeQuery(context.includeTerms),
    buildExcludeQuery([...context.excludeTerms, ...getCautionExcludes(context)])
  ].filter(Boolean);

  return parts.join(" ");
}

function buildTitleExpression(title, context) {
  if (context.matchMode === "exact") {
    return quoteTerm(title);
  }
  if (!context.hasTypedTitle) {
    const pack = getRolePack(context.rolePack);
    if (pack && pack.query) {
      return pack.query;
    }
  }
  const related = findTitleGroup(title);
  return `(${related.map(quoteTerm).join(" OR ")})`;
}

function findTitleGroup(title) {
  const normalized = title.toLowerCase();
  return RELATED_TITLE_GROUPS.find(items => items.some(item => item.toLowerCase() === normalized)) || [title];
}

function buildSiteExpression(portal) {
  if (portal.native === "google") {
    return "(job OR jobs OR careers OR hiring)";
  }
  if (portal.rawSiteQuery) {
    return portal.rawSiteQuery;
  }
  if (!portal.sites || !portal.sites.length) {
    return "";
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
      return '("entry level" OR junior OR "new grad" OR "university graduate" OR "0-2 years" OR "early career")';
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

function getCautionExcludes(context) {
  return context.cautionExcludes ? CAUTION_EXCLUDE_TERMS : [];
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

function buildSearchUrl(portal, query, title, context) {
  switch (portal.native) {
    case "linkedinJobs":
      return buildLinkedInJobsUrl(title, context);
    case "linkedinPosts":
      return buildLinkedInPostsUrl(title, context);
    case "indeed":
      return buildIndeedUrl(title, context);
    case "usajobs":
      return buildUSAJobsUrl(title, context);
    case "google":
      return buildGoogleUrl(query, context.time, context.sort);
    case "ziprecruiter":
      return `https://www.ziprecruiter.com/jobs-search?search=${encodeURIComponent(buildNativeKeywordQuery(title, context))}&location=${encodeURIComponent(getNativeLocation(context.location))}`;
    case "dice":
      return `https://www.dice.com/jobs?q=${encodeURIComponent(buildNativeKeywordQuery(title, context))}&location=${encodeURIComponent(getNativeLocation(context.location))}`;
    case "builtin":
      return `https://builtin.com/jobs?search=${encodeURIComponent(title)}&location=${encodeURIComponent(getNativeLocation(context.location))}`;
    case "simplify":
      return `https://simplify.jobs/jobs?query=${encodeURIComponent(buildNativeKeywordQuery(title, context))}`;
    case "wellfound":
      return `https://wellfound.com/jobs`;
    case "yc":
      return `https://www.ycombinator.com/jobs?query=${encodeURIComponent(title)}`;
    case "levels":
      return `https://www.levels.fyi/jobs/?searchText=${encodeURIComponent(title)}`;
    case "welcome":
      return `https://www.welcometothejungle.com/en/jobs?query=${encodeURIComponent(title)}`;
    case "monster":
      return `https://www.monster.com/jobs/search?q=${encodeURIComponent(title)}&where=${encodeURIComponent(getNativeLocation(context.location))}`;
    case "careerbuilder":
      return `https://www.careerbuilder.com/jobs?keywords=${encodeURIComponent(title)}&location=${encodeURIComponent(getNativeLocation(context.location))}`;
    case "remoteRocketship":
      return `https://www.remoterocketship.com/?query=${encodeURIComponent(title)}`;
    case "remotive":
      return `https://remotive.com/?query=${encodeURIComponent(title)}`;
    case "weWorkRemotely":
      return `https://weworkremotely.com/remote-jobs/search?term=${encodeURIComponent(title)}`;
    case "remoteOk":
      return `https://remoteok.com/remote-${encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))}-jobs`;
    case "idealist":
      return `https://www.idealist.org/en/jobs?q=${encodeURIComponent(title)}`;
    case "higherEdJobs":
      return `https://www.higheredjobs.com/search/advanced_action.cfm?Keyword=${encodeURIComponent(title)}`;
    case "governmentJobs":
      return `https://www.governmentjobs.com/jobs?keyword=${encodeURIComponent(title)}&location=${encodeURIComponent(getNativeLocation(context.location))}`;
    case "static":
      return portal.url;
    default:
      return buildSearchEngineUrl(context.engine, query, context.time, context.sort);
  }
}

function buildNativeKeywordQuery(title, context) {
  const parts = [buildNativeTitleQuery(title, context), ...context.includeTerms];
  const auth = getNativeAuthorizationSuffix(context.authorization);
  if (auth) {
    parts.push(auth);
  }
  [...context.excludeTerms, ...getCautionExcludes(context)].forEach(term => parts.push(`-${formatTerm(term)}`));
  return parts.filter(Boolean).join(" ");
}

function buildNativeTitleQuery(title, context) {
  if (context.matchMode === "exact") {
    return title;
  }
  if (!context.hasTypedTitle) {
    const pack = getRolePack(context.rolePack);
    if (pack && pack.query) {
      return pack.query;
    }
  }
  const related = findTitleGroup(title);
  return related.length > 1 ? `(${related.map(quoteTerm).join(" OR ")})` : title;
}

function getNativeAuthorizationSuffix(value) {
  switch (value) {
    case "optBroad":
      return "OPT OR STEM OPT OR sponsorship OR E-Verify";
    case "currentAuthorized":
      return "authorized to work in the United States";
    case "sponsorNeeded":
      return "visa sponsorship OR H-1B sponsorship";
    case "everify":
      return "E-Verify";
    case "optStrict":
      return "OPT OR STEM OPT OR F-1 OPT";
    default:
      return "";
  }
}

function buildLinkedInJobsUrl(title, context) {
  const params = new URLSearchParams();
  params.set("keywords", buildNativeKeywordQuery(title, context));
  params.set("geoId", "103644278");
  params.set("location", getNativeLocation(context.location));
  params.set("origin", "JOB_SEARCH_PAGE_SEARCH_BUTTON");
  params.set("refresh", "true");
  params.set("sortBy", context.sort === "latest" ? "DD" : "R");
  params.set("spellCorrectionEnabled", "true");

  const timeParam = getLinkedInTimeParam(context.time);
  if (timeParam) {
    params.set("f_TPR", timeParam);
  }
  const experience = getLinkedInExperienceParam(context.experience);
  if (experience) {
    params.set("f_E", experience);
  }
  const jobType = getLinkedInJobTypeParam(context.employment);
  if (jobType) {
    params.set("f_JT", jobType);
  }
  const workType = getLinkedInWorkTypeParam(context.remoteMode);
  if (workType) {
    params.set("f_WT", workType);
  }
  const functionParam = getLinkedInFunctionParam(title, context);
  if (functionParam) {
    params.set("f_F", functionParam);
  }

  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

function buildLinkedInPostsUrl(title, context) {
  const keywords = [
    '"hiring"',
    quoteTerm(title),
    context.authorization === "sponsorNeeded" ? '"visa sponsorship"' : "",
    context.authorization === "optBroad" || context.authorization === "optStrict" ? '"OPT"' : "",
    ...context.includeTerms.map(formatTerm),
    getLocationLabel(context.location)
  ].filter(Boolean).join(" ");

  const params = new URLSearchParams();
  params.set("keywords", keywords);
  params.set("origin", "GLOBAL_SEARCH_HEADER");
  params.set("sortBy", '["date_posted"]');
  const datePosted = getLinkedInPostDateParam(context.time);
  if (datePosted) {
    params.set("datePosted", `["${datePosted}"]`);
  }
  params.set("contentType", '["jobs"]');
  return `https://www.linkedin.com/search/results/content/?${params.toString()}`;
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

function getLinkedInPostDateParam(time) {
  if (["1hour", "4hours", "8hours", "12hours", "24hours", "48hours", "72hours"].includes(time)) {
    return "past-24h";
  }
  if (time === "week") {
    return "past-week";
  }
  if (time === "month") {
    return "past-month";
  }
  return "";
}

function getLinkedInExperienceParam(value) {
  const map = {
    internship: "1",
    entry: "1,2",
    mid: "3,4",
    senior: "4,5",
    manager: "5,6"
  };
  return map[value] || "";
}

function getLinkedInJobTypeParam(value) {
  const map = {
    fulltime: "F",
    contract: "C",
    parttime: "P",
    internship: "I"
  };
  return map[value] || "";
}

function getLinkedInWorkTypeParam(value) {
  const map = {
    onsite: "1",
    "onsite-hybrid": "1,3",
    only: "2",
    hybrid: "3",
    exclude: "1,3"
  };
  return map[value] || "";
}

function getLinkedInFunctionParam(title, context) {
  if (context.matchMode !== "exact") {
    return "";
  }
  const normalized = title.toLowerCase();
  if (/data|analyst|analytics|intelligence|scientist|machine learning/.test(normalized)) {
    return "it,anls,rsch";
  }
  if (/software|developer|engineer|devops|sre|cloud|security/.test(normalized)) {
    return "eng,it";
  }
  if (/product/.test(normalized)) {
    return "prd";
  }
  return "";
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

function buildSearchEngineUrl(engine, query, time, sort) {
  const queryWithOlder = addOlderOperator(query, time);
  switch (engine) {
    case "duckduckgo":
      return buildDuckDuckGoUrl(queryWithOlder, time);
    case "bing":
      return buildBingUrl(queryWithOlder, time);
    case "brave":
      return buildBraveUrl(queryWithOlder, time);
    case "startpage":
      return buildStartpageUrl(queryWithOlder, time);
    case "yahoo":
      return buildYahooUrl(queryWithOlder, time);
    case "kagi":
      return buildKagiUrl(queryWithOlder, time);
    case "qwant":
      return buildQwantUrl(queryWithOlder, time);
    default:
      return buildGoogleUrl(query, time, sort);
  }
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
  const option = Object.values(TIME_OPTIONS).flat().find(([timeValue]) => timeValue === value);
  return option ? option[1] : "All";
}

function getActiveFilterSummary(context) {
  return [
    PROFILE_LABELS[context.profile],
    ROLE_PACK_LABELS[context.rolePack],
    FILTER_LABELS.precision[context.precision],
    getLocationLabel(context.location),
    getTimeLabel(context.time),
    FILTER_LABELS.sort[context.sort],
    FILTER_LABELS.authorization[context.authorization]
  ].filter(Boolean).join(" - ");
}

function updateAddressBar(titles, context) {
  const params = new URLSearchParams();
  if (els.jobTitle.value.trim()) {
    params.set("job", titles.join(","));
  }
  params.set("profile", context.profile);
  params.set("rolePack", context.rolePack);
  params.set("location", context.location);
  params.set("time", context.time);
  params.set("sort", context.sort);
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
  params.set("authorization", context.authorization);
  if (context.includeTerms.length) {
    params.set("include", context.includeTerms.join(","));
  }
  if (context.excludeTerms.length) {
    params.set("exclude", context.excludeTerms.join(","));
  }
  if (context.cautionExcludes) {
    params.set("caution", "1");
  }
  if (state.pinnedPortals.size) {
    params.set("pins", Array.from(state.pinnedPortals).join(","));
  }
  const categories = Array.from(getSelectedCategories());
  if (!categories.length) {
    params.set("groups", "none");
  } else if (categories.join(",") !== DEFAULT_CATEGORY_IDS.join(",")) {
    params.set("groups", categories.join(","));
  }
  history.pushState(null, "", `${window.location.pathname}?${params.toString()}`);
}

function renderCompanyOptions(filterText) {
  const normalized = filterText.trim().toLowerCase();
  const previousValue = els.companySelect.value || ALL_COMPANIES_ID;
  state.visibleCompanies = sortCompaniesForView(COMPANIES.filter(company => {
    if (!normalized) {
      return companyMatchesFilters(company);
    }
    return [
      company.name,
      company.category,
      company.tags.join(" "),
      company.aliases.join(" "),
      company.sponsorTier,
      company.companyKind,
      company.caution,
      state.favoriteCompanies.has(company.id) ? "favorite" : ""
    ].join(" ").toLowerCase().includes(normalized) && companyMatchesFilters(company);
  }));

  els.companySelect.innerHTML = "";
  if (!state.visibleCompanies.length) {
    const option = document.createElement("option");
    option.textContent = "No matching companies";
    option.value = "";
    els.companySelect.appendChild(option);
    els.companyCount.textContent = `0 of ${COMPANIES.length} companies`;
    return;
  }

  const allOption = document.createElement("option");
  allOption.value = ALL_COMPANIES_ID;
  allOption.textContent = `All companies (${state.visibleCompanies.length})`;
  els.companySelect.appendChild(allOption);

  const byCategory = new Map();
  state.visibleCompanies.forEach(company => {
    if (!byCategory.has(company.category)) {
      byCategory.set(company.category, []);
    }
    byCategory.get(company.category).push(company);
  });

  byCategory.forEach((companies, category) => {
    const group = document.createElement("optgroup");
    group.label = category;
    companies.forEach(company => {
      const option = document.createElement("option");
      option.value = company.id;
      option.textContent = `${company.rank}. ${company.name}`;
      group.appendChild(option);
    });
    els.companySelect.appendChild(group);
  });

  if (previousValue === ALL_COMPANIES_ID) {
    els.companySelect.value = ALL_COMPANIES_ID;
  } else if (state.visibleCompanies.some(company => company.id === previousValue)) {
    els.companySelect.value = previousValue;
  } else {
    els.companySelect.value = ALL_COMPANIES_ID;
  }
  const sponsorCount = state.visibleCompanies.filter(company => company.h1bFilings > 0).length;
  els.companyCount.textContent = `${state.visibleCompanies.length} of ${COMPANIES.length} companies - ${sponsorCount} H1B sponsors`;
}

function companyMatchesFilters(company) {
  const category = els.companyCategorySelect.value;
  if (category !== "all" && company.category !== category) {
    return false;
  }
  const sponsorTier = els.companySponsorTier.value;
  if (sponsorTier !== "all" && company.sponsorTier !== sponsorTier) {
    return false;
  }
  const kind = els.companyKind.value;
  if (kind !== "all" && company.companyKind !== kind) {
    return false;
  }
  return true;
}

function sortCompaniesForView(companies) {
  const mode = els.companySortSelect.value;
  return [...companies].sort((a, b) => {
    if (mode === "favorites") {
      const favDiff = Number(state.favoriteCompanies.has(b.id)) - Number(state.favoriteCompanies.has(a.id));
      if (favDiff) {
        return favDiff;
      }
    }
    if (mode === "sponsor") {
      return b.h1bFilings - a.h1bFilings || a.rank - b.rank;
    }
    if (mode === "recommended") {
      return getCompanyRecommendationScore(b) - getCompanyRecommendationScore(a) || a.rank - b.rank;
    }
    return a.rank - b.rank;
  });
}

function getCompanyRecommendationScore(company) {
  const favoriteBoost = state.favoriteCompanies.has(company.id) ? 200000 : 0;
  const sponsorBoost = company.h1bFilings * 20;
  const directBoost = company.companyKind === "direct" ? 1000 : 0;
  const cautionPenalty = company.caution ? 250 : 0;
  return favoriteBoost + sponsorBoost + directBoost - cautionPenalty;
}

function isAllCompaniesSelected() {
  return els.companySelect.value === ALL_COMPANIES_ID;
}

function getSelectedCompany() {
  if (isAllCompaniesSelected()) {
    return null;
  }
  return COMPANIES.find(company => company.id === els.companySelect.value) || state.visibleCompanies[0] || null;
}

function syncCompanyCard() {
  if (isAllCompaniesSelected()) {
    renderAllCompanyCard();
    return;
  }

  const company = getSelectedCompany();
  if (!company) {
    els.companyCard.textContent = "No company selected.";
    return;
  }
  els.companySelect.value = company.id;
  const favorite = state.favoriteCompanies.has(company.id);
  els.openCompanyButton.textContent = "Open Careers";
  els.searchCompanyButton.textContent = "Search This Company";
  els.searchCompanyButton.disabled = !getCompanySearchTitle();
  els.favoriteCompanyButton.hidden = false;
  els.favoriteCompanyButton.disabled = false;
  els.favoriteCompanyButton.textContent = favorite ? "Unfavorite" : "Favorite";

  els.companyCard.innerHTML = "";
  const title = document.createElement("div");
  title.className = "company-title";
  const name = document.createElement("h3");
  name.textContent = company.name;
  const rank = createPill(`#${company.rank}`);
  title.append(name, rank);

  const meta = document.createElement("div");
  meta.className = "portal-meta";
  meta.append(createPill(company.category));
  meta.append(createPill(FILTER_LABELS.companyKind[company.companyKind]));
  if (company.h1bFilings) {
    meta.append(createPill(`${company.h1bFilings.toLocaleString()} H1B filings`));
    meta.append(createPill(FILTER_LABELS.sponsorTier[company.sponsorTier] || company.sponsorTier));
  }
  company.tags.forEach(tag => meta.append(createPill(tag)));
  if (favorite) {
    meta.append(createPill("favorite"));
  }

  const url = document.createElement("a");
  url.href = company.careersUrl;
  url.target = "_blank";
  url.rel = "noopener";
  url.textContent = company.careersUrl;

  els.companyCard.append(title, meta, url);
  if (company.aliases.length) {
    const aliases = document.createElement("p");
    aliases.className = "company-note";
    aliases.textContent = `Aliases: ${company.aliases.join(", ")}`;
    els.companyCard.appendChild(aliases);
  }
  if (company.caution) {
    const caution = document.createElement("p");
    caution.className = "caution";
    caution.textContent = company.caution;
    els.companyCard.appendChild(caution);
  }
}

function renderAllCompanyCard() {
  els.companyCard.innerHTML = "";
  els.openCompanyButton.textContent = "Copy Career Pages";
  els.searchCompanyButton.textContent = "Copy All Search Links";
  els.favoriteCompanyButton.hidden = true;
  els.favoriteCompanyButton.disabled = true;

  const titleText = getCompanySearchTitle();
  const hasRole = Boolean(titleText);
  const context = getCompanyContext();
  const rows = hasRole ? getCompanySearchRows(titleText, context) : state.visibleCompanies.map(company => ({ company, searchUrl: "" }));
  els.searchCompanyButton.disabled = !hasRole;

  const title = document.createElement("div");
  title.className = "company-title";
  const name = document.createElement("h3");
  name.textContent = "All companies";
  const count = createPill(hasRole ? `${rows.length} search links` : `${rows.length} companies`);
  title.append(name, count);

  const meta = document.createElement("div");
  meta.className = "portal-meta";
  meta.append(createPill(getLocationLabel(context.location)));
  meta.append(createPill(getTimeLabel(context.time)));
  meta.append(createPill(FILTER_LABELS.authorization[context.authorization]));
  meta.append(createPill(FILTER_LABELS.companyKind[els.companyKind.value] || "Direct and vendors"));
  meta.append(createPill(FILTER_LABELS.sponsorTier[els.companySponsorTier.value] || "All sponsor tiers"));
  meta.append(createPill(hasRole ? `Role: ${titleText}` : "Role required"));

  const note = document.createElement("p");
  note.className = "company-note";
  note.textContent = hasRole
    ? "Every filtered search link below uses the company search role, location, freshness, authorization, include terms, exclude terms, and sort settings."
    : "Enter a company search role to create filtered company searches.";

  const list = document.createElement("div");
  list.className = "company-link-list";
  rows.forEach(row => {
    const item = document.createElement("article");
    item.className = "company-link-row";

    const companyName = document.createElement("strong");
    companyName.textContent = `${row.company.rank}. ${row.company.name}`;

    const category = document.createElement("span");
    category.className = "company-link-category";
    category.textContent = row.company.h1bFilings
      ? `${row.company.category} - ${row.company.h1bFilings.toLocaleString()} H1B filings`
      : row.company.category;

    const links = document.createElement("div");
    links.className = "company-link-actions";

    const careers = document.createElement("a");
    careers.href = row.company.careersUrl;
    careers.target = "_blank";
    careers.rel = "noopener";
    careers.textContent = "Careers";

    links.appendChild(careers);
    if (hasRole) {
      const search = document.createElement("a");
      search.href = row.searchUrl;
      search.target = "_blank";
      search.rel = "noopener";
      search.textContent = "Filtered search";
      links.appendChild(search);
    } else {
      const missing = document.createElement("span");
      missing.className = "company-link-muted";
      missing.textContent = "Add role";
      links.appendChild(missing);
    }
    item.append(companyName, category, links);
    list.appendChild(item);
  });

  els.companyCard.append(title, meta, note, list);
}

function openSelectedCompany() {
  if (isAllCompaniesSelected()) {
    copyLinks(state.visibleCompanies.map(company => company.careersUrl), "Copied all company career pages");
    return;
  }

  const company = getSelectedCompany();
  if (!company) {
    return;
  }
  window.open(company.careersUrl, "_blank", "noopener");
}

function searchSelectedCompany() {
  if (isAllCompaniesSelected()) {
    const title = getCompanySearchTitle();
    if (!title) {
      showToast("Enter a company search role");
      return;
    }
    const context = getCompanyContext();
    const links = getCompanySearchRows(title, context).map(row => row.searchUrl);
    copyLinks(links, "Copied all company search links");
    return;
  }

  const company = getSelectedCompany();
  if (!company) {
    return;
  }
  const title = getCompanySearchTitle();
  if (!title) {
    showToast("Enter a company search role");
    return;
  }
  const context = getCompanyContext();
  window.open(buildCompanySearchUrl(company, title, context), "_blank", "noopener");
}

function openCompanySearchType(type) {
  const title = getCompanySearchTitle();
  if (!title) {
    showToast("Enter a company search role");
    return;
  }
  const companies = getCompaniesForAction();
  const context = getCompanyContext();
  const urls = companies.flatMap(company => getCompanyActionUrls(company, title, context, type));
  if (!urls.length) {
    return;
  }
  if (companies.length === 1 && urls.length <= 2) {
    urls.forEach(url => window.open(url, "_blank", "noopener"));
    showToast(`Opened ${type === "indeedGoogle" ? "Indeed/Google" : type}`);
    return;
  }
  copyLinks(urls, `Copied ${urls.length} company ${type} links`);
}

function copySelectedCompanyLinks() {
  const title = getCompanySearchTitle();
  if (!title) {
    showToast("Enter a company search role");
    return;
  }
  const context = getCompanyContext();
  const links = getCompaniesForAction().flatMap(company => [
    company.careersUrl,
    buildCompanySearchUrl(company, title, context),
    ...getCompanyActionUrls(company, title, context, "linkedinJobs"),
    ...getCompanyActionUrls(company, title, context, "linkedinPosts"),
    ...getCompanyActionUrls(company, title, context, "indeedGoogle")
  ]);
  copyLinks(links, `Copied ${links.length} selected company links`);
}

function openTopSponsorSearches() {
  const title = getCompanySearchTitle();
  const context = getCompanyContext();
  const topSponsors = COMPANIES
    .filter(company => company.h1bFilings > 0 && company.companyKind === "direct")
    .sort((a, b) => b.h1bFilings - a.h1bFilings)
    .slice(0, 5);
  topSponsors.forEach(company => window.open(buildCompanySearchUrl(company, title, context), "_blank", "noopener"));
  showToast("Opened top 5 sponsor searches");
}

function getCompaniesForAction() {
  if (isAllCompaniesSelected()) {
    return state.visibleCompanies;
  }
  const selected = getSelectedCompany();
  return selected ? [selected] : [];
}

function getCompanyActionUrls(company, title, context, type) {
  const companyContext = {
    ...context,
    includeTerms: mergeUnique(context.includeTerms, [company.name])
  };
  switch (type) {
    case "linkedinJobs":
      return [buildLinkedInJobsUrl(title, companyContext)];
    case "linkedinPosts":
      return [buildLinkedInPostsUrl(title, companyContext)];
    case "indeedGoogle":
      return [buildIndeedUrl(title, companyContext), buildCompanySearchUrl(company, title, context)];
    default:
      return [buildCompanySearchUrl(company, title, context)];
  }
}

function toggleFavoriteCompany() {
  if (isAllCompaniesSelected()) {
    return;
  }

  const company = getSelectedCompany();
  if (!company) {
    return;
  }
  if (state.favoriteCompanies.has(company.id)) {
    state.favoriteCompanies.delete(company.id);
  } else {
    state.favoriteCompanies.add(company.id);
  }
  savePreferences();
  renderCompanyOptions(els.companyFilter.value);
  els.companySelect.value = company.id;
  syncCompanyCard();
}

function getCompanySearchTitle() {
  const typed = parseTitles(els.companyRole.value)[0] || parseTitles(els.jobTitle.value)[0];
  if (typed) {
    return typed;
  }
  return getRolePack(els.companyRolePack.value || els.rolePackSelect.value).primary;
}

function getCompanyContext() {
  const hasCompanyTypedTitle = Boolean(parseTitles(els.companyRole.value)[0] || parseTitles(els.jobTitle.value)[0]);
  return {
    ...getContext(),
    rolePack: els.companyRolePack.value || els.rolePackSelect.value,
    hasTypedTitle: hasCompanyTypedTitle,
    time: els.companyTimeFilter.value,
    sort: els.companySortSelect.value === "latest" ? "latest" : "coverage",
    experience: els.companyExperienceSelect.value,
    location: els.companyLocationSelect.value,
    remoteMode: els.companyRemoteMode.value
  };
}

function getCompanySearchRows(title, context) {
  return state.visibleCompanies.map(company => ({
    company,
    searchUrl: buildCompanySearchUrl(company, title, context)
  }));
}

function buildCompanySearchUrl(company, title, context) {
  const query = [
    buildTitleExpression(title, context),
    buildCompanyNameExpression(company),
    getLocationQuery(context.location),
    "(job OR jobs OR careers OR hiring OR openings)",
    company.careersUrl ? `site:${urlToSiteHost(company.careersUrl)}` : "",
    getAuthorizationQuery(context.authorization),
    buildIncludeQuery(context.includeTerms),
    buildExcludeQuery([...context.excludeTerms, ...getCautionExcludes(context)])
  ].filter(Boolean).join(" ");
  return buildGoogleUrl(query, context.time, context.sort);
}

function buildCompanyNameExpression(company) {
  const names = [company.name, ...(company.aliases || [])].slice(0, 4).map(quoteTerm);
  return names.length > 1 ? `(${names.join(" OR ")})` : names[0];
}

function urlToSiteScope(url) {
  if (!url) {
    return "";
  }
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const path = parsed.pathname && parsed.pathname !== "/" ? parsed.pathname.replace(/\/$/, "") : "";
    return `${host}${path}`;
  } catch (error) {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

function urlToSiteHost(url) {
  if (!url) {
    return "";
  }
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (error) {
    return url.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
  }
}

function openTopResults() {
  state.results.slice(0, 5).forEach(item => {
    window.open(item.url, "_blank", "noopener");
  });
  showToast("Opened top 5 links");
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

function applyLatestOneHourFlow() {
  els.profileSelect.value = "latest1";
  applyProfile("latest1");
  applyPrecision("latest1");
  generateResults();
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast("Latest 1h search ready");
}

function resetSearch() {
  els.jobTitle.value = "";
  els.profileSelect.value = DEFAULT_PROFILE_ID;
  els.rolePackSelect.value = DEFAULT_ROLE_PACK_ID;
  els.engineSelect.value = "google";
  rebuildTimeOptions("google", "all");
  els.locationSelect.value = "usa";
  els.sortSelect.value = "coverage";
  els.remoteMode.value = "neutral";
  els.matchMode.value = "smart";
  els.experienceSelect.value = "entry";
  els.employmentSelect.value = "any";
  els.authorizationSelect.value = "none";
  els.includeTerms.value = "";
  els.excludeTerms.value = "";
  els.cautionExcludes.checked = false;
  els.companyRole.value = "";
  els.companyRolePack.value = DEFAULT_ROLE_PACK_ID;
  els.companyTimeFilter.value = "24hours";
  els.companyExperienceSelect.value = "entry";
  els.companyLocationSelect.value = "usa";
  els.companyRemoteMode.value = "neutral";
  els.companySortSelect.value = "latest";
  els.companyCategorySelect.value = "all";
  els.companySponsorTier.value = "all";
  els.companyKind.value = "all";
  els.companyFilter.value = "";
  setCategorySelection(new Set(DEFAULT_CATEGORY_IDS));
  renderCompanyOptions("");
  els.companySelect.value = ALL_COMPANIES_ID;
  syncCompanyCard();
  syncProfileDescription();
  state.results = [];
  state.checked.clear();
  els.results.innerHTML = "";
  const emptyMessage = els.emptyState.querySelector("strong");
  if (emptyMessage) {
    emptyMessage.textContent = "Ready when you are.";
  }
  setEmptyState(true);
  updateCounts();
  updatePreviewForEmptyState();
  savePreferences();
  history.pushState(null, "", window.location.pathname);
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(THEME_KEY, document.documentElement.classList.contains("dark") ? "dark" : "light");
  syncThemeButton();
}

function loadTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
  syncThemeButton();
}

function syncThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");
  els.themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  els.themeToggle.setAttribute("aria-pressed", String(isDark));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
