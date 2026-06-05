"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="w-14 h-14 mx-auto rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-5">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
              Something went wrong
            </h1>

            <p className="text-sm text-neutral-500 leading-relaxed mb-6">
              DevBoard encountered an unexpected error. Try refreshing the page
              or return later.
            </p>

            <button
              onClick={() => reset()}
              className="px-4 py-2 rounded-lg cursor-pointer bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
