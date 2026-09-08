"use client";
import { useState } from "react";
import { Input, Select } from "@/components/Input";
import { Button } from "@/components/Button";

export function SettingsForm() {
  const [method, setMethod] = useState("ach");
  const [threshold, setThreshold] = useState("100");
  const [taxId, setTaxId] = useState("");
  const [country, setCountry] = useState("US");
  const [autoPayout, setAutoPayout] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 400);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Payout method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="ach">ACH bank transfer</option>
          <option value="wire">International wire</option>
          <option value="paypal">PayPal</option>
          <option value="check">Paper check</option>
        </Select>
        <Input
          label="Minimum payout threshold (USD)"
          type="number"
          min={1}
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Tax ID / EIN"
          value={taxId}
          onChange={(e) => setTaxId(e.target.value)}
          placeholder="XX-XXXXXXX"
        />
        <Select
          label="Country of residence"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="IN">India</option>
          <option value="DE">Germany</option>
          <option value="OTHER">Other</option>
        </Select>
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-800">
        <input
          type="checkbox"
          checked={autoPayout}
          onChange={(e) => setAutoPayout(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
        />
        Auto-payout when balance exceeds threshold
      </label>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
        {saved && (
          <span className="text-xs text-emerald-600">Saved (mock).</span>
        )}
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
