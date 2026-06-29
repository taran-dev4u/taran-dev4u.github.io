# Taran's Job Command Center

Taran's Job Command Center is a US-focused static job-search launcher. It builds fresh search links across ATS systems, general job boards, startup boards, public-sector portals, H1B sponsor companies, company career pages, and staffing/vendor outreach paths, with OPT-aware search profiles for an international student who is work-authorized in the United States.

## Features

- Dark theme by default, with an explicit saved light-mode option.
- Personal US OPT default profile with a max-coverage role pack for software, AI/ML, data, analytics, and cloud/DevOps roles.
- Role packs for broad target coverage, software, AI/ML, data analytics, and cloud/DevOps searches.
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
- More than 50 portal targets across ATS, job board, startup, higher-ed/research, H1B sponsor, vendor, and company career-page categories.
- H1B sponsor company layer with direct-employer/vendor separation, sponsor tiers, aliases, favorites, and company-specific LinkedIn/Indeed/Google search actions.
- Expanded company data from the workbook-backed layer: 500 direct employer rows and 200 staffing/vendor rows, normalized into the restored command-center format.
- Vendor Outreach section with role/location/vendor filters, vendor fit score, LinkedIn recruiter search, LinkedIn Jobs, Indeed, Google contact search, and copy-ready outreach templates.
- Vendor safety reminders based on official job-scam guidance: avoid upfront placement fees, fake-check/equipment scams, and unverified recruiter identities.
- Pinned search operators, copy-all, copy-checked, checked-progress, shareable URLs, related-title suggestions, and company search bundles.

## Recent Updates

- Google Advanced Search precision: single-domain source searches use `as_sitesearch=` instead of burying `site:` inside the main query.
- Company career page searches use working `inurl:` patterns for careers, jobs, people, talent, employment, openings, and join-us pages.
- iCIMS searches use the root `icims.com` domain so subdomain-hosted jobs are included.
- ZipRecruiter freshness mapping now uses tighter 3-day, 7-day, and 30-day windows where supported.
- OPT/STEM-OPT source curation: removed low-yield remote-only, government/public-sector, nonprofit, and senior-only boards from the launcher while keeping higher-ed/research employer search.
- Board-specific query formatting: LinkedIn/Indeed keep Boolean role packs, while simpler boards use plain role keywords so their search boxes do not misread Google-style operators.
- Minute-level search options: 15m, 30m, 45m signal modes, plus 2h, 3h, and 6h windows. Minute choices are treated as freshness signals where exact minute filters are not supported by the source.

## Run Locally

Open `index.html` in a browser. No build step is required.

## Deploy To GitHub Pages

For a standalone repository, commit this folder as the repository root and enable GitHub Pages from the `main` branch, or use the included workflow in `.github/workflows/pages.yml`.
