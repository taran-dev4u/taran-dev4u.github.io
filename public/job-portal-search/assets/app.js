"use strict";

// ── COMPANY DATA ─────────────────────────────────────────────────────────────
// Auto-generated from H1B Company list.xlsx
// Direct employers - top 500
const SPONSOR_COMPANY_ROWS = [
  { name: 'Amazon.com Services LLC', filings: 731, kind: 'direct', tier: 'top', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.amazon.jobs/', aliases: '' },
  { name: 'Meta Platforms, Inc', filings: 533, kind: 'direct', tier: 'top', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.metacareers.com/', aliases: '' },
  { name: 'Google LLC', filings: 488, kind: 'direct', tier: 'strong', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://careers.google.com/', aliases: '' },
  { name: 'Fidelity Technology Group, LLC d/b/a Fidelity Investments', filings: 374, kind: 'direct', tier: 'strong', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://jobs.fidelity.com/', aliases: '' },
  { name: 'JPMorgan Chase & Co', filings: 301, kind: 'direct', tier: 'strong', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://careers.jpmorgan.com/', aliases: '' },
  { name: 'Apple Inc', filings: 288, kind: 'direct', tier: 'strong', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://jobs.apple.com/', aliases: '' },
  { name: 'Mphasis Corporation', filings: 257, kind: 'direct', tier: 'strong', category: 'Consulting and Services', tags: ["consulting"], careersUrl: 'https://careers.mphasis.com/', aliases: '' },
  { name: 'LinkedIn Corporation', filings: 215, kind: 'direct', tier: 'strong', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://careers.linkedin.com/', aliases: '' },
  { name: 'WAL-MART ASSOCIATES, INC', filings: 190, kind: 'direct', tier: 'moderate', category: 'Retail and Consumer', tags: ["other"], careersUrl: 'https://careers.walmart.com/', aliases: '' },
  { name: 'Amazon Development Center U.S., Inc', filings: 124, kind: 'direct', tier: 'moderate', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.amazon.jobs/', aliases: '' },
  { name: 'IBM Corporation', filings: 124, kind: 'direct', tier: 'moderate', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.ibm.com/employment/', aliases: '' },
  { name: 'PayPal, Inc', filings: 117, kind: 'direct', tier: 'moderate', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://careers.pypl.com/', aliases: '' },
  { name: 'U.S. Bank National Association', filings: 107, kind: 'direct', tier: 'moderate', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://www.usbank.com/careers.html', aliases: '' },
  { name: 'Amazon Web Services, Inc', filings: 107, kind: 'direct', tier: 'moderate', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://aws.amazon.com/careers/', aliases: '' },
  { name: 'LTIMindtree Limited', filings: 101, kind: 'direct', tier: 'moderate', category: 'Consulting and Services', tags: ["consulting"], careersUrl: 'https://www.ltimindtree.com/careers/', aliases: '' },
  { name: 'NVIDIA Corporation', filings: 101, kind: 'direct', tier: 'moderate', category: 'AI and Data', tags: ["tech", "ai"], careersUrl: 'https://www.nvidia.com/en-us/about-nvidia/careers/', aliases: '' },
  { name: 'J.B. Hunt Transport, Inc', filings: 86, kind: 'direct', tier: 'moderate', category: 'Logistics and Industrial', tags: ["other"], careersUrl: 'https://www.jbhunt.com/careers/', aliases: '' },
  { name: 'Qualcomm Technologies, Inc', filings: 85, kind: 'direct', tier: 'moderate', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.qualcomm.com/company/careers', aliases: '' },
  { name: 'Adobe Inc', filings: 83, kind: 'direct', tier: 'moderate', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://www.adobe.com/careers.html', aliases: '' },
  { name: 'eBay Inc', filings: 79, kind: 'direct', tier: 'moderate', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://careers.ebayinc.com/', aliases: '' },
  { name: 'General Motors', filings: 75, kind: 'direct', tier: 'moderate', category: 'Automotive and Mobility', tags: ["other"], careersUrl: 'https://careers.gm.com/', aliases: '' },
  { name: 'WELLS FARGO BANK, N.A', filings: 73, kind: 'direct', tier: 'moderate', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://www.wellsfargo.com/about/careers/', aliases: '' },
  { name: 'Intuit Inc', filings: 68, kind: 'direct', tier: 'moderate', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://careers.intuit.com/', aliases: '' },
  { name: 'Expedia, Inc', filings: 68, kind: 'direct', tier: 'moderate', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://lifeatexpedia.com/', aliases: '' },
  { name: 'Intel Corporation', filings: 67, kind: 'direct', tier: 'moderate', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://jobs.intel.com/', aliases: '' },
  { name: 'ServiceNow, Inc', filings: 67, kind: 'direct', tier: 'moderate', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://careers.servicenow.com/', aliases: '' },
  { name: 'Uber Technologies, Inc', filings: 66, kind: 'direct', tier: 'moderate', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.uber.com/us/en/careers/', aliases: '' },
  { name: 'Capgemini America Inc', filings: 64, kind: 'direct', tier: 'moderate', category: 'Consulting and Services', tags: ["consulting"], careersUrl: 'https://www.capgemini.com/careers/', aliases: '' },
  { name: 'CGI Technologies and Solutions Inc', filings: 62, kind: 'direct', tier: 'moderate', category: 'Consulting and Services', tags: ["consulting"], careersUrl: 'https://www.cgi.com/en/careers', aliases: '' },
  { name: 'FORD MOTOR COMPANY', filings: 61, kind: 'direct', tier: 'moderate', category: 'Automotive and Mobility', tags: ["other"], careersUrl: 'https://careers.ford.com/', aliases: '' },
  { name: 'Tesla, Inc', filings: 60, kind: 'direct', tier: 'moderate', category: 'Automotive and Mobility', tags: ["other"], careersUrl: 'https://www.tesla.com/careers', aliases: '' },
  { name: 'Lowe\'s Companies, Inc', filings: 60, kind: 'direct', tier: 'moderate', category: 'Retail and Consumer', tags: ["other"], careersUrl: 'https://jobs.lowes.com/', aliases: '' },
  { name: 'Citibank, N.A', filings: 58, kind: 'direct', tier: 'moderate', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://jobs.citi.com/', aliases: '' },
  { name: 'Oracle America, Inc', filings: 56, kind: 'direct', tier: 'moderate', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.oracle.com/careers/', aliases: '' },
  { name: 'Salesforce, Inc', filings: 54, kind: 'direct', tier: 'moderate', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.salesforce.com/company/careers/', aliases: '' },
  { name: 'FIS Management Services, LLC', filings: 52, kind: 'direct', tier: 'moderate', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://careers.fisglobal.com/', aliases: '' },
  { name: 'CVS Pharmacy Inc', filings: 51, kind: 'direct', tier: 'moderate', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: 'https://jobs.cvshealth.com/', aliases: '' },
  { name: 'DoorDash, Inc', filings: 51, kind: 'direct', tier: 'moderate', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://careers.doordash.com/', aliases: '' },
  { name: 'The MathWorks, Inc', filings: 51, kind: 'direct', tier: 'moderate', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://www.mathworks.com/company/jobs/', aliases: '' },
  { name: 'Charter Communications, Inc', filings: 50, kind: 'direct', tier: 'moderate', category: 'Telecom and Media', tags: ["other"], careersUrl: 'https://jobs.spectrum.com/', aliases: '' },
  { name: 'Netflix, Inc', filings: 48, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://jobs.netflix.com/', aliases: '' },
  { name: 'Snowflake Inc', filings: 48, kind: 'direct', tier: 'curated', category: 'AI and Data', tags: ["tech", "ai"], careersUrl: 'https://careers.snowflake.com/', aliases: '' },
  { name: 'SNAP INC', filings: 47, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://careers.snap.com/', aliases: '' },
  { name: 'Capital One Services, LLC', filings: 44, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://www.capitalonecareers.com/', aliases: '' },
  { name: 'First Citizens Bank and Trust Co', filings: 44, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://careers.firstcitizens.com/', aliases: '' },
  { name: 'Pinterest, Inc', filings: 43, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.pinterestcareers.com/', aliases: '' },
  { name: 'Truist Bank', filings: 43, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://careers.truist.com/', aliases: '' },
  { name: 'Optum Services, Inc', filings: 42, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: 'https://careers.unitedhealthgroup.com/', aliases: '' },
  { name: 'Indeed, Inc', filings: 42, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://www.indeed.com/about/careers', aliases: '' },
  { name: 'CVS Shared Services Resources LLC', filings: 41, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Microsoft Corporation', filings: 40, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://careers.microsoft.com/', aliases: '' },
  { name: 'Columbia University', filings: 39, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://hr.columbia.edu/jobs', aliases: '' },
  { name: 'American Express Travel Related Services Company, Inc', filings: 38, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://aexp.eightfold.ai/careers', aliases: '' },
  { name: 'Home Depot Management Company LLC', filings: 37, kind: 'direct', tier: 'curated', category: 'Retail and Consumer', tags: ["other"], careersUrl: 'https://careers.homedepot.com/', aliases: '' },
  { name: 'Humana Inc', filings: 37, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: 'https://careers.humana.com/', aliases: '' },
  { name: 'Federal Express Corporation', filings: 37, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://careers.fedex.com/', aliases: '' },
  { name: 'TikTok Inc', filings: 36, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://careers.tiktok.com/', aliases: '' },
  { name: 'TECH MAHINDRA (AMERICAS), INC', filings: 36, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: 'https://careers.techmahindra.com/', aliases: '' },
  { name: 'Atlassian US, Inc', filings: 35, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.atlassian.com/company/careers', aliases: '' },
  { name: 'Hexaware Technologies, Inc', filings: 34, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: 'https://hexaware.com/careers/', aliases: '' },
  { name: 'Barclays Services Corp', filings: 34, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://home.barclays/careers/', aliases: '' },
  { name: 'Workday, Inc', filings: 34, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.workday.com/en-us/company/careers.html', aliases: '' },
  { name: 'Mastercard Technologies, LLC', filings: 33, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://careers.mastercard.com/', aliases: '' },
  { name: 'BYTEDANCE INC', filings: 32, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://jobs.bytedance.com/', aliases: '' },
  { name: 'Cisco Systems, Inc', filings: 32, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://jobs.cisco.com/', aliases: '' },
  { name: 'Concentrix CVG Customer Management Group Inc', filings: 31, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: 'https://careers.concentrix.com/', aliases: '' },
  { name: 'Equifax Inc', filings: 31, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://careers.equifax.com/', aliases: '' },
  { name: 'Yale University', filings: 31, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://www.yale.edu/about-yale/careers-yale', aliases: '' },
  { name: 'OpenAI OpCo, LLC', filings: 29, kind: 'direct', tier: 'curated', category: 'AI and Data', tags: ["tech", "ai"], careersUrl: 'https://openai.com/careers/', aliases: '' },
  { name: 'Docusign Inc', filings: 29, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.docusign.com/company/careers', aliases: '' },
  { name: 'Caremark LLC', filings: 28, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Charter Communications Inc', filings: 27, kind: 'direct', tier: 'curated', category: 'Telecom and Media', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Amazon Data Services, Inc', filings: 27, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud", "data"], careersUrl: 'https://www.amazon.jobs/', aliases: '' },
  { name: 'Waymo LLC', filings: 27, kind: 'direct', tier: 'curated', category: 'Automotive and Mobility', tags: ["other"], careersUrl: 'https://waymo.com/careers/', aliases: '' },
  { name: 'Chewy, Inc', filings: 27, kind: 'direct', tier: 'curated', category: 'Retail and Consumer', tags: ["other"], careersUrl: 'https://careers.chewy.com/', aliases: '' },
  { name: 'HubSpot, Inc', filings: 26, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.hubspot.com/careers', aliases: '' },
  { name: 'Databricks, Inc', filings: 26, kind: 'direct', tier: 'curated', category: 'AI and Data', tags: ["tech", "ai", "data"], careersUrl: 'https://www.databricks.com/company/careers', aliases: '' },
  { name: 'TATA CONSULTANCY SERVICES LIMITED', filings: 26, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: 'https://www.tcs.com/careers', aliases: '' },
  { name: 'TikTok U.S. Data Security Inc', filings: 26, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud", "data"], careersUrl: '', aliases: '' },
  { name: 'The Leland Stanford, Jr University', filings: 26, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://careers.stanford.edu/', aliases: '' },
  { name: 'Bloomberg L.P', filings: 25, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://www.bloomberg.com/careers/', aliases: '' },
  { name: 'Stripe, Inc', filings: 24, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://stripe.com/jobs', aliases: '' },
  { name: 'Costco Wholesale Corporation', filings: 24, kind: 'direct', tier: 'curated', category: 'Retail and Consumer', tags: ["other"], careersUrl: 'https://www.costco.com/jobs.html', aliases: '' },
  { name: 'AUDIBLE, INC', filings: 24, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://www.audiblecareers.com/', aliases: '' },
  { name: 'GlobalLogic Inc', filings: 23, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: 'https://www.globallogic.com/careers/', aliases: '' },
  { name: 'UBS Business Solutions US LLC', filings: 23, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://www.ubs.com/global/en/careers.html', aliases: '' },
  { name: 'FedEx Freight, Inc', filings: 22, kind: 'direct', tier: 'curated', category: 'Logistics and Industrial', tags: ["other"], careersUrl: 'https://careers.fedex.com/', aliases: '' },
  { name: 'ADP Technology Services, Inc', filings: 22, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: 'https://jobs.adp.com/', aliases: '' },
  { name: 'Qualcomm Innovation Center, Inc', filings: 22, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://www.qualcomm.com/company/careers', aliases: '' },
  { name: 'PERSISTENT SYSTEMS, INC', filings: 21, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: 'https://www.persistent.com/careers/', aliases: '' },
  { name: 'ASML US, LP', filings: 21, kind: 'direct', tier: 'curated', category: 'Hardware and Semiconductors', tags: ["tech", "ai"], careersUrl: 'https://www.asml.com/en/careers', aliases: '' },
  { name: 'Deere & Company', filings: 21, kind: 'direct', tier: 'curated', category: 'Logistics and Industrial', tags: ["other"], careersUrl: 'https://www.deere.com/en/our-company/careers/', aliases: '' },
  { name: 'Massachusetts Institute of Technology', filings: 21, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: 'https://careers.mit.edu/', aliases: '' },
  { name: 'Tiger Analytics, Inc', filings: 20, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["data", "consulting"], careersUrl: 'https://www.tigeranalytics.com/careers/', aliases: '' },
  { name: 'AIRBNB, INC', filings: 20, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: 'https://careers.airbnb.com/', aliases: '' },
  { name: 'UT Southwestern Medical Center', filings: 20, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: 'https://utswmed.org/jobs/', aliases: '' },
  { name: 'Coinbase, Inc', filings: 20, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: 'https://www.coinbase.com/careers', aliases: '' },
  { name: 'Moody\'s Analytics, Inc', filings: 19, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech", "data"], careersUrl: '', aliases: '' },
  { name: 'Rocket Mortgage, LLC', filings: 19, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'PERSISTENT SYSTEMS LIMITED', filings: 19, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Aetna Resources LLC', filings: 19, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Docusign, Inc', filings: 18, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'Roblox Corporation', filings: 18, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Social Finance, LLC', filings: 18, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Citizens Financial Group, Inc', filings: 18, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'RELX, Inc', filings: 18, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Barclays Services LLC', filings: 18, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'SONY INTERACTIVE ENTERTAINMENT LLC', filings: 18, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Reddit, Inc', filings: 17, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'Zoox, Inc', filings: 17, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Qualcomm Atheros, Inc', filings: 17, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: '7-Eleven, Inc', filings: 17, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Cummins Inc', filings: 17, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Emory University', filings: 16, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'F5, Inc', filings: 16, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'CARIAD, Inc', filings: 16, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Annapurna Labs (U.S.) Inc', filings: 16, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'University of Michigan', filings: 16, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'NIKE, Inc', filings: 16, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Zoox Inc', filings: 16, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'NYU Grossman School of Medicine', filings: 15, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Northern Trust Company', filings: 15, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Penske Truck Leasing Co LP', filings: 15, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Capital One, National Association', filings: 15, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'Paycom Payroll, LLC', filings: 15, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'BANK OF AMERICA N.A', filings: 15, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'Delta Air Lines, Inc', filings: 15, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Axon Enterprise, Inc', filings: 15, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'BEST BUY CO., INC', filings: 15, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Comcast Cable Communications, LLC', filings: 15, kind: 'direct', tier: 'curated', category: 'Telecom and Media', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'CitiusTech Inc', filings: 15, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'Crusoe Energy Systems, Inc', filings: 14, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Lawrence Livermore National Security, LLC', filings: 14, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Motorola Solutions, Inc', filings: 14, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Asurion, LLC', filings: 14, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Fortinet, Inc', filings: 14, kind: 'direct', tier: 'curated', category: 'Cybersecurity', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Northwestern Mutual Life Insurance Company', filings: 14, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Autodesk, Inc', filings: 14, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Zions Bancorporation, N.A', filings: 14, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The PNC Financial Services Group, Inc', filings: 14, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Discover Products Inc', filings: 14, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'Dell USA L.P', filings: 13, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Visa Technology & Operations LLC', filings: 13, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'Visa U.S.A. Inc', filings: 13, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'Wayfair LLC', filings: 13, kind: 'direct', tier: 'curated', category: 'Retail and Consumer', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Palo Alto Networks, Inc', filings: 13, kind: 'direct', tier: 'curated', category: 'Cybersecurity', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'PamTen, Inc', filings: 13, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'ADAEQUARE INC', filings: 13, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Memorial Sloan Kettering Cancer Center', filings: 13, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'ATOS SYNTEL INC', filings: 13, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'United Services Automobile Association', filings: 12, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Medtronic, Inc', filings: 12, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Tinder LLC', filings: 12, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'CBRE, INC', filings: 12, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The University of Virginia', filings: 12, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Credit Karma, LLC', filings: 12, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Robinhood Markets, Inc', filings: 12, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Akamai Technologies, Inc', filings: 12, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech", "ai"], careersUrl: '', aliases: '' },
  { name: 'Zappos.com LLC', filings: 12, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'LexisNexis Risk Solutions, Inc', filings: 12, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Purdue University', filings: 12, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Travelers Indemnity Company', filings: 11, kind: 'direct', tier: 'curated', category: 'Insurance', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'University of Illinois', filings: 11, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'THE UNIVERSITY OF TEXAS M.D. ANDERSON CANCER CENTER', filings: 11, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Two Sigma Investments, LP', filings: 11, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Cotiviti, Inc', filings: 11, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Unity Technologies SF', filings: 11, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'KLA Corporation', filings: 11, kind: 'direct', tier: 'curated', category: 'Hardware and Semiconductors', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Bank of New York Mellon', filings: 11, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Ameriprise Financial, Inc', filings: 11, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Amgen Inc', filings: 11, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'National Charitable Services LLC d/b/a Fidelity Investments', filings: 11, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'Orion Systems Integrators LLC', filings: 11, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'NetApp, Inc', filings: 11, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Upstart Network, Inc', filings: 11, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The University of Iowa', filings: 11, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Qualtrics, LLC', filings: 11, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'University of Maryland College Park', filings: 11, kind: 'direct', tier: 'curated', category: 'Logistics and Industrial', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'INFOSYS LIMITED', filings: 10, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'United Wholesale Mortgage, LLC', filings: 10, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'NAGARRO, INC', filings: 10, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Macy\'s Systems & Technology, Inc', filings: 10, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Bayer Research and Development Services LLC', filings: 10, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Hartford Fire Insurance Company', filings: 10, kind: 'direct', tier: 'curated', category: 'Automotive and Mobility', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Guidewire Software, Inc', filings: 10, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Aptiv US Services General Partnership', filings: 10, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'H-E-B, LP', filings: 10, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'ST. JUDE CHILDREN\'S RESEARCH HOSPITAL', filings: 10, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Zoom Communications, Inc', filings: 10, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'Advanced Micro Devices, Inc', filings: 10, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Wolters Kluwer DXG U.S., Inc', filings: 10, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'AutoZone, Inc', filings: 10, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'DK Crown Holdings Inc', filings: 10, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'ACE American Insurance Company', filings: 10, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'IQVIA RDS Inc', filings: 10, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Siemens Industry Software Inc', filings: 9, kind: 'direct', tier: 'curated', category: 'Logistics and Industrial', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Experian Information Solutions, Inc', filings: 9, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Rokt US Corp', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Depository Trust & Clearing Corporation', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Resolve AI, Inc', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Prudential Insurance Company of America', filings: 9, kind: 'direct', tier: 'curated', category: 'Insurance', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'S.W.I.F.T., Inc', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Ohio State University', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Boston Consulting Group, Inc', filings: 9, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Cadence Design Systems, Inc', filings: 9, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Teladoc Health Inc', filings: 9, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'CITADEL ENTERPRISE AMERICAS SERVICES LLC', filings: 9, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Epsilon Data Management LLC', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech", "data"], careersUrl: '', aliases: '' },
  { name: 'Deloitte Services LP', filings: 9, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Applied Intuition, Inc', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'WGU Corporation', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Aurora Operations, Inc', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Nokia of America Corporation', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Hewlett Packard Enterprise Company', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Virginia Polytechnic Institute & State University', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Lawrence Berkeley National Laboratory', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Global Payment Holding Company', filings: 9, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'PURE STORAGE, INC', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Government Employee Insurance Company (GEICO)', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Marriott International, Inc', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'M&T Bank', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Arizona State University', filings: 9, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Lucid USA, Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Automotive and Mobility', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'VIRTUSA CORPORATION', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Southwest Airlines Co', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Guardian Life Insurance Company of America', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Progressive Casualty Insurance Company', filings: 8, kind: 'direct', tier: 'curated', category: 'Insurance', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Publix Super Markets, Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'COMTEC CONSULTANTS INC', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Coupang Global LLC', filings: 8, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Safeway Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Klaviyo, Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'National Railroad Passenger Corporation', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'General Hospital Corporation', filings: 8, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'TikTok USDS Joint Venture LLC', filings: 8, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'Maplebear Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'FactSet Research Systems Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Intuites LLC', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Corewell Health', filings: 8, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Dropbox, Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'The Vanguard Group, Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'Meijer Great Lakes Limited Partnership', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'McKesson Corporation', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'EPAM Systems Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Johns Hopkins University', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'SEATTLE CHILDREN\'S HOSPITAL', filings: 8, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Environmental Systems Research Institute, Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Figma, Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Zscaler, Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Twilio, Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'Mayo Clinic', filings: 8, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Point72, L.P', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'TRUSTEES OF BOSTON UNIVERSITY', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Millennium Software, Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'United Parcel Service General Services, Co', filings: 8, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Okta, Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'Deloitte Tax LLP', filings: 8, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'UT-BATTELLE, LLC (OAK RIDGE NATIONAL LABORATORY)', filings: 8, kind: 'direct', tier: 'curated', category: 'Logistics and Industrial', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'ServiceTitan, Inc', filings: 8, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Duolingo, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'University of Texas Health Science Center at San Antonio', filings: 7, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Moody\'s Investors Service, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Insight Direct USA, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Elevance Health, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Rivian and Volkswagen Group Technologies, LLC', filings: 7, kind: 'direct', tier: 'curated', category: 'Automotive and Mobility', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Walgreen Co', filings: 7, kind: 'direct', tier: 'curated', category: 'Retail and Consumer', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Western Union, LLC', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Liberty Mutual Technology Group Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Insurance', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'AppFolio Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'SIRIUS XM RADIO LLC', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Caterpillar Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Logistics and Industrial', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'SPOTIFY USA, INC', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Cohesity, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Adyen N.V', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'ExlService.com, LLC', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Affirm, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'TORC Robotics, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Teradata Operations, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech", "data"], careersUrl: '', aliases: '' },
  { name: 'American Airlines, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Inovalon, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Colorado State University', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Netskope, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Ancestry.com Operations Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Paychex North America Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Arm, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Chan Zuckerberg Biohub, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Notion Labs, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Block, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'MOBIREY LLC', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Brillio, LLC', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Staples, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Thumbtack, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Fujitsu North America, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Gen Digital Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Xmotors.Ai, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Riot Games, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'LYFT, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'DFS Corporate Services LLC', filings: 7, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Rackspace US, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Navy Federal Credit Union', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Red Hat, Inc', filings: 7, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Vitesco Technologies USA, LLC', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Box, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Delta Dental Of California', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'MetLife Group, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Insurance', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'The University of Chicago', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The University of Texas Health Science Center at Houston', filings: 6, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Raymond James & Associates, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Tredence Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Etsy, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Cedars-Sinai Medical Center', filings: 6, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["ai", "healthcare"], careersUrl: '', aliases: '' },
  { name: 'Whatnot Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Integral Ad Science, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Field AI, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Discord, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'The Chamberlain Group LLC', filings: 6, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'BROWN BROTHERS HARRIMAN & CO', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Schlumberger Technology Corporation', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Fireworks.ai, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Superhuman Platform Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Yahoo Holdings Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Kroger Company', filings: 6, kind: 'direct', tier: 'curated', category: 'Retail and Consumer', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Juniper Networks, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'COLLECTIVEHEALTH, INC', filings: 6, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'USG, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Airline Tariff Publishing Company (ATPCO)', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'MONGODB, INC', filings: 6, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'The Sherwin-Williams Company', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'CLOUDFLARE, INC', filings: 6, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'University of Pittsburgh', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Garmin International Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Worldpay, LLC', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Twitch Interactive, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'University of Texas Medical Branch', filings: 6, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Applied Materials, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Hardware and Semiconductors', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Nexterapath, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Sunbelt Rentals, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'FedEx Dataworks, Inc', filings: 6, kind: 'direct', tier: 'curated', category: 'Logistics and Industrial', tags: ["data"], careersUrl: '', aliases: '' },
  { name: 'Wellington Management Company LLP', filings: 6, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Lumen Technologies Service Group, LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Telecom and Media', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Snorkel AI, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Skill Voice Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Smartsheet, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Datadog, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud", "data"], careersUrl: '', aliases: '' },
  { name: 'Honeywell International Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Logistics and Industrial', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'People Center, Inc. d/b/a Rippling', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Clearwater Analytics, LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech", "data"], careersUrl: '', aliases: '' },
  { name: 'PARAMOUNT SOFTWARE SOLUTIONS INC', filings: 5, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Scale AI, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'AI and Data', tags: ["tech", "ai"], careersUrl: '', aliases: '' },
  { name: 'Wolters Kluwer United States Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'State Farm Mutual Automobile Insurance Company', filings: 5, kind: 'direct', tier: 'curated', category: 'Insurance', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Converse Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'HERE North America, LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Dow Jones and Company, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'ConsultAdd Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'StubHub, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Corporation Service Company', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Starbucks Coffee Company', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Accenture LLP', filings: 5, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'HP Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Peloton Interactive, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Cruise LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Automotive and Mobility', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'PPD Development, L.P', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Susquehanna International Group, LLP', filings: 5, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'HARVEY AI CORPORATION', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech", "ai"], careersUrl: '', aliases: '' },
  { name: 'Move Sales, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Cytel Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Discovery Communications, LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'Administrators of the Tulane Educational Fund', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'T. Rowe Price Associates, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'NORTHWELL HEALTH', filings: 5, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Laboratory Corporation of America Holdings', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Nuro, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'ROBERT BOSCH  LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Bill Me Later, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'BANDWIDTH, INC', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Genentech, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Qualcomm Incorporated', filings: 5, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'Arista Networks, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Research Institute at Nationwide Children\'s Hospital', filings: 5, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Massachusetts Mutual Life Insurance Company', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'COPART, INC', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The University of Alabama at Birmingham', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'CNH Industrial America LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'InMarket Media LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'GSK Solutions, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'MPG Operations LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Fiserv Solutions, LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'GRID DYNAMICS HOLDINGS, INC', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Together Computer, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Deloitte Consulting LLP', filings: 5, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'RIVIAN AUTOMOTIVE, LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Automotive and Mobility', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Athene Annuity and Life Company', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Fanatics Retail Group Fulfillment LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'C3.ai, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'AI and Data', tags: ["tech", "ai"], careersUrl: '', aliases: '' },
  { name: 'BorgWarner PDS (USA) Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'AvidXchange, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Research Foundation for the State University of New York', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Boston Scientific Corporation', filings: 5, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Relativity ODA LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Brex Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'General Motors Financial Company, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Automotive and Mobility', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'University of Washington', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Van Andel Research Institute', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Rubrik, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Petco Animal Supplies Stores, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Macy\'s Systems and Technology, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Vizient, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Amazon Advertising LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'Texas A&M University', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Mercor.io Corporation', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Texas Instruments Incorporated', filings: 5, kind: 'direct', tier: 'curated', category: 'Hardware and Semiconductors', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'American Bankers Insurance Company of Florida', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'BOR USGA obo Augusta University', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'KPIT Technologies, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Children\'s Hospital of Philadelphia', filings: 5, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'LexisNexis Risk Solutions Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Rocket Limited Partnership', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Lam Research Corporation', filings: 5, kind: 'direct', tier: 'curated', category: 'Hardware and Semiconductors', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'S&P Global Market Intelligence Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud", "data"], careersUrl: '', aliases: '' },
  { name: 'Verizon Data Services LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Telecom and Media', tags: ["data"], careersUrl: '', aliases: '' },
  { name: 'ULINE, Inc', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Ford Motor Credit Company LLC', filings: 5, kind: 'direct', tier: 'curated', category: 'Automotive and Mobility', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Cardinal Health', filings: 5, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Nationwide Mutual Insurance Company', filings: 5, kind: 'direct', tier: 'curated', category: 'Insurance', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'The Hertz Corporation', filings: 5, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Scott & White Health Plan', filings: 4, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Sentara Health', filings: 4, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'OCLC, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Regions Bank', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Northeastern University', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'PALANTIR TECHNOLOGIES INC', filings: 4, kind: 'direct', tier: 'curated', category: 'AI and Data', tags: ["tech", "ai"], careersUrl: '', aliases: '' },
  { name: 'Indiana University Indianapolis', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'DiDi Research America, LLC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Foundation Medicine, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Iowa State University of Science and Technology', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Fortrea Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'PACIFIC CONSULTANCY SERVICES LLC', filings: 4, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Navan, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Sephora USA, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Flatiron Health, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Flexera Global, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'PATREON, INC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'SHOPIFY (USA) INC', filings: 4, kind: 'direct', tier: 'curated', category: 'Retail and Consumer', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'RETOOL, INC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Dish Wireless LLC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Electronic Arts Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'IQVIA Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Ernst & Young U.S. LLP', filings: 4, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Insurance Services Office, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Rush University Medical Center', filings: 4, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'GoodLeap, LLC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'NCS Pearson, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'EvolutionIQ LLC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'SYSINTEL, INC', filings: 4, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud"], careersUrl: '', aliases: '' },
  { name: 'EAB Global, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'ProCare Pharmacy LLC', filings: 4, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'QXO, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Extreme Networks Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'FCA US LLC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'General Dynamics Information Technology, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Aerospace and Defense', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'HCA Management Services LP', filings: 4, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Duke University', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'PayPal Data Services, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Cloud and Big Tech', tags: ["tech", "cloud", "data"], careersUrl: '', aliases: '' },
  { name: 'FMR LLC d/b/a Fidelity Investments', filings: 4, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'FOL Management LLC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Parker Hannifin Corporation', filings: 4, kind: 'direct', tier: 'curated', category: 'Logistics and Industrial', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'Faire Wholesale, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'GREENSKY MANAGEMENT COMPANY LLC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Intuitive Surgical Operations, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Dolby Laboratories, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'GOCOOL INC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'RELEVANCE LAB, INC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'NBCUniversal Media, LLC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Saviynt, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'GSK SOLUTIONS INC', filings: 4, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'Cleveland Clinic Foundation', filings: 4, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'Deloitte & Touche LLP', filings: 4, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'MedHOK, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Attentive Mobile, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'LatentView Analytics Corporation', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech", "data"], careersUrl: '', aliases: '' },
  { name: 'University of California, Los Angeles', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'BANK OZK', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Mastercard International Incorporated', filings: 4, kind: 'direct', tier: 'curated', category: 'Fintech and Finance', tags: ["fintech"], careersUrl: '', aliases: '' },
  { name: 'Bean Infosystems LLC', filings: 4, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'McDonald\'s Corporation', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'McKinsey & Company, Inc. United States', filings: 4, kind: 'direct', tier: 'curated', category: 'Consulting and Services', tags: ["consulting"], careersUrl: '', aliases: '' },
  { name: 'The Simons Foundation Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'University of Oklahoma', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Methodist Hospital Research Institute', filings: 4, kind: 'direct', tier: 'curated', category: 'Health and Life Sciences', tags: ["healthcare"], careersUrl: '', aliases: '' },
  { name: 'California Institute of Technology', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Calix, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Jackson Laboratory', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'The Florida State University', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Centene Management Company, LLC', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Chime Financial, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Clari, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'University of Georgia', filings: 4, kind: 'direct', tier: 'curated', category: 'Enterprise Software', tags: ["tech"], careersUrl: '', aliases: '' },
  { name: 'Leidos, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Aerospace and Defense', tags: ["other"], careersUrl: '', aliases: '' },
  { name: 'T-Mobile USA, Inc', filings: 4, kind: 'direct', tier: 'curated', category: 'Telecom and Media', tags: ["other"], careersUrl: '', aliases: '' },
];

// Staffing vendors - top 200
const STAFFING_VENDOR_ROWS = [
  { name: 'COMPUNNEL SOFTWARE GROUP, INC', filings: 469, kind: 'staffing', tier: 'strong', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Grandison Management, Inc', filings: 403, kind: 'staffing', tier: 'strong', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'People Tech Group, Inc', filings: 370, kind: 'staffing', tier: 'strong', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'KFORCE INC', filings: 133, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'UST Global Inc', filings: 114, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'RANDSTAD DIGITAL, LLC', filings: 114, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'INNOVA SOLUTIONS, INC', filings: 89, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'MSR TECHNOLOGY GROUP LLC', filings: 85, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'V-Soft Consulting Group, INC', filings: 81, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'L&T Technology Services Limited', filings: 76, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Majestic IT Services Inc', filings: 65, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Infinite Computer Solutions, Inc', filings: 64, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'GP TECHNOLOGIES LLC', filings: 57, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SKILLTUNE TECHNOLOGIES INC', filings: 57, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Insight Global, LLC', filings: 54, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SYSTEM SOFT TECHNOLOGIES, LLC', filings: 53, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Populus Group LLC', filings: 50, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'RJ Systems Inc', filings: 50, kind: 'staffing', tier: 'moderate', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Mastech Digital Technologies, Inc', filings: 49, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'CORPORATE SOLUTIONS GENERAL INC', filings: 48, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'HCL GLOBAL SYSTEMS INC', filings: 47, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'INTRAEDGE, INC', filings: 44, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Quadrant Technologies LLC', filings: 44, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Avco Consulting, Inc', filings: 41, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ERP Analysts, Inc', filings: 40, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'HTC GLOBAL SERVICES INC', filings: 39, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SCHRILL TECHNOLOGIES INC', filings: 38, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Itek Info Inc', filings: 37, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SLK AMERICA INC', filings: 37, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Elite IT Technologies LLC', filings: 36, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'DENKEN SOLUTIONS, INC', filings: 34, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'DIGIPULSE TECHNOLOGIES, INC', filings: 32, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'PHOTON INFOTECH, INC', filings: 31, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'GOIN TECHNOLOGY, INC', filings: 31, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'NATSOFT CORPORATION', filings: 30, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SAGE IT INC', filings: 30, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Infogain Corporation', filings: 29, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Pyramid Consulting, Inc', filings: 29, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Tek Leaders Inc', filings: 27, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'APPLAB SYSTEMS INC', filings: 26, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'New Era Technology, LLC', filings: 26, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'PIONEER CONSULTING SERVICES LLC', filings: 26, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'INTELLECTT, INC', filings: 25, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Orpine Inc', filings: 25, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ARTIFICIAL INTELLIGENCE LLC', filings: 25, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'CLOUD ANALYTICS TECHNOLOGIES LLC', filings: 25, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'i-Link Solutions, Inc', filings: 25, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Verton Solutions Inc', filings: 25, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'VIRTUAL REALITY TECHNOLOGIES LLC', filings: 24, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'AI TECHNOLOGIES LLC', filings: 24, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Federal Soft Systems Inc', filings: 23, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Ventois, Inc', filings: 23, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ROBOTICS TECHNOLOGIES LLC', filings: 23, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Eliassen Group, LLC', filings: 23, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'DataEconomy, Inc', filings: 23, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'DGN Technologies, Inc', filings: 22, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'EDU INFOTECH INTERNATIONAL RESOURCES INC', filings: 22, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ValueMomentum, Inc', filings: 22, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Intellectt Inc', filings: 22, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Collaborate Solutions Inc', filings: 21, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Specs Inc', filings: 21, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Vastek Inc', filings: 21, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Experis US, LLC', filings: 20, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Management Health Systems, LLC', filings: 20, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Kyyba, Inc', filings: 20, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Sapphire Software Solutions, Inc', filings: 20, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'COGNIER INC', filings: 20, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Beacon Hill Solutions Group LLC', filings: 20, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Horizon International Trd. Inc', filings: 20, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Hire IT people, Inc', filings: 20, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'CyberSource Corporation', filings: 20, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'OneMain General Services Corporation', filings: 19, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'MITCHELL/MARTIN, INC', filings: 19, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Genesis Corp', filings: 19, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Idexcel Inc', filings: 19, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Strategic Staffing Solutions, L.C', filings: 19, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ZIFO TECHNOLOGIES, INC', filings: 19, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'RPA TECHNOLOGIES LLC', filings: 19, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'CareSource Management Services, LLC', filings: 19, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'TECHPRO SOLUTIONS, INC', filings: 19, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Epitec, Inc', filings: 18, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SQUAD SOFTWARE, INC', filings: 18, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Northstar Group, Inc', filings: 18, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SAVVY INFO SYSTEMS INC', filings: 18, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SIGMA SOFTWARE LLC', filings: 18, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Appridat Solutions LLC', filings: 18, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'JEAN MARTIN INC', filings: 18, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Leland Stanford Jr. Univ/SLAC National Accelerator Lab', filings: 18, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Artech, LLC', filings: 18, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Iris Software, Inc', filings: 17, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'BRAINS TECHNOLOGY SOLUTIONS, INC', filings: 17, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'IPOLARITY LLC', filings: 17, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SATIN SOLUTIONS LLC', filings: 17, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SAP Labs, LLC', filings: 17, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'TANISHA SYSTEMS INC', filings: 17, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'RJT Compuquest Inc. dba Apolis', filings: 17, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Headstrong Services LLC', filings: 17, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Akkodis, Inc', filings: 17, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Avani Technology Solutions, Inc', filings: 17, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Zensar Technologies, Inc', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'New York Technology Partners Inc', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Innovative Consulting Solutions LLC', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ROBOTICS STAFFING LLC', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ARTIFINT TECHNOLOGIES LLC', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Collabrium Systems, LLC', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Sandisk Technologies, Inc', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Pentangle Tech Services LLC', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: '3i INFOTECH INC', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ARTIFICIAL INTELLIGENCE STAFFING LLC', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SWANKTEK INC', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Camelot Integrated Solutions Inc', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Hector Systems Inc', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Career Soft Solutions Inc', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Ascendion, Inc. (Formerly known as Collabera, Inc.)', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Eversoft Technologies LLC', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Acetech Group Corporation', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SDH Systems LLC', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Tek Labs, Inc', filings: 16, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Fox Cable Network Services, LLC', filings: 15, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'MAHAUGHA LLC', filings: 15, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Marlabs LLC', filings: 15, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'TAVANT TECHNOLOGIES, INC', filings: 15, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SRI Tech Solutions Inc', filings: 15, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Kelly Services, Inc', filings: 15, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ETOUCH SYSTEMS CORPORATION', filings: 15, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Tech Tammina, LLC', filings: 15, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Vitosha Inc', filings: 15, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Asta CRS, Inc', filings: 15, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Isolve Technology Inc', filings: 15, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ECONTENTI INC', filings: 15, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'DATAEDGE, INC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'DREAM Venture Labs Inc', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'MIRACLE SOFTWARE SYSTEMS, INC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SAPPHIRE SOFTWARE SOLUTIONS INC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'NobleSoft Solutions, Inc', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SRI Tech Solutions, Inc', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Tekaccel Inc', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ASTIR IT SOLUTIONS, INC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Adroix Corp', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Novamegha LLC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'NEON IT LLC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Softworld Technologies LLC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'COVANT SOLUTIONS, INC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Megan Soft, Inc', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ECCLESIASTES, INC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Wingskyline Technologies Inc', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'EFICENS SYSTEMS INC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Walbrydge Technologies Inc', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'INVOLGIXS INC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'E-GIANTS TECHNOLOGIES LLC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'VENTURESOFT GLOBAL INC', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Saipsit, Inc', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Numann Technologies, Inc', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Apex-2000 Inc', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Relevantz Technology Services, Inc', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Western Digital Technologies, Inc', filings: 14, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Infocons Inc', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Ana-Data Consulting, Inc', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'O3 TECHNOLOGY SOLUTIONS LLC', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'SAI TECHNOLOGIES, LLC', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Veridic Solutions LLC', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Meghaz Inc', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'PYRAMID TECHNOLOGY SOLUTIONS, INC', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'XORIANT CORPORATION', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'INTELENT INC (f.k.a SILICON STAFF IT SERVICES INC)', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'P2P SOFTTEK LLC', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Auger Inc', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'OKBL USA Technology Inc', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'IMR SOFT LLC', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Total System Services LLC', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Caresoft Technologies Inc', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Cigniti Technologies, Inc', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Dexian, LLC', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Gainwell Technologies LLC', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'DONATO TECHNOLOGIES INC', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'FUSION LIFE SCIENCES TECHNOLOGIES LLC', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Computer Sciences Corporation', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'TECHNOSOFT CORPORATION', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Tata Technologies, Inc', filings: 13, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Bioinfo Systems, LLC', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Technumen, Inc', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Zeus Solutions Inc', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Bitwise Inc', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Hitachi Digital Services LLC', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Quest IT Solutions Inc', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'L&T Technology Services LLC', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ACEINTEGRATOR INC', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Strategic Systems, Inc', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Willsfly Technologies Inc', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Metrix IT Solutions INC', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'iTech US, Inc', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Lead IT Corporation', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'iPivot LLC', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'TT TECHNOLOGIES INC', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'MYTHRI CONSULTING LLC', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'AMZUR TECHNOLOGIES, INC', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Nisum Technologies Inc', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'Optimal Technologies, Inc', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'ADVITHRI TECHNOLOGIES LLC', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
  { name: 'HITECK SOLUTIONS INC', filings: 12, kind: 'staffing', tier: 'curated', category: 'Staffing Vendors', tags: ["staffing", "tech"], careersUrl: '', aliases: '' },
];

// ── CATEGORIES ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "Direct ATS",
  "General Boards",
  "Remote Boards",
  "Startup and Tech",
  "Public and Nonprofit",
  "Company Career Pages"
];

// ── PORTAL ROWS ───────────────────────────────────────────────────────────────
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
  { id: "glassdoor", name: "Glassdoor", category: "General Boards", sites: ["glassdoor.com/job-listing"], native: "glassdoor", priority: 7 },
  { id: "ziprecruiter", name: "ZipRecruiter", category: "General Boards", sites: ["ziprecruiter.com/jobs"], native: "ziprecruiter", priority: 7 },
  { id: "monster", name: "Monster", category: "General Boards", sites: ["monster.com/job-openings"], priority: 5 },
  { id: "careerbuilder", name: "CareerBuilder", category: "General Boards", sites: ["careerbuilder.com/job"], priority: 5 },
  { id: "dice", name: "Dice", category: "General Boards", sites: ["dice.com/job-detail"], native: "dice", priority: 9 },
  { id: "talent", name: "Talent.com", category: "General Boards", sites: ["talent.com/view"], priority: 6 },
  { id: "simplyhired", name: "SimplyHired", category: "General Boards", sites: ["simplyhired.com/job"], priority: 5 },
  { id: "handshake", name: "Handshake", category: "General Boards", sites: ["joinhandshake.com/jobs"], priority: 8 },
  { id: "simplify", name: "Simplify", category: "General Boards", sites: ["simplify.jobs"], priority: 8 },
  { id: "hiringcafe", name: "HiringCafe", category: "General Boards", sites: ["hiring.cafe"], priority: 7 },
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
  { id: "rippleMatch", name: "RippleMatch", category: "Startup and Tech", sites: ["ripplmatch.com/jobs"], priority: 6 },
  { id: "wayup", name: "WayUp", category: "Startup and Tech", sites: ["wayup.com/gigs"], priority: 6 },
  { id: "levelsfyi", name: "Levels.fyi Jobs", category: "Startup and Tech", sites: ["levels.fyi/jobs"], priority: 7 },
  { id: "usajobs", name: "USAJobs", category: "Public and Nonprofit", sites: ["usajobs.gov/job"], native: "usajobs", priority: 6 },
  { id: "idealist", name: "Idealist", category: "Public and Nonprofit", sites: ["idealist.org/en/job"], priority: 5 },
  { id: "higheredjobs", name: "HigherEdJobs", category: "Public and Nonprofit", sites: ["higheredjobs.com/admin/details.cfm", "higheredjobs.com/faculty/details.cfm"], priority: 5 },
  { id: "governmentjobs", name: "GovernmentJobs", category: "Public and Nonprofit", sites: ["governmentjobs.com/careers"], priority: 5 },
  { id: "unjobs", name: "UN Jobs", category: "Public and Nonprofit", sites: ["unjobs.org/vacancies"], priority: 4 },
  { id: "myvisajobs", name: "MyVisaJobs", category: "Public and Nonprofit", sites: ["myvisajobs.com/Search_H1B_Cap_Exempt_Jobs.aspx"], priority: 6 },
  { id: "careersSubdomain", name: "Careers Subdomains", category: "Company Career Pages", rawSiteQuery: "(site:careers.* OR site:*/careers/* OR site:*/career/*)", priority: 7 },
  { id: "jobsSubdomain", name: "Jobs Subdomains", category: "Company Career Pages", rawSiteQuery: "(site:jobs.* OR site:*/jobs/* OR site:*/job/*)", priority: 7 },
  { id: "talentSubdomain", name: "Talent Pages", category: "Company Career Pages", rawSiteQuery: "(site:talent.* OR site:people.* OR site:*/talent/*)", priority: 6 },
  { id: "joinPages", name: "Join Us Pages", category: "Company Career Pages", rawSiteQuery: "(site:*/join-us/* OR site:*/work-with-us/* OR site:*/opportunities/* OR site:*/openings/*)", priority: 6 },
  { id: "notion", name: "Notion Career Pages", category: "Company Career Pages", sites: ["notion.site"], priority: 5 }
];

// ── ROLE PACKS ────────────────────────────────────────────────────────────────
const ROLE_PACKS = [
  { id: "all-role-families", label: "All Target Role Families – Max Coverage",
    primary: "Software Engineer",
    titles: ["Software Engineer","Software Developer","Full Stack Developer","Frontend Developer","Backend Developer","DevOps Engineer","Site Reliability Engineer","Platform Engineer","Data Engineer","Data Analyst","Analytics Engineer","Data Scientist","Business Intelligence Analyst","Power BI Developer","Machine Learning Engineer","AI Engineer","MLOps Engineer","Cloud Engineer","QA Engineer","SDET","Automation Engineer","Cybersecurity Analyst","Security Engineer","SOC Analyst","GRC Analyst","Product Manager","Product Analyst","Business Analyst","Systems Analyst","Salesforce Administrator","IT Analyst","IT Support Specialist","Help Desk Analyst","Network Engineer","Database Administrator","Scrum Master","Agile Coach","Technical Writer","UX Designer","UI Designer","Project Manager","Program Manager","Solutions Architect","Enterprise Architect"],
    query: "" },
  { id: "software-ai-data", label: "Software / AI / Data",
    primary: "Software Engineer",
    titles: ["Software Engineer","Data Engineer","Data Scientist","Machine Learning Engineer","AI Engineer","Data Analyst","Analytics Engineer"],
    query: "" },
  { id: "software-engineering", label: "Software Engineering",
    primary: "Software Engineer",
    titles: ["Software Engineer","Software Developer","Full Stack Developer","Frontend Developer","Backend Developer","Platform Engineer"],
    query: "" },
  { id: "ai-ml", label: "AI / ML",
    primary: "Machine Learning Engineer",
    titles: ["Machine Learning Engineer","AI Engineer","MLOps Engineer","Data Scientist","Research Scientist","Applied Scientist"],
    query: "" },
  { id: "data-analytics", label: "Data / Analytics",
    primary: "Data Analyst",
    titles: ["Data Analyst","Analytics Engineer","Business Intelligence Analyst","Data Engineer","Power BI Developer","Reporting Analyst","Data Scientist"],
    query: "" },
  { id: "cloud-devops", label: "Cloud / DevOps",
    primary: "Cloud Engineer",
    titles: ["Cloud Engineer","DevOps Engineer","Site Reliability Engineer","Platform Engineer","Infrastructure Engineer","Solutions Architect"],
    query: "" },
  { id: "qa-sdet", label: "QA / SDET",
    primary: "QA Engineer",
    titles: ["QA Engineer","SDET","Automation Engineer","Quality Assurance Engineer","Test Engineer","QA Analyst"],
    query: "" },
  { id: "product-analyst", label: "Product / Data Analyst",
    primary: "Product Analyst",
    titles: ["Product Analyst","Product Manager","Business Analyst","Data Analyst","Systems Analyst","Growth Analyst"],
    query: "" }
];

// ── RELATED TITLE GROUPS ──────────────────────────────────────────────────────
const RELATED_TITLE_GROUPS = [
  ["Software Engineer","Software Developer","Full Stack Developer","Frontend Developer","Backend Developer","Platform Engineer","Application Developer"],
  ["DevOps Engineer","Site Reliability Engineer","Cloud Engineer","Infrastructure Engineer","MLOps Engineer"],
  ["Data Engineer","Analytics Engineer","Data Pipeline Engineer","ETL Developer"],
  ["Data Analyst","Business Intelligence Analyst","Power BI Developer","Reporting Analyst","BI Analyst","Business Intelligence Developer"],
  ["Data Scientist","Machine Learning Engineer","AI Engineer","Research Scientist","Applied Scientist","Computational Scientist"],
  ["QA Engineer","SDET","Automation Engineer","Quality Assurance Engineer","Test Engineer","QA Analyst"],
  ["Cybersecurity Analyst","Security Engineer","SOC Analyst","GRC Analyst","Cloud Security Engineer","Application Security Engineer","Information Security Analyst"],
  ["Product Manager","Technical Product Manager","Product Owner"],
  ["Product Analyst","Growth Analyst","Strategy Analyst"],
  ["Business Analyst","Systems Analyst","Operations Analyst","Business Systems Analyst"],
  ["Salesforce Administrator","Salesforce Developer","Salesforce Consultant","CRM Analyst"],
  ["Network Engineer","Network Administrator","Systems Engineer","IT Infrastructure Engineer"],
  ["Database Administrator","Database Engineer","SQL Developer","Data Architect"],
  ["Project Manager","Program Manager","Delivery Manager","Scrum Master","Agile Coach"],
  ["IT Analyst","IT Support Specialist","Help Desk Analyst","IT Specialist","Desktop Support"],
  ["Solutions Architect","Enterprise Architect","Technical Architect","Cloud Architect"],
  ["UX Designer","UI Designer","Product Designer","Design Researcher","UX Researcher","Content Designer"],
  ["Financial Analyst","FP&A Analyst","Business Operations Analyst","Revenue Analyst"],
  ["Technical Writer","Documentation Specialist","Content Engineer"],
  ["Digital Marketing Specialist","Growth Marketer","SEO Specialist","Content Strategist","Lifecycle Marketing Manager","Social Media Manager"],
  ["Sales Development Representative","Account Executive","Customer Success Manager","Solutions Engineer","Revenue Operations Analyst"],
  ["HR Generalist","Recruiter","Talent Acquisition Specialist","People Operations Manager","Compensation Analyst"]
];

// ── OLDER OPTIONS & TIME OPTIONS ─────────────────────────────────────────────
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

// ── LOCATIONS ─────────────────────────────────────────────────────────────────
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

// ── ACRONYMS & FILTER LABELS ─────────────────────────────────────────────────
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

// ── STATE & ELEMENT CACHE ─────────────────────────────────────────────────────
const state = {
  results: [],
  checked: new Set()
};

const els = {};

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  populateCategories();
  populateLocations();
  rebuildTimeOptions("google", "24hours");
  loadTheme();
  bindEvents();
  hydrateFromUrl();
  initCompanySection();
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

// ── GENERATE RESULTS ─────────────────────────────────────────────────────────
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
  if (portal.rawSiteQuery) return "operator set";
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
      if (ACRONYMS.has(clean)) return clean;
      if (word.includes("-")) return word.split("-").map(smartTitleCase).join("-");
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
  return value.split(",").map(term => term.trim()).filter(Boolean);
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

// ── QUERY BUILDERS ───────────────────────────────────────────────────────────
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
  if (context.matchMode === "exact") return quoteTerm(title);
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
  if (portal.rawSiteQuery) return portal.rawSiteQuery;
  if (portal.sites.length === 1) return `site:${portal.sites[0]}`;
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
    case "onsite-hybrid": return '(onsite OR "on-site" OR hybrid OR "in office") -remote';
    case "hybrid": return '(hybrid OR "hybrid remote")';
    case "onsite": return '(onsite OR "on-site" OR "in office") -remote';
    case "only": return '(remote OR "work from home" OR "work from anywhere")';
    case "exclude": return '-remote -"work from home" -"work from anywhere"';
    default: return "";
  }
}

function getExperienceQuery(value) {
  switch (value) {
    case "entry": return '("entry level" OR junior OR "new grad" OR university OR "0-2 years")';
    case "mid": return '("mid level" OR "2+ years" OR "3+ years" OR associate) -senior -principal';
    case "senior": return '(senior OR lead OR staff OR principal OR "5+ years")';
    case "manager": return '(manager OR director OR "team lead" OR head)';
    case "internship": return '(intern OR internship OR co-op)';
    default: return "";
  }
}

function getEmploymentQuery(value) {
  switch (value) {
    case "fulltime": return '("full-time" OR "full time" OR FTE)';
    case "contract": return '(contract OR contractor OR "contract-to-hire" OR C2H)';
    case "parttime": return '("part-time" OR "part time")';
    case "internship": return '(internship OR intern OR co-op)';
    default: return "";
  }
}

function getAuthorizationQuery(value) {
  switch (value) {
    case "optBroad": return '("OPT" OR "STEM OPT" OR "F-1" OR "E-Verify" OR "visa sponsorship" OR "H-1B" OR "work authorization" OR "authorized to work in the United States")';
    case "currentAuthorized": return '("authorized to work in the United States" OR "legally authorized" OR "work authorization" OR "US work authorization")';
    case "sponsorNeeded": return '("visa sponsorship" OR "H-1B sponsorship" OR "will sponsor" OR "sponsorship available" OR "OPT" OR "STEM OPT") -"unable to sponsor" -"no sponsorship" -"will not sponsor" -"cannot sponsor"';
    case "everify": return '("E-Verify" OR "e verify")';
    case "optStrict": return '("OPT" OR "STEM OPT" OR "F-1 OPT" OR "CPT")';
    default: return "";
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
  if (!cleaned) return "";
  if (/^[-+()"]/.test(cleaned) || /\bOR\b/i.test(cleaned)) return cleaned;
  return cleaned.includes(" ") ? quoteTerm(cleaned) : cleaned;
}

function quoteTerm(term) {
  return `"${term.replace(/"/g, "").trim()}"`;
}

// ── URL ROUTING ───────────────────────────────────────────────────────────────
function buildSearchUrl(engine, query, time, portal, title, context) {
  if (shouldUseNativeUrl(portal, context)) {
    return buildNativeUrl(portal, title, context);
  }
  const queryWithOlder = addOlderOperator(query, time);
  switch (engine) {
    case "duckduckgo": return buildDuckDuckGoUrl(queryWithOlder, time);
    case "bing": return buildBingUrl(queryWithOlder, time);
    case "yahoo": return buildYahooUrl(queryWithOlder, time);
    case "kagi": return buildKagiUrl(queryWithOlder, time);
    case "qwant": return buildQwantUrl(queryWithOlder, time);
    case "brave": return buildBraveUrl(queryWithOlder, time);
    case "startpage": return buildStartpageUrl(queryWithOlder, time);
    default: return buildGoogleUrl(query, time, context.sort);
  }
}

function shouldUseNativeUrl(portal, context) {
  if (!portal.native) return false;
  if (portal.native === "linkedin" || portal.native === "indeed" || portal.native === "usajobs") return true;
  if (context.sort === "latest" && (portal.native === "glassdoor" || portal.native === "ziprecruiter" || portal.native === "dice")) return true;
  return false;
}

function buildNativeUrl(portal, title, context) {
  switch (portal.native) {
    case "linkedin": return buildLinkedInUrl(title, context);
    case "indeed": return buildIndeedUrl(title, context);
    case "usajobs": return buildUSAJobsUrl(title, context);
    case "glassdoor": return buildGlassdoorUrl(title, context);
    case "ziprecruiter": return buildZipRecruiterUrl(title, context);
    case "dice": return buildDiceUrl(title, context);
    default: return buildGoogleUrl(buildPortalQuery(title, portal, context), context.time, context.sort);
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

// ── IMPROVED LINKEDIN URL BUILDER ─────────────────────────────────────────────
function buildLinkedInUrl(title, context) {
  const params = new URLSearchParams();
  params.set("keywords", buildNativeKeywordQuery(title, context));
  params.set("location", getNativeLocation(context.location));
  params.set("geoId", "103644278");
  params.set("sortBy", context.sort === "latest" ? "DD" : "R");
  params.set("spellCorrectionEnabled", "true");
  const timeParam = getLinkedInTimeParam(context.time);
  if (timeParam) params.set("f_TPR", timeParam);
  if (context.remoteMode === "only") params.set("f_WT", "2");
  else if (context.remoteMode === "hybrid") params.set("f_WT", "3");
  else if (context.remoteMode === "onsite") params.set("f_WT", "1");
  else if (context.remoteMode === "onsite-hybrid") params.set("f_WT", "1,3");
  if (context.experience === "entry") params.set("f_E", "1,2");
  else if (context.experience === "mid") params.set("f_E", "3");
  else if (context.experience === "senior") params.set("f_E", "4,5");
  else if (context.experience === "manager") params.set("f_E", "5,6");
  else if (context.experience === "internship") params.set("f_E", "1");
  if (context.employment === "fulltime") params.set("f_JT", "F");
  else if (context.employment === "contract") params.set("f_JT", "C");
  else if (context.employment === "parttime") params.set("f_JT", "P");
  else if (context.employment === "internship") params.set("f_JT", "I");
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

// ── IMPROVED INDEED URL BUILDER ───────────────────────────────────────────────
function buildIndeedUrl(title, context) {
  const params = new URLSearchParams();
  params.set("q", buildNativeKeywordQuery(title, context));
  params.set("l", getNativeLocation(context.location));
  if (context.sort === "latest") params.set("sort", "date");
  const fromage = getIndeedFromAge(context.time);
  if (fromage) params.set("fromage", fromage);
  if (context.remoteMode === "only") params.set("sc", "0kf:attr(DSQF7);");
  if (context.experience === "entry") params.set("sc", (params.get("sc") || "") + "0kf:explvl(ENTRY_LEVEL);");
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

// ── GLASSDOOR, ZIPRECRUITER, DICE NATIVE BUILDERS ────────────────────────────
function buildGlassdoorUrl(title, context) {
  const params = new URLSearchParams();
  params.set("sc.keyword", buildNativeKeywordQuery(title, context));
  params.set("locT", "N");
  params.set("locId", "1");
  const fromAge = { "24hours": "1", week: "3", month: "7", year: "30" }[context.time] || "";
  if (fromAge) params.set("fromAge", fromAge);
  if (context.sort === "latest") params.set("srs", "DATE_ASC");
  return `https://www.glassdoor.com/Job/jobs.htm?${params.toString()}`;
}

function buildZipRecruiterUrl(title, context) {
  const params = new URLSearchParams();
  params.set("search", buildNativeKeywordQuery(title, context));
  params.set("location", getNativeLocation(context.location));
  const days = { "24hours": "1", week: "5", month: "30" }[context.time] || "";
  if (days) params.set("days", days);
  if (context.sort === "latest") params.set("sort_by_date", "1");
  return `https://www.ziprecruiter.com/candidate/search?${params.toString()}`;
}

function buildDiceUrl(title, context) {
  const params = new URLSearchParams();
  params.set("q", buildNativeKeywordQuery(title, context));
  params.set("countryCode", "US");
  params.set("radius", "30");
  params.set("radiusUnit", "mi");
  params.set("page", "1");
  params.set("pageSize", "20");
  const posted = { "24hours": "ONE", "48hours": "ONE", "72hours": "THREE", week: "SEVEN", month: "THIRTY" }[context.time] || "";
  if (posted) params.set("filters.postedDate", posted);
  if (context.sort === "latest") params.set("filters.sortBy", "displayedDate");
  return `https://www.dice.com/jobs?${params.toString()}`;
}

// ── TIME HELPERS ──────────────────────────────────────────────────────────────
function getLinkedInTimeParam(time) {
  const map = {
    "1hour": "r3600", "4hours": "r14400", "8hours": "r28800", "12hours": "r43200",
    "24hours": "r86400", "48hours": "r172800", "72hours": "r259200",
    week: "r604800", month: "r2592000", year: "r31536000"
  };
  return map[time] || "";
}

function getIndeedFromAge(time) {
  const map = { "1hour": "1", "4hours": "1", "8hours": "1", "12hours": "1", "24hours": "1", "48hours": "3", "72hours": "3", week: "7", month: "30" };
  return map[time] || "";
}

// ── SEARCH ENGINE URL BUILDERS ────────────────────────────────────────────────
function buildGoogleUrl(query, time, sort) {
  const tbs = getGoogleTbs(time, sort);
  return `https://www.google.com/search?q=${encodeURIComponent(query)}${tbs ? `&tbs=${encodeURIComponent(tbs)}` : ""}`;
}

function getGoogleTbs(time, sort) {
  const map = {
    "1hour": "qdr:h1", "4hours": "qdr:h4", "8hours": "qdr:h8", "12hours": "qdr:h12",
    "24hours": "qdr:d", "48hours": "qdr:h48", "72hours": "qdr:h72",
    week: "qdr:w", month: "qdr:m", year: "qdr:y",
    older1month: `cdr:1,cd_max:${getPastDate(1, "us")}`,
    older3months: `cdr:1,cd_max:${getPastDate(3, "us")}`,
    older6months: `cdr:1,cd_max:${getPastDate(6, "us")}`
  };
  const timePart = map[time] || "";
  if (sort === "latest") return timePart ? `${timePart},sbd:1` : "sbd:1";
  return timePart;
}

function buildDuckDuckGoUrl(query, time) {
  const map = { "24hours": "d", week: "w", month: "m", year: "y" };
  const params = new URLSearchParams({ q: query });
  if (map[time]) params.set("df", map[time]);
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
  if (!dayMap[time]) return "";
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
  if (time === "older1month") return 1;
  if (time === "older3months") return 3;
  if (time === "older6months") return 6;
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

// ── ADDRESS BAR & CLIPBOARD ───────────────────────────────────────────────────
function updateAddressBar(titles, context) {
  const params = new URLSearchParams();
  params.set("job", titles.join(","));
  params.set("location", context.location);
  params.set("time", context.time);
  if (context.sort !== "recommended") params.set("sort", context.sort);
  if (context.engine !== "google") params.set("engine", context.engine);
  if (context.remoteMode !== "neutral") params.set("remote", context.remoteMode);
  if (context.matchMode !== "smart") params.set("match", context.matchMode);
  if (context.experience !== "any") params.set("experience", context.experience);
  if (context.employment !== "any") params.set("employment", context.employment);
  if (context.authorization !== "optBroad") params.set("authorization", context.authorization);
  if (context.includeTerms.length) params.set("include", context.includeTerms.join(","));
  if (context.excludeTerms.length) params.set("exclude", context.excludeTerms.join(","));
  const categories = Array.from(getSelectedCategories());
  if (categories.length !== CATEGORIES.length) params.set("groups", categories.join(","));
  history.pushState(null, "", `${window.location.pathname}?${params.toString()}`);
}

async function copyLinks(links, message) {
  if (!links.length) return;
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
  showToast.timeout = setTimeout(() => { els.toast.textContent = ""; }, 2200);
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
  els.categoryFilters.querySelectorAll("input").forEach(input => { input.checked = true; });
  state.results = [];
  state.checked.clear();
  els.results.innerHTML = "";
  setEmptyState(true);
  updateCounts();
  updatePreviewForEmptyState();
  history.pushState(null, "", window.location.pathname);
}

// ── THEME ─────────────────────────────────────────────────────────────────────
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("portalScoutTheme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  syncThemeButton();
}

function loadTheme() {
  const stored = localStorage.getItem("portalScoutTheme");
  if (stored === "dark") document.documentElement.classList.add("dark");
  syncThemeButton();
}

function syncThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");
  els.themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  els.themeToggle.setAttribute("aria-pressed", String(isDark));
}

// ── COMPANY DATA FUNCTIONS ────────────────────────────────────────────────────
function buildCompanies() {
  const seen = new Map();
  [...SPONSOR_COMPANY_ROWS, ...STAFFING_VENDOR_ROWS].forEach(c => {
    const key = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!seen.has(key) || (c.careersUrl && !seen.get(key).careersUrl)) {
      seen.set(key, c);
    }
  });
  return [...seen.values()].sort((a, b) => b.filings - a.filings || a.name.localeCompare(b.name));
}

const ALL_COMPANIES = buildCompanies();

function getCompanyById(name) {
  return ALL_COMPANIES.find(c => c.name === name);
}

function buildCompanyLinkedInUrl(company, role, context) {
  const ctx = { ...context, includeTerms: [company.name, ...(context.includeTerms || [])] };
  const title = role || context.jobTitle || company.name;
  return buildLinkedInUrl(title, ctx);
}

function buildCompanyIndeedUrl(company, role, context) {
  const params = new URLSearchParams();
  params.set("q", `"${company.name}" ${role || context.jobTitle || ""}`);
  params.set("l", getNativeLocation(context.location));
  if (context.sort === "latest") params.set("sort", "date");
  return `https://www.indeed.com/jobs?${params.toString()}`;
}

function buildCompanyGoogleUrl(company, role, context) {
  let host;
  try {
    host = company.careersUrl ? new URL(company.careersUrl).hostname : "careers." + company.name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com";
  } catch (e) {
    host = "careers." + company.name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com";
  }
  const q = `site:${host} "${role || context.jobTitle || "software engineer"}"`;
  return buildGoogleUrl(q, context.time, context.sort);
}

function populateCompanySelect(filter, sponsorTier, category, companyType) {
  const companySelect = document.getElementById("companySelect");
  if (!companySelect) return;
  companySelect.innerHTML = '<option value="">— Select a company —</option>';
  let companies = ALL_COMPANIES;
  if (filter) {
    const f = filter.toLowerCase();
    companies = companies.filter(c => c.name.toLowerCase().includes(f) || (c.aliases && c.aliases.toLowerCase().includes(f)));
  }
  if (sponsorTier && sponsorTier !== "all") {
    companies = companies.filter(c => c.tier === sponsorTier);
  }
  if (category && category !== "all") {
    companies = companies.filter(c => c.category === category);
  }
  if (companyType === "direct") {
    companies = companies.filter(c => c.kind === "direct");
  } else if (companyType === "staffing") {
    companies = companies.filter(c => c.kind === "staffing");
  }
  companies.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.name;
    opt.textContent = `${c.name} (${c.filings} H1B filings)`;
    companySelect.appendChild(opt);
  });
  const countEl = document.getElementById("companyCount");
  if (countEl) countEl.textContent = companies.length;
}

function openCompanyCareers() {
  const sel = document.getElementById("companySelect");
  if (!sel || !sel.value) return;
  const company = getCompanyById(sel.value);
  if (company && company.careersUrl) {
    window.open(company.careersUrl, "_blank", "noopener,noreferrer");
  } else {
    const q = `${sel.value} careers jobs`;
    window.open(buildGoogleUrl(q, "all", "recommended"), "_blank", "noopener,noreferrer");
  }
}

function openCompanyLinkedIn() {
  const sel = document.getElementById("companySelect");
  const roleEl = document.getElementById("companyRoleInput");
  if (!sel || !sel.value) return;
  const company = getCompanyById(sel.value);
  const role = roleEl ? roleEl.value.trim() : "";
  const context = getContext();
  window.open(buildCompanyLinkedInUrl(company, role, context), "_blank", "noopener,noreferrer");
}

function openCompanyIndeed() {
  const sel = document.getElementById("companySelect");
  const roleEl = document.getElementById("companyRoleInput");
  if (!sel || !sel.value) return;
  const company = getCompanyById(sel.value);
  const role = roleEl ? roleEl.value.trim() : "";
  const context = getContext();
  window.open(buildCompanyIndeedUrl(company, role, context), "_blank", "noopener,noreferrer");
}

function initCompanySection() {
  const filterInput = document.getElementById("companyFilter");
  const tierSelect = document.getElementById("companySponsorTier");
  const categorySelect = document.getElementById("companyCategorySelect");
  const typeSelect = document.getElementById("companyTypeSelect");

  function refresh() {
    populateCompanySelect(
      filterInput ? filterInput.value : "",
      tierSelect ? tierSelect.value : "all",
      categorySelect ? categorySelect.value : "all",
      typeSelect ? typeSelect.value : "all"
    );
  }

  if (filterInput) filterInput.addEventListener("input", refresh);
  if (tierSelect) tierSelect.addEventListener("change", refresh);
  if (categorySelect) categorySelect.addEventListener("change", refresh);
  if (typeSelect) typeSelect.addEventListener("change", refresh);

  const careersBtn = document.getElementById("openCareersBtn");
  const linkedInBtn = document.getElementById("companyLinkedInBtn");
  const indeedBtn = document.getElementById("companyIndeedBtn");

  if (careersBtn) careersBtn.addEventListener("click", openCompanyCareers);
  if (linkedInBtn) linkedInBtn.addEventListener("click", openCompanyLinkedIn);
  if (indeedBtn) indeedBtn.addEventListener("click", openCompanyIndeed);

  // Populate category options
  const cats = [...new Set(ALL_COMPANIES.map(c => c.category))].sort();
  if (categorySelect) {
    categorySelect.innerHTML = '<option value="all">All categories</option>';
    cats.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  refresh();
}
