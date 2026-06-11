import { redirect } from "next/navigation";
import { isLoggedIn, isConfigured } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  if (await isLoggedIn()) redirect("/admin");
  const configured = isConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm rounded-2xl border border-cream/15 bg-cream p-8 shadow-card">
        <h1 className="font-display text-2xl text-ink">Rocking C — Admin</h1>
        <p className="mt-1 text-sm text-ink/60">Sign in to manage the herd and photos.</p>

        {configured ? (
          <LoginForm />
        ) : (
          <div className="mt-6 rounded-lg border border-rust/30 bg-rust/5 p-4 text-sm text-ink/75">
            <p className="font-semibold text-rust">Admin isn&apos;t set up yet.</p>
            <p className="mt-2">
              Add an <code className="rounded bg-ink/10 px-1">ADMIN_PASSWORD</code> (and a
              long random <code className="rounded bg-ink/10 px-1">ADMIN_SESSION_SECRET</code>)
              to the environment, then restart the site.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
