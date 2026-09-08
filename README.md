# aduo-web

Monorepo for the Aduo web surfaces: the marketing site, the publisher panel, and the advertiser panel. Managed with **Turborepo + pnpm workspaces**, apps built with **Next.js 16 + Tailwind v4 + TypeScript**.

Part of the [Aduo platform](https://github.com/Dev-Harsh0218/aduo) — see the meta-repo for the SDK / backend / test app.

## Layout

```
aduo-web/
├── apps/
│   ├── marketing/          @aduo/marketing      Next.js — landing, "how it works", CTAs
│   ├── publisher/          @aduo/publisher      Next.js — SDK key mgmt, integration, revenue (coming soon)
│   └── advertiser/         @aduo/advertiser     Legacy CRA — campaign mgmt (migrating to Next.js)
├── packages/
│   ├── ui/                                     Shared React components (Shadcn-based) — TODO
│   ├── api-client/                             Typed API client for aduo-backend — TODO
│   └── auth/                                   Shared auth flows — TODO
├── turbo.json                                  Turborepo pipeline definitions
├── pnpm-workspace.yaml                         Workspace config
└── package.json                                Root — scripts + shared dev-deps
```

## Quick start

```bash
pnpm install                                   # from repo root

# Dev
pnpm --filter=@aduo/marketing dev              # marketing on :3000
pnpm --filter=@aduo/publisher dev              # publisher on :3001
pnpm dev                                       # all apps in parallel (Turborepo)

# Build
pnpm --filter=@aduo/marketing build
pnpm build                                     # everything
```

## Apps

### `apps/marketing` — the landing page

Next.js 16 App Router, Turbopack, Tailwind v4. Fully static (all pages pre-rendered at build time).

Sections: hero, "how it works", publisher pitch (with Kotlin integration snippet), advertiser pitch (with mock analytics card), early-access CTA, footer.

### `apps/publisher` — the publisher panel

Next.js 16 skeleton, currently a "coming soon" landing. Planned:

- SDK key generation + rotation
- Kotlin/iOS/Flutter integration guides
- Revenue dashboard (hourly resolution, exportable)
- Payout settings

### `apps/advertiser` — the advertiser console

The existing Create React App codebase — campaign management, analytics, bulk creative upload, SSE-driven live counters.

**Status: legacy.** It works; being migrated to Next.js in Phase 2.

## Packages (planned, empty for now)

- `@aduo/ui` — Shadcn/ui components consumed by all three apps
- `@aduo/api-client` — typed client for `aduo-backend` REST API
- `@aduo/auth` — shared login + JWT handling

## Deployment

Each app becomes a separate Vercel project pointing at this monorepo, with a `Root Directory` set to its `apps/*` path. Vercel auto-detects Turborepo and only rebuilds what changed.

## Related repos

- [`aduo`](https://github.com/Dev-Harsh0218/aduo) — platform meta-repo
- [`aduo-backend`](https://github.com/Dev-Harsh0218/aduo-backend) — Node.js API
- [`aduo-sdk-kotlin`](https://github.com/Dev-Harsh0218/aduo-sdk-kotlin) — Android SDK
- [`aduo-test-app`](https://github.com/Dev-Harsh0218/aduo-test-app) — reference SDK integration
