import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";

const tabs = [
  { id: "dashboard", label: "Dashboard", href: "/admin" },
  { id: "bulls", label: "Bulls", href: "/admin/bulls" },
  { id: "cows", label: "Cows", href: "/admin/cows" },
  { id: "images", label: "Images", href: "/admin/images" },
] as const;

export function AdminShell({
  active,
  children,
}: {
  active: (typeof tabs)[number]["id"];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream/80">
      <header className="sticky top-0 z-40 border-b border-ink/15 bg-ink text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
          <span className="font-display text-xl tracking-wide text-gold-soft">
            Rocking&nbsp;C · Admin
          </span>
          <nav className="flex flex-wrap items-center gap-1">
            {tabs.map((t) => (
              <Link
                key={t.id}
                href={t.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active === t.id
                    ? "bg-cream text-ink"
                    : "text-cream/75 hover:bg-cream/10 hover:text-cream"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-cream/70 underline-offset-4 hover:text-cream hover:underline"
            >
              View site ↗
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
