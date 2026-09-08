"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRightLeft, LogOut } from "lucide-react";

const ADVERTISER_URL = process.env.NEXT_PUBLIC_ADVERTISER_URL || "https://advertiser-xi.vercel.app";

type Props = {
  email?: string;
};

export function Header({ email = "you@example.com" }: Props) {
  const router = useRouter();

  function signOut() {
    document.cookie =
      "aduo_signed_in=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "aduo_email=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/signin");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-neutral-200 bg-white/85 backdrop-blur px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-sm font-semibold text-neutral-900"
        >
          Aduo · Publisher
        </Link>
        <a
          href={ADVERTISER_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800"
        >
          <ArrowRightLeft size={12} />
          Switch to Advertiser
        </a>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-xs text-neutral-500">
          {email}
        </span>
        <button
          onClick={signOut}
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50"
        >
          <LogOut size={12} />
          Sign out
        </button>
      </div>
    </header>
  );
}
