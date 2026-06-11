import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { getCows } from "@/lib/content";
import { AdminShell } from "@/components/admin/AdminShell";
import { BullManager } from "@/components/admin/BullManager";

export default async function AdminCowsPage() {
  if (!(await isLoggedIn())) redirect("/admin/login");
  const cows = await getCows();
  return (
    <AdminShell active="cows">
      <BullManager kind="cows" initialItems={cows} />
    </AdminShell>
  );
}
