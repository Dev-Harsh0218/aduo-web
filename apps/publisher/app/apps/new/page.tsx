import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { NewAppForm } from "./NewAppForm";

export const metadata = { title: "Register app · Aduo Publisher" };

export default function NewAppPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Register a new app
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Get an SDK key you can drop into your Android or iOS build.
        </p>
      </div>
      <div className="max-w-2xl">
        <Card
          title="App details"
          subtitle="This is a demo — no data is persisted."
        >
          <NewAppForm />
        </Card>
      </div>
    </AppShell>
  );
}
