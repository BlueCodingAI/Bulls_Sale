import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { getImageOverrides } from "@/lib/content";
import { imageSlots } from "@/lib/imageSlots";
import { AdminShell } from "@/components/admin/AdminShell";
import { ImagesManager } from "@/components/admin/ImagesManager";

export default async function AdminImagesPage() {
  if (!(await isLoggedIn())) redirect("/admin/login");
  const overrides = await getImageOverrides();
  return (
    <AdminShell active="images">
      <ImagesManager slots={imageSlots} initialOverrides={overrides} />
    </AdminShell>
  );
}
