"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

const DEMO_EMAIL = "demo@aduo.dev";
const DEMO_PASSWORD = "demo123";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Enter an email and password to continue.");
      return;
    }
    setLoading(true);
    const oneWeek = 60 * 60 * 24 * 7;
    document.cookie = `aduo_signed_in=true; Path=/; Max-Age=${oneWeek}; SameSite=Lax`;
    document.cookie = `aduo_email=${encodeURIComponent(email)}; Path=/; Max-Age=${oneWeek}; SameSite=Lax`;
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
      />
      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      {error && <div className="text-xs text-red-600">{error}</div>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>
      <div className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
        <div className="font-medium text-neutral-800 mb-0.5">Demo credentials (pre-filled)</div>
        <div>email: <span className="font-mono">{DEMO_EMAIL}</span></div>
        <div>password: <span className="font-mono">{DEMO_PASSWORD}</span></div>
        <div className="text-neutral-500 mt-1">Any email + password works — data is mocked.</div>
      </div>
    </form>
  );
}
