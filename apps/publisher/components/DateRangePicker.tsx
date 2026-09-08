"use client";
import { Input } from "./Input";

type Props = {
  start: string;
  end: string;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
};

export function DateRangePicker({
  start,
  end,
  onStartChange,
  onEndChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <Input
        label="Start"
        type="date"
        value={start}
        onChange={(e) => onStartChange(e.target.value)}
        wrapClassName="w-40"
      />
      <Input
        label="End"
        type="date"
        value={end}
        onChange={(e) => onEndChange(e.target.value)}
        wrapClassName="w-40"
      />
    </div>
  );
}
