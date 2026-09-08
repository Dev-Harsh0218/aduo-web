import clsx from "clsx";
import type { IntegrationStatus } from "@/lib/mock-data";

const STYLES: Record<IntegrationStatus, string> = {
  live: "bg-emerald-50 text-emerald-700 border-emerald-200",
  testing: "bg-amber-50 text-amber-700 border-amber-200",
  not_started: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

const LABEL: Record<IntegrationStatus, string> = {
  live: "Live",
  testing: "Testing",
  not_started: "Not started",
};

export function StatusBadge({ status }: { status: IntegrationStatus }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        STYLES[status],
      )}
    >
      {LABEL[status]}
    </span>
  );
}
