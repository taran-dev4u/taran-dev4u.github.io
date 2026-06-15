# PortalScout Job Search

PortalScout is an original US-focused static job-search utility inspired by public search-operator workflows. It builds fresh search links across ATS systems, general job boards, remote boards, startup boards, public-sector portals, and company career pages, with OPT-aware search profiles for international students who are work-authorized in the United States.

## Features

- Multi-title search with comma-separated roles.
- Freshness filters from past hour through older-than ranges.
- Google, DuckDuckGo, Bing, Yahoo, Kagi, Qwant, Brave, and Startpage.
- US market default with major US tech and hiring metros.
- Latest-job ordering for search engines and native LinkedIn, Indeed, USAJobs, Glassdoor, ZipRecruiter, and Dice searches.
- Work-setting, title-match, experience, employment-type, include-keyword, and exclude-keyword filters.
- OPT-aware authorization modes: broad OPT, no auth filter, current US work authorization, future sponsorship, E-Verify, and exact OPT/STEM OPT.
- 63 portal targets across ATS, job board, startup, remote, nonprofit, government, and company career-page categories.
- 8 role packs covering software, AI/ML, data/analytics, cloud/DevOps, QA/SDET, product/analyst, and max-coverage families.
- 22 related-title groups for smart role expansion.
- Company and sponsor search with 700 companies ranked by 2026 H1B filings.
- Top sponsor chip grid showing the top 60 direct H1B employers by filing count.
- Copy-all, copy-checked, checked-progress, shareable URLs, related-title suggestions, and light/dark theme.

## Company Data

The company list is sourced from the 2026 H1B REAL TIME dataset and includes:

- 500 direct employers ranked by H1B filing count (Amazon 731, Meta 533, Google 488, Fidelity 374, JPMorgan 301, Apple 288, and more).
- 200 staffing vendors ranked by H1B filing count.
- Sponsor tiers: Top (500+ filings), Strong (200–499), Moderate (50–199), Curated (under 50).
- Industry categories: AI and Data, Cloud and Big Tech, Enterprise Software, Consulting and Services, Fintech and Finance, Health and Life Sciences, Cybersecurity, Telecom and Media, Hardware and Semiconductors, Retail and Consumer, Logistics and Industrial, Automotive and Mobility, Aerospace and Defense, Insurance, Staffing Vendors.
- Direct careers page URLs for ~80 major employers.

## Native Search Accuracy

LinkedIn Jobs uses `geoId=103644278` (United States), `spellCorrectionEnabled=true`, experience level `f_E`, job type `f_JT`, work type `f_WT`, and time posted `f_TPR` — all real LinkedIn URL parameters.

Indeed uses `fromage` for freshness (sub-24h maps to 1 day) and `sort=date` for newest-first.

Glassdoor, ZipRecruiter, and Dice use their own native URL builders when sort is set to Newest first, rather than falling back to a site-search operator.

## Run Locally

Open `index.html` in a browser. No build step is required.

## Deploy To GitHub Pages

For a standalone repository, commit this folder as the repository root and enable GitHub Pages from the `main` branch, or use the included workflow in `.github/workflows/pages.yml`.

## Update History

### 2026-06-14

- Added 700 companies (500 direct + 200 staffing vendors) from 2026 H1B filing data.
- Improved LinkedIn URL builder: `geoId`, `spellCorrectionEnabled`, `f_E` (experience), `f_JT` (employment type), `f_WT=1,3` for on-site or hybrid.
- Fixed Indeed freshness: sub-24h windows now correctly map to `fromage=1`; month maps to 30 days.
- Added native URL builders for Glassdoor (`fromAge`, `srs`), ZipRecruiter (`days`, `sort_by_date`), and Dice (`filters.postedDate`, `filters.sortBy`).
- Added 8 role packs including max-coverage (40+ titles) and focused packs for software, AI/ML, data, cloud, QA, and product.
- Expanded related-title groups from 9 to 22, covering security, Salesforce, IT, DBA, solutions architect, agile, and technical writing.
- Added Company and Sponsor Search section with filters for industry, sponsor tier, and employer type.
- Added Top H1B Sponsors chip grid (top 60 direct employers by filing count).
- Added 8 new portals: Handshake, Simplify, HiringCafe, Wellfound, RippleMatch, WayUp, Levels.fyi, MyVisaJobs.
- Added company search functions: open careers page, LinkedIn with company + role, Indeed with company + role.
