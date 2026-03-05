# AI-Code-Explainer — Architecture & Project Summary

## System architecture and technical decisions

- **Application type:** Single-page application (SPA) built with Angular (v21). Chosen for a fast, component-driven UI and strong TypeScript integration.
- **Frontend-only design:** The repo is structured as a client-side app that can call external AI APIs via services (no backend required by default). This keeps deployment simple (static hosting or serverless).
- **Component structure:** UI is split into focused components (editor, diff viewer, history panel, result card, header) to keep UI concerns isolated and testable.
- **Services:** Business logic and external API interaction live in `src/app/services` (e.g., `claude-service.ts` and `history-service.ts`) to separate network/state logic from presentation.
- **Build & tooling:** Uses the Angular build system (`@angular/build`), TypeScript 5.9, and standard Angular CLI scripts. `vitest` + `jsdom` are available for dev/test tooling.
- **Styling:** SCSS used across components for scoped styles and maintainability.

## AI tool(s) selected and reasoning

- **Primary integration:** `claude-service.ts` indicates the project targets Anthropic Claude (or compatible Claude-like APIs) for code explanation tasks — chosen because Claude models are optimized for long-form, instruction-following outputs and can produce detailed, structured explanations for code.
- **Fallback / alternatives:** The service layer is designed to be swappable — you can plug in OpenAI GPT-series models, local LLMs, or other providers by implementing the same service interface. This keeps the app provider-agnostic and simplifies experimentation.
- **Security & cost:** External AI calls should be proxied through a backend or serverless function for secret management and rate-limiting in production. For prototyping, the client service can be used with care (not recommended for public keys).

<!-- ## Repo file summaries

- **src/** — Main application source. Key points:
  - `src/main.ts` and `index.html` boot the Angular app.
  - `src/app/` contains the app entry (`app.ts`, `app.routes.ts`, `app.config.ts`) and scoped `components/`:
    - `code-editor/` — editor UI for user code input.
    - `diff-viewer/` — visualizes differences between code versions or explanations.
    - `history-panel/` — lists previous queries/results.
    - `result-card/` — displays AI-generated explanations.
    - `header/` — top navigation and controls.
  - `src/app/services/` contains AI integration and persistence logic (`claude-service.ts`, `history-service.ts`).
  - `src/environments/` holds environment flags for prod/dev.

- **package.json** — Project scripts and dependencies:
  - Scripts: `start` (ng serve), `build`, `watch` (dev build watch), `test`.
  - Dependencies: Angular packages (`@angular/*` v21), `rxjs`, `tslib`.
  - DevDependencies: `@angular/cli`, `@angular/build`, `@angular/compiler-cli`, `typescript`, `vitest`, `jsdom`, `prettier`.
  - Notes: Node/npm compatible with `npm` (packageManager: npm@11.11.0). Use the Angular CLI for local development.

- **angular.json** — Build/serve configuration and targets:
  - Project: `AI-Code-Explainer` with `sourceRoot: src`.
  - Build options use `@angular/build:application` and point `browser` to `src/main.ts` with `tsConfig: tsconfig.app.json`.
  - Assets include `public/` and global styles use `src/styles.scss`.
  - Two configurations: `production` (optimizations, fileReplacements for `environment.ts`) and `development` (source maps, no optimization).

## Quick dev notes

- Run locally: `npm install` then `npm start` (uses Angular CLI `ng serve`).
- Tests: `npm test` (project uses `vitest` + `jsdom`).
- To change AI provider: implement the provider in `src/app/services` behind the existing service interface and swap endpoints/keys in environment files.

---
Created/updated README with architecture, AI selection rationale, and file summaries. -->
