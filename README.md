# Taran Mamidala Portfolio

Professional portfolio for Taran Mamidala, focused on machine learning, software engineering, data engineering, backend APIs, cloud deployment, and geospatial research.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Deployment

This project is ready for GitHub Pages. The workflow in `.github/workflows/deploy.yml`
builds the Vite app and deploys the `dist` folder whenever changes are pushed to `main`.

In the GitHub repository settings, set Pages source to **GitHub Actions**.

## Notes

- The favicon is generated from Taran's `tm.png` logo.
- The profile image is optimized as WebP for faster loading.
- Contact form submission opens a prefilled email draft, keeping the implementation simple and transparent.
