import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { getBulls } from "@/lib/content";
import { AdminShell } from "@/components/admin/AdminShell";
import { BullManager } from "@/components/admin/BullManager";

export default async function AdminBullsPage() {
  if (!(await isLoggedIn())) redirect("/admin/login");
  const bulls = await getBulls();
  return (
    <AdminShell active="bulls">
      <BullManager kind="bulls" initialItems={bulls} />
    </AdminShell>
  );
}
