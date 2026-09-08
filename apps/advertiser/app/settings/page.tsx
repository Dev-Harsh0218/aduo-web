import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { SettingsForm } from "./SettingsForm";

export const metadata = { title: "Settings · Aduo Advertiser" };

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Settings
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Manage your organization profile and notification preferences.
        </p>
      </div>
      <div className="max-w-2xl">
        <Card title="Organization" subtitle="Changes are not persisted in this demo.">
          <SettingsForm />
        </Card>
      </div>
    </AppShell>
  );
}
