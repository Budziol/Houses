import { getCurrentUser } from "@/lib/auth";
import AdminNavbar from "./components/Navbar/admin-navbar";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = async ({ children }: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie");
  }

  if (user.role !== "ADMIN" && user.role !== "SUPERADMIN") {
    redirect("/logowanie");
  }

  return (
    <>
      <AdminNavbar />
      <main className="">{children}</main>
    </>
  );
};
export default AdminLayout;
