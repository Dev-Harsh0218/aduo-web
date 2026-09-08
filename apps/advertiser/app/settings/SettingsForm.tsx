"use client";
import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function SettingsForm() {
  const [orgName, setOrgName] = useState("Acme Ads Inc.");
  const [billingEmail, setBillingEmail] = useState("billing@acme.com");
  const [notifyPerf, setNotifyPerf] = useState(true);
  const [notifyBudget, setNotifyBudget] = useState(true);
  const [notifyWeekly, setNotifyWeekly] = useState(false);
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
      <Input
        label="Organization name"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
      />
      <Input
        label="Billing email"
        type="email"
        value={billingEmail}
        onChange={(e) => setBillingEmail(e.target.value)}
      />

      <div>
        <div className="text-xs font-medium text-neutral-700 mb-2">
          Notifications
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-neutral-800">
            <input
              type="checkbox"
              checked={notifyPerf}
              onChange={(e) => setNotifyPerf(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
            />
            Alert me on performance anomalies
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-800">
            <input
              type="checkbox"
              checked={notifyBudget}
              onChange={(e) => setNotifyBudget(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
            />
            Alert me when a campaign hits 90% of budget
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-800">
            <input
              type="checkbox"
              checked={notifyWeekly}
              onChange={(e) => setNotifyWeekly(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
            />
            Send me a weekly performance email
          </label>
        </div>
      </div>

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
