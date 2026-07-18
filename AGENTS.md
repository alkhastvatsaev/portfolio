# Agent testing rules — portfolio

## Goal
Keep regressions low for a solo + AI-maintained Next.js portfolio. Prefer a few high-signal tests over broad fragile UI coverage.

## Stack
- Unit / contracts / components: Vitest (`npm test`)
- Coverage (data/lib/components): `npm run test:coverage`
- Smoke E2E: Playwright (`npm run test:e2e`) — requires `npm run build` first
- Full gate: `npm run check`

## Pyramid
1. **Data contracts** (`src/data/*.test.ts`) — slugs, required fields, FR/EN alignment
2. **Pure helpers** (`src/lib/*.test.ts`) — locale routing, etc.
3. **Schema builders** (`src/components/json-ld.test.ts`)
4. **Components** (`src/components/*.test.tsx`) — Testing Library for header / article
5. **Smoke E2E** (`e2e/smoke.spec.ts`) — critical routes return 200 after static export

## When you change code, also update tests
| Change | Required test update |
|---|---|
| `src/data/projects.ts` or `articles.ts` | Update / extend data contract tests |
| New pure helper in `src/lib` | Add co-located `*.test.ts` |
| Locale routes / language switcher | Update `locale-path` + `site-header` tests |
| Structured data helpers | Update `json-ld` tests |
| Header / article layout | Update component tests |
| New critical public route | Add one Playwright smoke assertion |

## Do not
- Snapshot entire marketing pages
- Add E2E for every copy tweak
- Skip `npm test` after data or routing changes

## Commands agents should run before finishing
```bash
npm test
npm run typecheck
```

After route or layout changes that affect public pages:
```bash
npm run build && npm run test:e2e
```
