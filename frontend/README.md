# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Deployment configuration

The production frontend uses `https://food-social-platform.onrender.com/api` by default. To use a different backend, set the frontend environment variable `VITE_API_URL` to the backend API base URL (including `/api`) and redeploy.

For the backend, set `FRONTEND_URL` in the hosting provider's environment settings to the exact deployed frontend origin, such as `https://your-frontend.onrender.com` (without a trailing slash). The local-development default is `http://localhost:5173`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
