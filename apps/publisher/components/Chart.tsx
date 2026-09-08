"use client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import type { TimePoint } from "@/lib/mock-data";

const AXIS_STYLE = { fontSize: 11, fill: "#737373" };

// String-enum format so we can pass this from Server Components across the RSC
// boundary. Functions can't cross the server/client boundary in RSC.
export type ChartFormat = "currency" | "compact" | "number" | "percent";

const FORMATTERS: Record<ChartFormat, (n: number) => string> = {
  currency: (n) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
  compact: (n) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n),
  number: (n) => new Intl.NumberFormat("en-US").format(n),
  percent: (n) => `${n}%`,
};

function resolveFormatter(format?: ChartFormat) {
  return format ? FORMATTERS[format] : FORMATTERS.compact;
}

type LineProps = {
  data: TimePoint[];
  color?: string;
  height?: number;
  format?: ChartFormat;
};

export function LineChartBlock({
  data,
  color = "#4f46e5",
  height = 240,
  format,
}: LineProps) {
  const fmt = resolveFormatter(format);
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="#f5f5f5" vertical={false} />
          <XAxis
            dataKey="date"
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
            minTickGap={24}
          />
          <YAxis
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
            width={44}
            tickFormatter={fmt}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #e5e5e5",
            }}
            formatter={(value: number) => fmt(value)}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

type BarProps = {
  data: TimePoint[];
  color?: string;
  height?: number;
  format?: ChartFormat;
};

export function BarChartBlock({
  data,
  color = "#4f46e5",
  height = 240,
  format,
}: BarProps) {
  const fmt = resolveFormatter(format);
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="#f5f5f5" vertical={false} />
          <XAxis
            dataKey="date"
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
            minTickGap={24}
          />
          <YAxis
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
            width={44}
            tickFormatter={fmt}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #e5e5e5",
            }}
            formatter={(value: number) => fmt(value)}
          />
          <Bar dataKey="value" fill={color} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
