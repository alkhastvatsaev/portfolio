# Agent rules — portfolio

- Numbers live only in `src/data/metrics.ts` and `src/data/activity.ts`. Never hardcode a new figure elsewhere; `src/data/metrics.test.ts` checks they stay consistent.
- UI copy lives in `src/lib/i18n.ts` (FR + EN). Add both languages.
- The site is a single page per language. New section → add its id to `sections` in `src/lib/i18n.ts` and to `e2e/smoke.spec.ts`.
- `src/components/ui/*` are the pasted 21st.dev components: keep them as given, fixes only.
- Before finishing: `npm test && npm run typecheck && npm run lint`; after route/layout changes also `npm run build && npm run test:e2e`.
