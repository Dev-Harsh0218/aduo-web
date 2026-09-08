import { AppShell } from "@/components/AppShell";
import { IntegrationClient } from "./IntegrationClient";
import { APPS } from "@/lib/mock-data";

export const metadata = { title: "Integration · Aduo Publisher" };

export default async function IntegrationPage(
  props: PageProps<"/integration">,
) {
  const searchParams = (await props.searchParams) as {
    app?: string | string[];
  };
  const preselect = Array.isArray(searchParams.app)
    ? searchParams.app[0]
    : searchParams.app;

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Integration guide
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Drop the Aduo SDK into your Android app in three steps.
        </p>
      </div>
      <IntegrationClient
        apps={APPS.map((a) => ({
          id: a.id,
          name: a.name,
          sdkKey: a.sdkKey,
          packageName: a.packageName,
        }))}
        preselectId={preselect}
      />
    </AppShell>
  );
}
