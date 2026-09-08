import { AppShell } from "@/components/AppShell";
import { RevenueClient } from "./RevenueClient";
import { APPS } from "@/lib/mock-data";

export const metadata = { title: "Revenue · Aduo Publisher" };

export default function RevenuePage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Revenue
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Revenue over a custom date range with per-app breakdown.
        </p>
      </div>
      <RevenueClient
        apps={APPS.map((a) => ({
          id: a.id,
          name: a.name,
          revenue30d: a.revenue30d,
          impressions30d: a.impressions30d,
        }))}
      />
    </AppShell>
  );
}
