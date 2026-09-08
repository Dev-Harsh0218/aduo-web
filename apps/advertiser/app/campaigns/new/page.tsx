import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { NewCampaignForm } from "./NewCampaignForm";
import { TARGET_APPS } from "@/lib/mock-data";

export const metadata = { title: "New campaign · Aduo Advertiser" };

export default function NewCampaignPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          New campaign
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Fill in the details below. This is a demo — nothing is stored.
        </p>
      </div>
      <div className="max-w-3xl">
        <Card
          title="Campaign details"
          subtitle="These fields are mocked and not persisted."
        >
          <NewCampaignForm apps={TARGET_APPS} />
        </Card>
      </div>
    </AppShell>
  );
}
