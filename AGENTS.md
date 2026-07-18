# Agent testing rules — portfolio

## Goal
Keep regressions low for a solo + AI-maintained Next.js portfolio. Prefer a few high-signal tests over broad fragile UI coverage.

## Stack
- Unit / contracts: Vitest (`npm test`)
- Coverage (data/lib): `npm run test:coverage`
- Full gate: `npm run check`

## Pyramid
1. **Data contracts** (`src/data/*.test.ts`) — slugs, required fields, FR/EN alignment
2. **Pure helpers** (`src/lib/*.test.ts`) — locale routing, etc.
3. **Schema builders** (`src/components/json-ld.test.ts`)
4. Later: component tests (Testing Library) then Playwright smoke

## When you change code, also update tests
| Change | Required test update |
|---|---|
| `src/data/projects.ts` or `articles.ts` | Update / extend data contract tests |
| New pure helper in `src/lib` | Add co-located `*.test.ts` |
| Locale routes / language switcher | Update `locale-path` tests |
| Structured data helpers | Update `json-ld` tests |
| New critical user path (nav CTA, article layout) | Prefer a focused unit/component test; E2E smoke only for route 200s |

## Do not
- Snapshot entire marketing pages
- Add E2E for every copy tweak
- Skip `npm test` after data or routing changes

## Commands agents should run before finishing
```bash
npm test
npm run typecheck
```
