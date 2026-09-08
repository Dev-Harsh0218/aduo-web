"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    // Stub cookie — any credentials work.
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
      <div className="text-center text-xs text-neutral-500">
        No account? Just type anything — it&apos;s a demo.
      </div>
    </form>
  );
}
