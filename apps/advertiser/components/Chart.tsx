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

type LineProps = {
  data: TimePoint[];
  color?: string;
  height?: number;
  formatValue?: (n: number) => string;
};

export function LineChartBlock({
  data,
  color = "#4f46e5",
  height = 240,
  formatValue,
}: LineProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 16, bottom: 0, left: 0 }}
        >
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
            tickFormatter={
              formatValue ??
              ((v: number) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(v))
            }
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #e5e5e5",
            }}
            formatter={(value: number) =>
              formatValue
                ? formatValue(value)
                : new Intl.NumberFormat("en-US").format(value)
            }
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
  formatValue?: (n: number) => string;
};

export function BarChartBlock({
  data,
  color = "#4f46e5",
  height = 240,
  formatValue,
}: BarProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 16, bottom: 0, left: 0 }}
        >
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
            tickFormatter={
              formatValue ??
              ((v: number) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(v))
            }
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #e5e5e5",
            }}
            formatter={(value: number) =>
              formatValue
                ? formatValue(value)
                : new Intl.NumberFormat("en-US").format(value)
            }
          />
          <Bar dataKey="value" fill={color} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
