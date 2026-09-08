import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export async function AppShell({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const email = cookieStore.get("aduo_email")?.value || "you@example.com";
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header email={email} />
        <main className="flex-1 p-4 md:p-8 max-w-[1400px] w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
