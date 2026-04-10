# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Deploying

This project is configured for static hosting (Vite build output in `dist`). To deploy to Vercel:

1. Push your repository to GitHub, GitLab or Bitbucket.
2. Go to https://vercel.com/new and import the repo.
3. Configure build settings (defaults are usually fine):
	- Framework Preset: `Create React App` or `Other`
	- Build Command: `npm run vercel-build` (or `npm run build`)
	- Output Directory: `dist`
4. Deploy — Vercel will build and serve the site. The provided `vercel.json` ensures SPA fallback routing.

Locally, build and preview with:

```bash
npm install
npm run build
npm run preview
```
