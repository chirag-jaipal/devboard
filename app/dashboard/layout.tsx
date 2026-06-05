"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Menu,
  X,
  ChevronRight,
  Zap,
} from "lucide-react";

const NAV_LINKS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    label: "Todos",
    href: "/dashboard/todos",
    icon: CheckSquare,
  },
];

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
        transition-all duration-150 relative
        ${
          active
            ? "bg-neutral-100 text-neutral-900"
            : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50"
        }
      `}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-neutral-900 rounded-full -ml-px" />
      )}
      <Icon
        size={16}
        strokeWidth={active ? 2.2 : 1.8}
        className={`shrink-0 transition-colors ${
          active
            ? "text-neutral-900"
            : "text-neutral-400 group-hover:text-neutral-600"
        }`}
      />
      <span className="truncate">{label}</span>
      {active && (
        <ChevronRight
          size={13}
          className="ml-auto text-neutral-400"
          strokeWidth={2}
        />
      )}
    </Link>
  );
}

function Sidebar({
  pathname,
  onClose,
  mobile = false,
}: {
  pathname: string;
  onClose?: () => void;
  mobile?: boolean;
}) {
  return (
    <aside
      className={`
        flex flex-col h-full bg-white
        ${mobile ? "w-full" : "w-[220px] border-r border-neutral-100"}
      `}
    >
      {/* Logo / App Name */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-neutral-100 shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-md bg-neutral-900 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Zap size={13} className="text-white" strokeWidth={2.5} />
          </div>

          <span className="text-sm font-semibold tracking-tight text-neutral-900">
            DevBoard
          </span>
        </Link>
        {mobile && onClose && (
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 px-3 mb-2">
          Menu
        </p>
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            active={pathname === link.href}
            onClick={mobile ? onClose : undefined}
          />
        ))}
      </nav>

      {/* Bottom user block */}
      <div className="px-3 py-4 border-t border-neutral-100 shrink-0">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-50 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-400 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-semibold text-white">C</span>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-neutral-800 truncate">
              Chirag
            </p>

            <p className="text-[10px] text-neutral-400 truncate">
              chirag@devboard.io
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const getCurrentPage = () => {
    if (pathname === "/dashboard/profile") {
      return "Profile";
    }

    if (pathname.startsWith("/dashboard/projects")) {
      return "Projects";
    }

    if (pathname.startsWith("/dashboard/todos")) {
      return "Todos";
    }

    return "Dashboard";
  };

  const currentPage = getCurrentPage();

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* ── Desktop Sidebar ── */}
      <div className="hidden md:flex md:shrink-0">
        <Sidebar pathname={pathname} />
      </div>

      {/* ── Mobile Drawer Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile Sidebar Drawer ── */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-72 md:hidden
          transform transition-transform duration-250 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar
          pathname={pathname}
          onClose={() => setMobileOpen(false)}
          mobile
        />
      </div>

      {/* ── Main Column ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-14 bg-white border-b border-neutral-100 flex items-center justify-between px-4 md:px-6 shrink-0 z-20">
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile) */}
            <button
              className="md:hidden text-neutral-500 hover:text-neutral-800 transition-colors p-1.5 -ml-1.5 rounded-md hover:bg-neutral-100"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>

            {/* Breadcrumb / Page title */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-neutral-400 hidden sm:block">
                DevBoard
              </span>
              <ChevronRight
                size={13}
                className="text-neutral-300 hidden sm:block"
              />
              <span className="text-sm font-semibold text-neutral-800">
                {currentPage}
              </span>
            </div>
          </div>

          {/* Right: Avatar + Name */}
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-medium text-neutral-600 hidden sm:block">
              Chirag
            </span>
            <Link href="/dashboard/profile">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-400 flex items-center justify-center ring-2 ring-white cursor-pointer hover:ring-neutral-200 transition-all">
                <span className="text-xs font-semibold text-white select-none">
                  C
                </span>
              </div>
            </Link>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
