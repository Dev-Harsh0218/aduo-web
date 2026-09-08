import { AppShell } from "@/components/AppShell";
import { AnalyticsClient } from "./AnalyticsClient";

export const metadata = { title: "Analytics · Aduo Advertiser" };

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Analytics
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Drill into performance across a custom date range.
        </p>
      </div>
      <AnalyticsClient />
    </AppShell>
  );
}
