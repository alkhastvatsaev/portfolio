# Alkhast Vatsaev — Portfolio

Live: [alkhastvatsaev.dev](https://alkhastvatsaev.dev)

White, numbers-first **one-page** portfolio (French at `/`, English at `/en`) with lots of interactive animations.

## Stack

Next.js 16 (static export) · TypeScript · Tailwind CSS 4 · shadcn structure (`src/components/ui`) · Three.js (scanner card stream) · lucide-react.

## Where things live

| Path | Content |
|---|---|
| `src/data/metrics.ts` | **Every number** on the site + the projects list (FR/EN) |
| `src/data/activity.ts` | Commits per day (activity heatmap) |
| `src/lib/i18n.ts` | All UI copy, routes, language switch |
| `src/components/one-page.tsx` | The page (all sections) |
| `src/components/fx.tsx` | Animations: exploration bar, confetti, tilt, cursor glow, count-up, heatmap, project modal |
| `src/components/ui/` | `scanner-card-stream`, `logo-cloud-2` |
| `vercel.json` | Redirects from the old site's URLs |

## Commands

```bash
npm install
npm run dev
npm run check   # lint + types + unit tests + build + e2e
```
