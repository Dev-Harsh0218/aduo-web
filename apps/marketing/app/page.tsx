export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-semibold text-lg tracking-tight">Aduo</div>
          <div className="flex items-center gap-6 text-sm text-neutral-600">
            <a href="#how" className="hover:text-neutral-900">How it works</a>
            <a href="#for-publishers" className="hover:text-neutral-900">Publishers</a>
            <a href="#for-advertisers" className="hover:text-neutral-900">Advertisers</a>
            <a
              href="https://github.com/Dev-Harsh0218/aduo"
              className="hover:text-neutral-900"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 mb-6">
            v0.1 · early preview
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-neutral-900">
            In-app advertising built for
            <br />
            <span className="text-neutral-500">the two-sided reality.</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Publishers drop in a Kotlin SDK and start monetizing. Advertisers manage
            campaigns from a clean console. Multi-tenant billing, async impression
            tracking, and a fail-open SDK that never blocks your app&apos;s UI thread.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#for-publishers"
              className="inline-flex items-center rounded-md bg-neutral-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-neutral-800 transition"
            >
              I want to show ads →
            </a>
            <a
              href="#for-advertisers"
              className="inline-flex items-center rounded-md border border-neutral-300 text-neutral-900 text-sm font-medium px-5 py-2.5 hover:bg-neutral-50 transition"
            >
              I want to run ads →
            </a>
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            Free during early preview. Both panels are live — sign in with any email.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">How it works</h2>
          <p className="mt-2 text-neutral-600 max-w-2xl">
            A single backend serves both sides of the market. Everything is multi-tenant
            from day one, so billing separation is automatic and one deploy scales to N orgs.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <div className="text-xs font-medium text-neutral-500 mb-3">1 · Publisher integrates</div>
              <div className="font-medium text-neutral-900 mb-2">Drop in the Kotlin SDK</div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Add the SDK to your Android app, call <code className="text-xs bg-neutral-100 rounded px-1">showBanner()</code>,{" "}
                <code className="text-xs bg-neutral-100 rounded px-1">showInterstitial()</code>, or{" "}
                <code className="text-xs bg-neutral-100 rounded px-1">showPopup()</code>. Fail-open — no blocked UI.
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <div className="text-xs font-medium text-neutral-500 mb-3">2 · Advertiser configures</div>
              <div className="font-medium text-neutral-900 mb-2">Create campaigns in the console</div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Upload creatives, target apps/regions, set budget. Campaigns go live
                instantly across every publisher on the network.
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-6">
              <div className="text-xs font-medium text-neutral-500 mb-3">3 · Backend fans out</div>
              <div className="font-medium text-neutral-900 mb-2">Async billing, real-time serve</div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Every impression + click is queued asynchronously — ad-serve latency stays
                sub-100 ms. Billing rolls up per tenant on a schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For publishers */}
      <section id="for-publishers" className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
          <div>
            <div className="text-xs font-medium text-neutral-500 mb-3">For publishers</div>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
              Monetize without the SDK bloat.
            </h2>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              Aduo&apos;s Kotlin SDK is native Android — no Flutter runtime, no
              multi-megabyte JS bundle riding along in your APK. Small footprint,
              real lifecycle callbacks, works with your app instead of fighting it.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-700">
              <li className="flex gap-2"><span className="text-neutral-400">•</span> Native Kotlin — 3 MB SDK, no Flutter runtime tax</li>
              <li className="flex gap-2"><span className="text-neutral-400">•</span> Trigger callbacks (<code className="text-xs bg-neutral-100 rounded px-1">onAdShown</code>, <code className="text-xs bg-neutral-100 rounded px-1">onAdClicked</code>, <code className="text-xs bg-neutral-100 rounded px-1">onAdClosed</code>) — hook game/app logic to ad lifecycle</li>
              <li className="flex gap-2"><span className="text-neutral-400">•</span> Fail-open — backend down means SDK returns null, not a crashed UI thread</li>
              <li className="flex gap-2"><span className="text-neutral-400">•</span> Revenue dashboard with hourly resolution</li>
            </ul>
            <a
              href="https://publisher-rust.vercel.app"
              className="mt-8 inline-flex items-center rounded-md bg-neutral-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-neutral-800 transition"
            >
              Open publisher panel →
            </a>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-950 p-6 text-sm font-mono text-neutral-300 overflow-x-auto">
            <div className="text-xs text-neutral-500 mb-3">// Kotlin — the whole integration</div>
            <pre className="leading-relaxed">
{`import dev.aduo.sdk.Aduo

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        Aduo.init(this, sdkId = "your-sdk-key")

        Aduo.showBanner(
            container = findViewById(R.id.ad_slot),
            onAdShown  = { logEvent("ad_shown") },
            onAdClicked = { logEvent("ad_clicked") },
        )
    }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* For advertisers */}
      <section id="for-advertisers" className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-xs font-medium text-neutral-500 mb-3">For advertisers</div>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
              Reach real users. Skip the ad-tech theatre.
            </h2>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              Aduo&apos;s console is opinionated. Upload creatives, set budgets, pick
              app categories or specific publishers — go live in minutes. No IAB
              taxonomy PhD required.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-700">
              <li className="flex gap-2"><span className="text-neutral-400">•</span> Bulk creative upload — 50 images at a time</li>
              <li className="flex gap-2"><span className="text-neutral-400">•</span> Date-range analytics with per-app breakdown</li>
              <li className="flex gap-2"><span className="text-neutral-400">•</span> Async billing rolled up daily, invoiced monthly</li>
              <li className="flex gap-2"><span className="text-neutral-400">•</span> SSE-powered live counters — impressions update as they happen</li>
            </ul>
            <a
              href="https://advertiser-xi.vercel.app"
              className="mt-8 inline-flex items-center rounded-md border border-neutral-300 bg-white text-neutral-900 text-sm font-medium px-5 py-2.5 hover:bg-neutral-50 transition"
            >
              Open advertiser console →
            </a>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-6">
            <div className="text-xs text-neutral-500 mb-4">campaign · Q4 launch</div>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-500">Impressions today</div>
                <div className="text-3xl font-semibold text-neutral-900 tabular-nums">14,832</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500">CTR</div>
                <div className="text-2xl font-semibold text-neutral-900 tabular-nums">2.14%</div>
              </div>
              <div className="h-24 rounded bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100"></div>
              <div className="text-xs text-neutral-500">Preview mockup — the real console is <a href="https://advertiser-xi.vercel.app" className="underline hover:text-neutral-900">live here</a>.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Both panels are live */}
      <section id="try-it" className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">Both panels are live. Try them.</h2>
          <p className="mt-3 text-neutral-600 max-w-xl mx-auto">
            Sign in with any email and password — data is mocked, no signup required.
            Click around, kick the tires, then browse the code on GitHub.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://advertiser-xi.vercel.app"
              className="inline-flex items-center rounded-md bg-neutral-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-neutral-800 transition"
            >
              Advertiser console →
            </a>
            <a
              href="https://publisher-rust.vercel.app"
              className="inline-flex items-center rounded-md bg-neutral-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-neutral-800 transition"
            >
              Publisher panel →
            </a>
            <a
              href="https://github.com/Dev-Harsh0218/aduo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md border border-neutral-300 text-neutral-900 text-sm font-medium px-5 py-2.5 hover:bg-neutral-50 transition"
            >
              See the code on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-500">
          <div>© {new Date().getFullYear()} Aduo. Built by <a className="underline hover:text-neutral-900" href="https://github.com/Dev-Harsh0218">Harsh Bhardwaj</a>.</div>
          <div className="flex gap-5">
            <a href="https://github.com/Dev-Harsh0218/aduo" className="hover:text-neutral-900">GitHub</a>
            <a href="https://linkedin.com/in/bhardwajharsh1802" className="hover:text-neutral-900">LinkedIn</a>
            <a href="mailto:mailharsh0218@gmail.com" className="hover:text-neutral-900">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
