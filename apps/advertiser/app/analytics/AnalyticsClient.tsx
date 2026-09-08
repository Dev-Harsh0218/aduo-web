"use client";
import { useMemo, useState } from "react";
import { format, subDays, differenceInCalendarDays } from "date-fns";
import { Card } from "@/components/Card";
import { KPICard } from "@/components/KPICard";
import { LineChartBlock, BarChartBlock } from "@/components/Chart";
import { DateRangePicker } from "@/components/DateRangePicker";
import { generateTimeSeries } from "@/lib/mock-data";
import {
  formatCompact,
  formatCurrency,
  formatPercent,
} from "@/lib/format";

export function AnalyticsClient() {
  const today = new Date();
  const [start, setStart] = useState(
    format(subDays(today, 29), "yyyy-MM-dd"),
  );
  const [end, setEnd] = useState(format(today, "yyyy-MM-dd"));

  const { impressions, clicks, summary } = useMemo(() => {
    const days =
      Math.max(1, differenceInCalendarDays(new Date(end), new Date(start))) +
      1;
    const impressions = generateTimeSeries(
      Math.min(days, 90),
      92_000,
      0.35,
      21,
    );
    const clicks = generateTimeSeries(Math.min(days, 90), 2_600, 0.4, 33);
    const totalImp = impressions.reduce((s, p) => s + p.value, 0);
    const totalClicks = clicks.reduce((s, p) => s + p.value, 0);
    const ctr = totalImp === 0 ? 0 : (totalClicks / totalImp) * 100;
    const spend = totalClicks * 1.25 + totalImp * 0.0015;
    return {
      impressions,
      clicks,
      summary: { totalImp, totalClicks, ctr, spend, days },
    };
  }, [start, end]);

  return (
    <>
      <Card
        title="Date range"
        subtitle={`Showing ${summary.days} day${summary.days === 1 ? "" : "s"} of mocked data`}
      >
        <DateRangePicker
          start={start}
          end={end}
          onStartChange={setStart}
          onEndChange={setEnd}
        />
      </Card>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Impressions"
          value={formatCompact(summary.totalImp)}
          delta={6.3}
        />
        <KPICard
          label="Clicks"
          value={formatCompact(summary.totalClicks)}
          delta={4.8}
        />
        <KPICard
          label="CTR"
          value={formatPercent(summary.ctr, 2)}
          delta={-0.2}
        />
        <KPICard
          label="Estimated spend"
          value={formatCurrency(summary.spend)}
          delta={7.1}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Impressions over time">
          <LineChartBlock data={impressions} />
        </Card>
        <Card title="Clicks over time">
          <BarChartBlock data={clicks} color="#0ea5e9" />
        </Card>
      </div>
    </>
  );
}
