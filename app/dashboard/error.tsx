"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // console.error(error);
    console.error("Dashboard error:", error);
    console.dir(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-6">
      <div className="w-full max-w-md text-center">
        <div className="w-12 h-12 mx-auto rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-4">
          <svg
            className="w-5 h-5 text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
          Unable to load this page
        </h2>

        <p className="text-sm text-neutral-500 mb-6">
          Something prevented this dashboard page from loading correctly.
        </p>

        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
