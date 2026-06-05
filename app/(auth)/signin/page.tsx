import { LoginForm } from "@/components/auth/login-form";
import { loginUserAction } from "@/app/actions/auth.actions";

export default function LoginPage() {
  return (
    <div className="h-screen overflow-hidden bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-[460px] space-y-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-neutral-900">
            DevBoard
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="px-7 pt-5 pb-4 border-b border-neutral-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
              Welcome Back
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-1">
              Sign in to your account
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Continue managing your projects, tasks, and todos.
            </p>
          </div>

          {/* Form */}
          <div className="px-7 py-4">
            <LoginForm action={loginUserAction} />
          </div>

          {/* Footer */}
          <div className="px-7 py-4 bg-neutral-50 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-500">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-neutral-900 font-semibold hover:underline underline-offset-2"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>

        {/* Trust row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "M3 7h18M3 12h18M3 17h18", label: "Manage Projects" },
            {
              icon: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
              label: "Track Tasks",
            },
            {
              icon: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
              label: "Organize Todos",
            },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="bg-white rounded-lg border border-neutral-100 px-3 py-3 flex flex-col items-center gap-1.5 text-center"
            >
              <div className="w-7 h-7 rounded-md bg-neutral-100 flex items-center justify-center">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-600"
                >
                  <path d={icon} />
                </svg>
              </div>
              <span className="text-[10px] font-medium text-neutral-500 leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
