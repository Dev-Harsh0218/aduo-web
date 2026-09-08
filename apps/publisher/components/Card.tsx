import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
};

export function Card({
  title,
  subtitle,
  actions,
  children,
  className,
  padded = true,
}: Props) {
  return (
    <section
      className={clsx(
        "rounded-lg border border-neutral-200 bg-white",
        className,
      )}
    >
      {(title || actions) && (
        <header className="flex items-start justify-between px-5 py-4 border-b border-neutral-200">
          <div>
            {title && (
              <h2 className="text-sm font-semibold text-neutral-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </section>
  );
}
