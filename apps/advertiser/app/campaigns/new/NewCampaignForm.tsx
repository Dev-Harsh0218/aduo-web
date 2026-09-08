"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@/components/Input";
import { Button } from "@/components/Button";

type App = { id: string; name: string };

export function NewCampaignForm({ apps }: { apps: App[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("5000");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [targets, setTargets] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [creativeName, setCreativeName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function toggleTarget(id: string) {
    setTargets((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setCreativeName(file ? file.name : null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate a quick save then redirect.
    setTimeout(() => router.push("/campaigns"), 300);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Campaign name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Winter Launch"
        required
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Budget (USD)"
          type="number"
          min={1}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <Input
          label="Start date"
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
        <Input
          label="End date"
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
      </div>

      <div>
        <div className="text-xs font-medium text-neutral-700 mb-2">
          Target apps
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {apps.map((a) => (
            <label
              key={a.id}
              className="flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={targets.includes(a.id)}
                onChange={() => toggleTarget(a.id)}
                className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
              />
              {a.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-medium text-neutral-700 mb-1.5">
          Creative image
        </div>
        <label className="flex items-center justify-between rounded-md border border-dashed border-neutral-300 px-3 py-4 text-sm text-neutral-600 hover:bg-neutral-50 cursor-pointer">
          <span>
            {creativeName ? (
              <>
                Selected:{" "}
                <span className="font-medium text-neutral-900">
                  {creativeName}
                </span>
              </>
            ) : (
              "Click to upload — kept in memory only."
            )}
          </span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFile}
          />
          <span className="text-xs font-medium text-indigo-600">Browse</span>
        </label>
      </div>

      <Textarea
        label="Notes (optional)"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Internal notes about this campaign"
      />

      <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/campaigns")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating…" : "Create campaign"}
        </Button>
      </div>
    </form>
  );
}
