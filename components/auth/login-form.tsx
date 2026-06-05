"use client";

import { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  action: (formData: FormData) => Promise<{ error?: string } | undefined>;
}

export function LoginForm({ action }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const data = new FormData(e.currentTarget);
    const email = (data.get("email") as string).trim();
    const password = data.get("password") as string;
    const errors: typeof fieldErrors = {};

    if (!email) errors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email address.";

    if (!password) errors.password = "Password is required.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setPending(true);

    try {
      const result = await action(data);
      if (result?.error) {
        setServerError(result.error);
      }
    } finally {
      setPending(false);
    }
  }

  const inputBase =
    "w-full text-sm text-neutral-900 placeholder:text-neutral-300 bg-neutral-50 border rounded-lg px-3.5 py-2.5 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const inputNormal =
    "border-neutral-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100";
  const inputError =
    "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-3"
    >
      {/* Server error */}
      {serverError && (
        <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-lg bg-red-50 border border-red-200">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-500 mt-0.5 shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-xs text-red-600 leading-relaxed">{serverError}</p>
        </div>
      )}

      {/* Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs font-semibold uppercase tracking-widest text-neutral-400"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="john@example.com"
          disabled={pending}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          className={`${inputBase} ${fieldErrors.email ? inputError : inputNormal}`}
        />
        <div className="min-h-[16px]">
          {fieldErrors.email && (
            <p
              id="email-error"
              role="alert"
              className="text-[11px] text-red-500"
            >
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-xs font-semibold uppercase tracking-widest text-neutral-400"
          >
            Password
          </label>
          {/* <a
            href="#"
            tabIndex={0}
            className="text-[11px] text-neutral-400 hover:text-neutral-700 transition-colors underline-offset-2 hover:underline"
          >
            Forgot password?
          </a> */}
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={pending}
            aria-invalid={!!fieldErrors.password}
            aria-describedby={
              fieldErrors.password ? "password-error" : undefined
            }
            className={`${inputBase} pr-10 ${fieldErrors.password ? inputError : inputNormal}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            disabled={pending}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 focus:outline-none focus:text-neutral-700 transition-colors disabled:opacity-40"
          >
            {showPassword ? (
              <EyeOff size={15} strokeWidth={1.8} />
            ) : (
              <Eye size={15} strokeWidth={1.8} />
            )}
          </button>
        </div>
        <div className="min-h-[16px]">
          {fieldErrors.password && (
            <p
              id="password-error"
              role="alert"
              className="text-[11px] text-red-500"
            >
              {fieldErrors.password}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-neutral-900 disabled:active:scale-100 mt-1"
      >
        {pending ? (
          <>
            <svg
              className="animate-spin"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Signing in…
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
