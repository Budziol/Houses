import { GhostLink } from "@/components/links";
import { Plus } from "lucide-react";
import AdminsTable from "./components/admins-table";

const AdminsPage = () => {
  return (
    <section className="min-h-screen w-full flex pt-30 pb-20 px-8">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-10">
        <div className="flex gap-10 justify-between items-center">
          <h2 className="">Administratorzy</h2>
          <GhostLink href={"/admin/admini/nowy"}>
            <Plus size={18} /> Dodaj admina
          </GhostLink>
        </div>
        <AdminsTable />
      </div>
    </section>
  );
};
export default AdminsPage;
