export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md text-center px-6">
        <div className="text-xs font-medium text-neutral-500 mb-4">Aduo · Publisher Panel</div>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">
          Coming soon.
        </h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">
          The publisher panel is under active development. In the meantime, browse the code
          on GitHub or ask for early access.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <a
            href="https://github.com/Dev-Harsh0218/aduo"
            className="inline-flex items-center rounded-md bg-neutral-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-neutral-800 transition"
          >
            View on GitHub
          </a>
          <a
            href="mailto:mailharsh0218@gmail.com?subject=Aduo%20publisher%20early%20access"
            className="inline-flex items-center rounded-md border border-neutral-300 text-neutral-900 text-sm font-medium px-5 py-2.5 hover:bg-neutral-50 transition"
          >
            Request early access
          </a>
        </div>
      </div>
    </main>
  );
}
