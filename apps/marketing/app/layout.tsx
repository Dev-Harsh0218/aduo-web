import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aduo — In-app advertising for indie devs",
  description:
    "Two-sided ad platform: publishers integrate a Kotlin SDK and monetize their apps, advertisers manage campaigns from a clean console. Multi-tenant, async billing, fail-open SDK.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-neutral-900">{children}</body>
    </html>
  );
}
