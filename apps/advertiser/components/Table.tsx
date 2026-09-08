import type { ReactNode } from "react";
import clsx from "clsx";

export type Column<T> = {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  empty?: ReactNode;
};

export function Table<T>({ columns, rows, rowKey, empty }: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            {columns.map((c) => (
              <th
                key={c.key}
                className={clsx(
                  "px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-neutral-500",
                  c.align === "right" && "text-right",
                  c.align === "center" && "text-center",
                  !c.align && "text-left",
                  c.className,
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-neutral-500"
              >
                {empty ?? "No data yet."}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60"
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={clsx(
                    "px-4 py-3 text-neutral-800",
                    c.align === "right" && "text-right tabular-nums",
                    c.align === "center" && "text-center",
                    c.className,
                  )}
                >
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
