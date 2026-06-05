import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-neutral-100 border border-neutral-200 mb-5">
          <span className="text-lg font-semibold text-neutral-700">404</span>
        </div>

        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
          Page not found
        </h1>

        <p className="text-sm text-neutral-500 leading-relaxed mb-6">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/"
            className="px-4 py-2 rounded-lg cursor-pointer border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
