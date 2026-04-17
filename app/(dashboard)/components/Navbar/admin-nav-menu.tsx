import { PrimaryButton } from "@/components/buttons";
import LogoutButton from "@/components/logout-button";
import Link from "next/link";

const AdminNavMenu = () => {
  return (
    <nav className="hidden md:flex flex-row items-center justify-center gap-8">
      <Link href="/admin/oferta" className="">
        Oferta
      </Link>
      <Link href="/admin/blog" className="">
        Blog
      </Link>
      <Link href="/admin/admini" className="">
        Admini
      </Link>
      <LogoutButton />
    </nav>
  );
};
export default AdminNavMenu;
