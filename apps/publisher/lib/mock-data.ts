import { subDays, format } from "date-fns";

export type IntegrationStatus = "live" | "testing" | "not_started";

export type PublisherApp = {
  id: string;
  name: string;
  packageName: string;
  sdkKey: string;
  status: IntegrationStatus;
  impressions30d: number;
  revenue30d: number;
  fillRate: number; // percentage 0-100
  createdAt: string;
};

export type Payout = {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "paid" | "pending" | "failed";
};

export type TimePoint = { date: string; value: number };

export const APPS: PublisherApp[] = [
  {
    id: "app_001",
    name: "Chess Master",
    packageName: "com.acme.chessmaster",
    sdkKey: "sdk_live_9x2f8Ld4mNq7VwPRt3aZbE1sYcH0uKj6",
    status: "live",
    impressions30d: 1_240_500,
    revenue30d: 4820.44,
    fillRate: 92.4,
    createdAt: "2026-04-12",
  },
  {
    id: "app_002",
    name: "Puzzle Quest",
    packageName: "com.acme.puzzlequest",
    sdkKey: "sdk_live_A8mT2rWvKp1nCxLbEdFjHqSuXzYo3RgV",
    status: "live",
    impressions30d: 720_120,
    revenue30d: 2610.9,
    fillRate: 88.1,
    createdAt: "2026-05-30",
  },
  {
    id: "app_003",
    name: "Runner Legend",
    packageName: "com.acme.runnerlegend",
    sdkKey: "sdk_test_QwErTyU1oPaS2dFgHjKlZxCvBnM4iUyT",
    status: "testing",
    impressions30d: 45_600,
    revenue30d: 118.32,
    fillRate: 76.8,
    createdAt: "2026-07-19",
  },
  {
    id: "app_004",
    name: "Solitaire Pro",
    packageName: "com.acme.solitairepro",
    sdkKey: "sdk_live_Zk9L2mNbVc3XdRtY5EwQu8PoIhGfKjHt",
    status: "live",
    impressions30d: 512_300,
    revenue30d: 1580.11,
    fillRate: 84.5,
    createdAt: "2026-06-04",
  },
];

export const PAYOUTS: Payout[] = [
  {
    id: "po_01",
    date: "2026-09-01",
    amount: 4820.44,
    method: "ACH · Bank of America",
    status: "paid",
  },
  {
    id: "po_02",
    date: "2026-08-01",
    amount: 5310.9,
    method: "ACH · Bank of America",
    status: "paid",
  },
  {
    id: "po_03",
    date: "2026-07-01",
    amount: 4110.4,
    method: "PayPal",
    status: "paid",
  },
  {
    id: "po_04",
    date: "2026-06-01",
    amount: 3820.6,
    method: "PayPal",
    status: "paid",
  },
  {
    id: "po_05",
    date: "2026-05-01",
    amount: 2450.1,
    method: "PayPal",
    status: "pending",
  },
];

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateTimeSeries(
  days: number,
  base: number,
  variance = 0.35,
  seed = 42,
): TimePoint[] {
  const rand = seededRand(seed);
  const now = new Date();
  const out: TimePoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = subDays(now, i);
    const jitter = 1 + (rand() - 0.5) * variance;
    const drift = 1 + (days - i) / (days * 4);
    out.push({
      date: format(d, "MMM d"),
      value: Math.round(base * jitter * drift * 100) / 100,
    });
  }
  return out;
}

export function totalKPIs() {
  const totalRevenue = APPS.reduce((s, a) => s + a.revenue30d, 0);
  const totalImpressions = APPS.reduce((s, a) => s + a.impressions30d, 0);
  const activeKeys = APPS.filter((a) => a.status !== "not_started").length;
  const fillRate =
    APPS.reduce((s, a) => s + a.fillRate, 0) / Math.max(1, APPS.length);
  return { totalRevenue, totalImpressions, activeKeys, fillRate };
}

export function appById(id: string): PublisherApp | undefined {
  return APPS.find((a) => a.id === id);
}

export function generateSdkKey(mode: "live" | "test" = "test"): string {
  const alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < 32; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `sdk_${mode}_${out}`;
}
