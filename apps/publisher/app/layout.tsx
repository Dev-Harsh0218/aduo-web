import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aduo Publisher Panel",
  description: "Manage SDK keys, integration, and revenue for your Aduo-powered app.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-neutral-900">{children}</body>
    </html>
  );
}
