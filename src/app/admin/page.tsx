import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { getDashboardStats } from "@/lib/analytics";
import { AdminShell } from "@/components/admin/AdminShell";
import { DashboardView } from "@/components/admin/DashboardView";

export default async function AdminDashboardPage() {
  if (!(await isLoggedIn())) redirect("/admin/login");
  const stats = await getDashboardStats();
  return (
    <AdminShell active="dashboard">
      <DashboardView stats={stats} />
    </AdminShell>
  );
}
