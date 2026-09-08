import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { SettingsForm } from "./SettingsForm";

export const metadata = { title: "Settings · Aduo Publisher" };

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Payout settings
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Manage how you get paid. Nothing here is persisted in this demo.
        </p>
      </div>
      <div className="max-w-2xl">
        <Card title="Payout" subtitle="Preferred payout method and threshold">
          <SettingsForm />
        </Card>
      </div>
    </AppShell>
  );
}
