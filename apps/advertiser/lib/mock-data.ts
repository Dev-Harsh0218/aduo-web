import { subDays, format } from "date-fns";

export type CampaignStatus = "active" | "paused" | "ended" | "draft";

export type Campaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  impressions: number;
  clicks: number;
  budget: number;
  spent: number;
  startDate: string; // ISO
  endDate: string; // ISO
  targetApps: string[];
  creativeUrl: string;
};

export type Activity = {
  id: string;
  message: string;
  timestamp: string; // ISO
  kind: "impression" | "click" | "budget" | "system";
};

export type TimePoint = { date: string; value: number };

export const CAMPAIGNS: Campaign[] = [
  {
    id: "cmp_001",
    name: "Q4 Retention Push",
    status: "active",
    impressions: 482310,
    clicks: 14210,
    budget: 8000,
    spent: 5240.55,
    startDate: "2026-08-01",
    endDate: "2026-10-31",
    targetApps: ["Chess Master", "Puzzle Quest", "Runner Legend"],
    creativeUrl: "/mock/creative-1.png",
  },
  {
    id: "cmp_002",
    name: "Holiday Awareness",
    status: "active",
    impressions: 251892,
    clicks: 6421,
    budget: 5000,
    spent: 3110.9,
    startDate: "2026-08-15",
    endDate: "2026-12-31",
    targetApps: ["Chess Master", "Solitaire Pro"],
    creativeUrl: "/mock/creative-2.png",
  },
  {
    id: "cmp_003",
    name: "Puzzle Quest Cross-Promo",
    status: "paused",
    impressions: 128440,
    clicks: 2884,
    budget: 3500,
    spent: 1120.4,
    startDate: "2026-07-10",
    endDate: "2026-09-10",
    targetApps: ["Puzzle Quest"],
    creativeUrl: "/mock/creative-3.png",
  },
  {
    id: "cmp_004",
    name: "New User Acquisition",
    status: "active",
    impressions: 918225,
    clicks: 33107,
    budget: 15000,
    spent: 12480.2,
    startDate: "2026-06-01",
    endDate: "2026-12-31",
    targetApps: ["Runner Legend", "Solitaire Pro", "Chess Master"],
    creativeUrl: "/mock/creative-4.png",
  },
  {
    id: "cmp_005",
    name: "Summer Sale Recap",
    status: "ended",
    impressions: 640120,
    clicks: 15221,
    budget: 6000,
    spent: 6000,
    startDate: "2026-05-01",
    endDate: "2026-08-01",
    targetApps: ["Solitaire Pro", "Runner Legend"],
    creativeUrl: "/mock/creative-5.png",
  },
  {
    id: "cmp_006",
    name: "Draft: Winter Launch",
    status: "draft",
    impressions: 0,
    clicks: 0,
    budget: 10000,
    spent: 0,
    startDate: "2026-11-01",
    endDate: "2027-02-01",
    targetApps: ["Chess Master"],
    creativeUrl: "/mock/creative-6.png",
  },
];

export const RECENT_ACTIVITY: Activity[] = [
  {
    id: "act_01",
    message: "Q4 Retention Push crossed 480K impressions.",
    timestamp: "2026-09-03T10:22:00Z",
    kind: "impression",
  },
  {
    id: "act_02",
    message: "New User Acquisition spent $500 in the last hour.",
    timestamp: "2026-09-03T09:11:00Z",
    kind: "budget",
  },
  {
    id: "act_03",
    message: "Puzzle Quest Cross-Promo was paused by you@example.com.",
    timestamp: "2026-09-02T18:47:00Z",
    kind: "system",
  },
  {
    id: "act_04",
    message: "Holiday Awareness got a spike of 3.2K clicks today.",
    timestamp: "2026-09-02T14:03:00Z",
    kind: "click",
  },
  {
    id: "act_05",
    message: "Summer Sale Recap ended and exhausted its budget.",
    timestamp: "2026-08-01T23:59:00Z",
    kind: "system",
  },
];

export const TARGET_APPS: { id: string; name: string }[] = [
  { id: "chess", name: "Chess Master" },
  { id: "puzzle", name: "Puzzle Quest" },
  { id: "runner", name: "Runner Legend" },
  { id: "solitaire", name: "Solitaire Pro" },
  { id: "trivia", name: "Trivia Now" },
];

// Deterministic pseudo-random so charts don't flicker between renders.
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
    // Slight upward drift.
    const drift = 1 + (days - i) / (days * 4);
    out.push({
      date: format(d, "MMM d"),
      value: Math.round(base * jitter * drift),
    });
  }
  return out;
}

export function totalKPIs() {
  const impressions = CAMPAIGNS.reduce((s, c) => s + c.impressions, 0);
  const clicks = CAMPAIGNS.reduce((s, c) => s + c.clicks, 0);
  const spent = CAMPAIGNS.reduce((s, c) => s + c.spent, 0);
  const ctr = impressions === 0 ? 0 : (clicks / impressions) * 100;
  return { impressions, clicks, spent, ctr };
}

export function campaignById(id: string): Campaign | undefined {
  return CAMPAIGNS.find((c) => c.id === id);
}
