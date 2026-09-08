"use client";
import { useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { Select } from "@/components/Input";
import { CopyButton } from "@/components/CopyButton";

type App = {
  id: string;
  name: string;
  sdkKey: string;
  packageName: string;
};

type Props = {
  apps: App[];
  preselectId?: string;
};

export function IntegrationClient({ apps, preselectId }: Props) {
  const initialId =
    (preselectId && apps.find((a) => a.id === preselectId)?.id) ||
    apps[0]?.id ||
    "";
  const [selected, setSelected] = useState(initialId);
  const app = apps.find((a) => a.id === selected);

  const gradleSnippet = useMemo(
    () => `dependencies {
    implementation("com.aduo:aduo-android-sdk:1.0.0")
}`,
    [],
  );

  const kotlinSnippet = useMemo(() => {
    const key = app?.sdkKey ?? "sdk_test_YOUR_KEY_HERE";
    return `import com.aduo.sdk.Aduo
import com.aduo.sdk.AduoConfig

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Aduo.initialize(
            context = this,
            config = AduoConfig(
                sdkKey = "${key}",
                testMode = false,
            ),
        )
    }
}

// Later, when showing an ad:
Aduo.loadInterstitial(this) { ad ->
    ad?.show(this)
}`;
  }, [app]);

  return (
    <div className="space-y-6">
      <Card
        title="Select an app"
        subtitle="Snippets below will auto-inject the selected app's SDK key."
      >
        <div className="max-w-sm">
          <Select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {apps.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} — {a.packageName}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      <Card
        title="1. Add the SDK to your Gradle build"
        subtitle="Add the following to your app-module build.gradle.kts:"
        actions={<CopyButton text={gradleSnippet} label="Copy" />}
      >
        <pre className="rounded-md bg-neutral-900 text-neutral-100 text-xs leading-relaxed p-4 overflow-x-auto">
          <code>{gradleSnippet}</code>
        </pre>
      </Card>

      <Card
        title="2. Initialize in your Application class"
        subtitle="Kotlin — includes your SDK key for this app."
        actions={<CopyButton text={kotlinSnippet} label="Copy" />}
      >
        <pre className="rounded-md bg-neutral-900 text-neutral-100 text-xs leading-relaxed p-4 overflow-x-auto whitespace-pre">
          <code>{kotlinSnippet}</code>
        </pre>
      </Card>

      <Card
        title="3. Verify the integration"
        subtitle="Once your app runs, impressions will appear on the dashboard within minutes."
      >
        <ol className="list-decimal pl-5 text-sm text-neutral-700 space-y-1.5">
          <li>Run your app on a device or emulator with internet access.</li>
          <li>
            Trigger an ad load — you should see a test creative served in test
            mode.
          </li>
          <li>
            Return to the{" "}
            <a
              href="/dashboard"
              className="text-indigo-600 hover:text-indigo-700"
            >
              dashboard
            </a>{" "}
            to confirm impressions were counted.
          </li>
        </ol>
      </Card>
    </div>
  );
}
