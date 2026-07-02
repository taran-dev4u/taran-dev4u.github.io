# Taran's Job Command Center

Taran's Job Command Center is a US-focused static job-search launcher. It builds fresh search links across ATS systems, general job boards, startup boards, public-sector portals, H1B sponsor companies, company career pages, and staffing/vendor outreach paths, with OPT-aware search profiles for an international student who is work-authorized in the United States.

## Features

- Dark theme by default, with an explicit saved light-mode option.
- Personal US OPT default profile with a max-coverage role pack for software, AI/ML, data, analytics, and cloud/DevOps roles.
- Role packs for broad target coverage, software, AI/ML, data analytics, and cloud/DevOps searches.
- Specific role packs for software engineer, full-stack, backend, frontend, AI engineer, ML engineer, data scientist, data engineer, analytics engineer, BI analyst, cloud/devops, and new-grad software searches.
- Query customization with balanced smart, compact title, broad Boolean, and custom raw-query modes.
- Portable custom source links with `{role}`, `{query}`, `{location}`, `{time}`, and `{company}` tokens.
- Independent per-board custom URL templates from each search result card. Each board keeps its own override and supports `{role}`, `{query}`, `{location}`, `{time}`, `{source}`, and `{portal}` tokens.
- Best Job Boards profile for broad US coverage across the most-used job boards and job-finding sources.
- Fast Apply Routine profile ordered for the fastest daily apply pass: LinkedIn Jobs, Indeed, Direct ATS, LinkedIn Posts, Google, Simplify, HiringCafe, Built In, Dice, Getwork, Glassdoor, and ZipRecruiter.
- Search presets for Backend, Full Stack, AI/ML, Data Analyst, Data Engineer, and New Grad Software. Presets update role, role pack, freshness, profile, sort, and source groups together.
- Daily Search Checklist for Latest 1h, Fast Apply Routine, Favorite Companies, Vendor Outreach, and OPT Resources. Checklist progress resets by date while normal settings stay saved.
- Multi-title search with comma-separated roles.
- Freshness filters from minute-signal searches through older-than ranges.
- Google, DuckDuckGo, Bing, Yahoo, Kagi, Qwant, Brave, and Startpage.
- US market default with major US tech and hiring metros.
- Latest-job ordering for search engines and native LinkedIn, Indeed, Glassdoor, ZipRecruiter, and Dice searches where the source supports it.
- Work-setting, title-match, experience, employment-type, include-keyword, and exclude-keyword filters.
- Profile-driven coverage rules that avoid hiding useful jobs unless the user chooses stricter filters.
- Minute Radar profile for urgent searches: Google/operator searches add "minutes ago" / "just posted" signals while native boards use their closest reliable newest filters.
- Fresh Direct ATS profile for new employer/ATS postings before they fully spread to aggregators.
- OPT-aware authorization modes: broad OPT, no auth filter, current US work authorization, future sponsorship, E-Verify, and exact OPT/STEM OPT.
- More than 75 portal targets across ATS, job board, startup, remote/flexible, public/nonprofit, higher-ed/research, H1B sponsor, vendor, and company career-page categories.
- H1B sponsor company layer with direct-employer/vendor separation, sponsor tiers, aliases, favorites, and company-specific LinkedIn/Indeed/Google search actions.
- Expanded company data from the workbook-backed layer: 500 direct employer rows and 200 staffing/vendor rows, normalized into the restored command-center format.
- Vendor Outreach section with role/location/vendor filters, vendor fit score, LinkedIn recruiter search, LinkedIn Jobs, Indeed, Google contact search, and copy-ready outreach templates.
- Vendor safety reminders based on official job-scam guidance: avoid upfront placement fees, fake-check/equipment scams, and unverified recruiter identities.
- Pinned search operators, copy-all, copy-checked, checked-progress, shareable URLs, related-title suggestions, and company search bundles.
- Opportunity fit scores on search links, based on source priority, freshness support, direct-apply value, entry-level usefulness, and OPT/sponsor research relevance.
- Source badges that show whether a link is native clean, Google advanced, direct apply, minute signal, OPT research, custom, or optional/noisy.
- Open High-Value Batch action for launching the strongest quick-apply links first without removing the broader result set.
- Copy Application Packet action with current role/location/profile, top links, favorite company links, OPT wording, follow-up reminders, and scam/auth safety reminders.
- Pin sync links for carrying pinned portals and settings to another browser or computer without a backend.
- Company search cards with related company results, reset, careers, LinkedIn recruiter/company, LinkedIn jobs/posts, Indeed/Google, Google Company, custom company links, and link-pack open/copy actions.
- Favorite company shortcuts above the company search controls, including instant favorite/unfavorite saving, top-favorites launch/copy actions, and visible LinkedIn Jobs, LinkedIn Posts, LinkedIn Recruiters, LinkedIn Company, Indeed/Google, and Google Company links.

## Recent Updates

- Google Advanced Search precision: single-domain source searches use `as_sitesearch=` instead of burying `site:` inside the main query.
- Company career page searches use working `inurl:` patterns for careers, jobs, people, talent, employment, openings, and join-us pages.
- iCIMS searches use the root `icims.com` domain so subdomain-hosted jobs are included.
- ZipRecruiter freshness mapping now uses tighter 3-day, 7-day, and 30-day windows where supported.
- OPT/STEM-OPT source curation: removed low-yield remote-only, government/public-sector, nonprofit, and senior-only boards from the launcher while keeping higher-ed/research employer search.
- Board-specific query formatting: LinkedIn/Indeed keep Boolean role packs, while simpler boards use plain role keywords so their search boxes do not misread Google-style operators.
- Minute-level search options: 5m, 10m, 15m, 30m, 45m signal modes, plus 2h, 3h, and 6h windows. Minute choices are treated as freshness signals where exact minute filters are not supported by the source.
- Long-query fix: default searches now use balanced role-pack wording, the aggregate Direct ATS source is shortened to high-use ATS domains, and broad Boolean mode is explicit instead of automatic.
- Source expansion: restored and added high-use boards such as Monster, CareerBuilder, FlexJobs, Getwork, SimplyHired, Talent.com, The Muse, Adzuna, Jora, Jooble, Nexxt, Snagajob, Ladders, College Recruiter, Hired, and Startup Jobs.
- Source refinement: low-signal ATS engines remain optional through `Extra ATS`; remote-only and public/nonprofit boards are available in separate optional groups so they do not crowd the daily OPT-focused flow.
- Native board search cleanup: LinkedIn, Indeed, and other job-board search boxes now receive compact role text by default, while Google/operator-only sources keep `site:` and advanced Boolean syntax.
- Company actions are now available directly inside each company box, with favorite-company cards and portable custom-link sync.
- Per-board Update Link controls let a specific source card use a custom URL template without changing any other job board.
- Fast Apply upgrade: added the daily routine profile, daily checklist, search presets, high-value batching, opportunity scores, source badges, application packet copying, and top-favorite company pack actions.

## Run Locally

Open `index.html` in a browser. No build step is required.

## Deploy To GitHub Pages

For a standalone repository, commit this folder as the repository root and enable GitHub Pages from the `main` branch, or use the included workflow in `.github/workflows/pages.yml`.
