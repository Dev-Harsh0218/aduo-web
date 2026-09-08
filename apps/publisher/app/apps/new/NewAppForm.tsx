"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Select } from "@/components/Input";
import { Button } from "@/components/Button";
import { CopyButton } from "@/components/CopyButton";
import { generateSdkKey } from "@/lib/mock-data";

export function NewAppForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [packageName, setPackageName] = useState("");
  const [platform, setPlatform] = useState("android");
  const [category, setCategory] = useState("games");
  const [submitting, setSubmitting] = useState(false);
  const [issuedKey, setIssuedKey] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Generate a fake SDK key and show it before redirecting.
    const key = generateSdkKey("test");
    setIssuedKey(key);
    setSubmitting(false);
  }

  if (issuedKey) {
    return (
      <div className="space-y-4">
        <div>
          <div className="text-xs font-medium text-emerald-700">
            App registered
          </div>
          <div className="text-sm text-neutral-800 mt-1">
            Save this SDK key somewhere safe — we won&apos;t show it again in the
            demo.
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2.5">
          <code className="flex-1 text-xs text-neutral-800 break-all">
            {issuedKey}
          </code>
          <CopyButton text={issuedKey} label="Copy key" />
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/apps")}
          >
            Back to apps
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/integration")}
          >
            Continue to integration
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="App name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Chess Master"
        required
      />
      <Input
        label="Package name"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
        placeholder="com.acme.chessmaster"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="android">Android</option>
          <option value="ios">iOS</option>
          <option value="web">Web</option>
        </Select>
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="games">Games</option>
          <option value="productivity">Productivity</option>
          <option value="social">Social</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/apps")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Generating…" : "Register app"}
        </Button>
      </div>
    </form>
  );
}
