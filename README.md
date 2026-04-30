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
- `VITE_GA_MEASUREMENT_ID` or Umami variables if analytics is enabled

GitHub Pages remains a static backup. The workflow in `.github/workflows/deploy.yml`
builds the Vite app and deploys the `dist` folder whenever changes are pushed to `main`.

In the GitHub repository settings, set Pages source to **GitHub Actions**.

## Notes

- The favicon is generated from Taran's `tm.png` logo.
- The profile image is optimized as WebP for faster loading.
- Contact form submission opens a prefilled email draft, keeping the implementation simple and transparent.
- Ask Taran AI retrieves from a structured local portfolio knowledge base first, then calls Groq's fast Llama chat API only from the serverless route when the API key is configured.
