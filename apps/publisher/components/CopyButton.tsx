"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import clsx from "clsx";

type Props = {
  text: string;
  label?: string;
  size?: "sm" | "md";
  className?: string;
};

export function CopyButton({
  text,
  label = "Copy",
  size = "sm",
  className,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } finally {
        document.body.removeChild(ta);
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white font-medium text-neutral-700 hover:bg-neutral-50 transition",
        size === "sm" && "px-2.5 py-1.5 text-xs",
        size === "md" && "px-3 py-2 text-sm",
        className,
      )}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : label}
    </button>
  );
}
