"use client";
import clsx from "clsx";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import type { TimePoint } from "@/lib/mock-data";

type Props = {
  label: string;
  value: string;
  delta?: number;
  spark?: TimePoint[];
};

export function KPICard({ label, value, delta, spark }: Props) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            {label}
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">
            {value}
          </div>
          {typeof delta === "number" && (
            <div
              className={clsx(
                "mt-1 text-xs font-medium",
                positive ? "text-emerald-600" : "text-red-600",
              )}
            >
              {positive ? "+" : ""}
              {delta.toFixed(1)}% vs last period
            </div>
          )}
        </div>
        {spark && spark.length > 0 && (
          <div className="w-24 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={spark}
                margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
              >
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
