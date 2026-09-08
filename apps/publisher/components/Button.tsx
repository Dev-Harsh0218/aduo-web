"use client";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition disabled:opacity-50 disabled:cursor-not-allowed",
        size === "sm" && "text-sm px-3 py-1.5",
        size === "md" && "text-sm px-4 py-2",
        variant === "primary" &&
          "bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-600",
        variant === "secondary" &&
          "bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50",
        variant === "ghost" &&
          "text-neutral-700 hover:bg-neutral-100 border border-transparent",
        variant === "danger" &&
          "bg-red-600 text-white hover:bg-red-700 border border-red-600",
        className,
      )}
    >
      {children}
    </button>
  );
}
