"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Megaphone,
  LineChart,
  Settings,
  Zap,
} from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/analytics", label: "Analytics", icon: LineChart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-56 shrink-0 flex-col border-r border-neutral-200 bg-white">
      <div className="px-5 py-5 border-b border-neutral-200 flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-indigo-600 flex items-center justify-center text-white">
          <Zap size={14} />
        </div>
        <div className="text-sm font-semibold tracking-tight text-neutral-900">
          Aduo
        </div>
        <div className="text-xs text-neutral-500">Advertiser</div>
      </div>
      <nav className="p-3 space-y-0.5 flex-1">
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition",
                active
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-neutral-700 hover:bg-neutral-100",
              )}
            >
              <Icon size={16} className={active ? "text-indigo-600" : ""} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-neutral-200 text-xs text-neutral-500">
        v0.1 · Mock data
      </div>
    </aside>
  );
}
