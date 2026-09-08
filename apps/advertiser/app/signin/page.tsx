import { SignInForm } from "./SignInForm";
import { Zap } from "lucide-react";

export const metadata = {
  title: "Sign in · Aduo Advertiser",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center text-white">
              <Zap size={16} />
            </div>
            <div className="text-sm font-semibold text-neutral-900">
              Aduo · Advertiser
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Sign in to your workspace
          </h1>
          <p className="mt-1.5 text-sm text-neutral-500">
            Any email and password will work in this demo.
          </p>
          <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-6">
            <SignInForm />
          </div>
        </div>
      </div>
      <footer className="border-t border-neutral-200 bg-white px-6 py-4 text-center text-xs text-neutral-500">
        Learn more at{" "}
        <a
          href="https://marketing-mu-amber.vercel.app"
          className="text-indigo-600 hover:text-indigo-700"
        >
          marketing-mu-amber.vercel.app
        </a>
      </footer>
    </main>
  );
}
