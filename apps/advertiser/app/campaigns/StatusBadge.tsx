import clsx from "clsx";
import type { CampaignStatus } from "@/lib/mock-data";

const STYLES: Record<CampaignStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
  ended: "bg-neutral-100 text-neutral-600 border-neutral-200",
  draft: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

export function StatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
        STYLES[status],
      )}
    >
      {status}
    </span>
  );
}
