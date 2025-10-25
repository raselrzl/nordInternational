import { requireRoleAccess } from "../../roleBaseAccess";
import PackageForm from "./PackageForm";

export default async function AdvertisementPackagesPage() {
  await requireRoleAccess(["EDITOR", "SUPERADMIN"]);

  return (
    <div className="p-6">
      <PackageForm />
    </div>
  );
}
