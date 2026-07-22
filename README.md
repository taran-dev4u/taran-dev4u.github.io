# Taran Mamidala Portfolio

Professional portfolio for Taran Mamidala, focused on machine learning, software engineering, data engineering, backend APIs, cloud deployment, and geospatial research.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- React Icons
- Vercel Serverless Functions

## Local Development

```bash
npm install
npm run dev
```

For the Ask Taran AI backend, copy `.env.example` to `.env.local` and set:

```bash
GROQ_API_KEY=your_server_side_key
GROQ_MODEL=llama-3.1-8b-instant
```

## Production Build

```bash
npm run build
```

## Deployment

This project is configured for Vercel as the primary deployment. Vercel builds the Vite app from `dist` and runs the `/api/portfolio-chat` serverless route for Ask Taran AI.

Required Vercel environment variables:

- `GROQ_API_KEY`
- `GROQ_MODEL` (optional, defaults to `llama-3.1-8b-instant`)
- `VITE_GA_MEASUREMENT_ID`, Umami variables, or `VITE_CLARITY_PROJECT_ID` if analytics is enabled
- `VITE_RESUME_TRACKING_ENDPOINT` for an optional first-party resume-event collector

Analytics are configured for anonymous portfolio usage signals only. Use GA4, Umami, or Microsoft Clarity dashboards to view live visitors, visit counts, popular sections, referrers, device/browser information, countries, and assistant/project interaction events. Do not store private visitor identity unless you add an explicit consent flow.

The portfolio defaults to the existing GA4 web stream `G-RSV4E83S9P`; `VITE_GA_MEASUREMENT_ID` can override it for another deployment. Google Signals and ad-personalization signals are disabled. The site does not send the previous custom visitor-context event.

Resume interactions use two aggregate event names:

- `resume_view` when a visitor opens the PDF
- `resume_download` when a visitor downloads the PDF

The event label identifies the source button, such as `hero` or `resume_section`. In GA4, the totals appear under **Reports > Engagement > Events** after processing. Umami lists the same names under event activity. Clarity records the names as custom events.

For stronger delivery, set `VITE_RESUME_TRACKING_ENDPOINT` to a first-party HTTPS endpoint that accepts a POST body containing `id`, `action`, `source`, `path`, `referrer`, and `occurredAt`. Failed requests remain in a small browser queue and retry on the visitor's next page load. The endpoint should deduplicate by `id`, return a 2xx response only after durable storage, allow the portfolio origin through CORS, and aggregate counts without storing visitor identity. Browser analytics can still be blocked or interrupted, so no client-side implementation can promise zero event loss.

GitHub Pages remains a static backup. The workflow in `.github/workflows/deploy.yml`
builds the Vite app and deploys the `dist` folder whenever changes are pushed to `main`.

In the GitHub repository settings, set Pages source to **GitHub Actions**.

## Notes

- The favicon is generated from Taran's `tm.png` logo.
- The profile image is optimized as WebP for faster loading.
- Contact form submission opens a prefilled email draft, keeping the implementation simple and transparent.
- Ask Taran AI retrieves from a structured local portfolio knowledge base first, then calls Groq's fast Llama chat API only from the serverless route when the API key is configured.
