import LogoutButton from "@/components/logout-button";
import Link from "next/link";

const AdminMobileNavMenu = ({ close }: { close: () => void }) => {
  return (
    <nav className="w-full flex flex-col items-center justify-center">
      <Link
        href="/admin/oferta"
        onClick={close}
        className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
      >
        Oferta
      </Link>
      <Link
        href="/admin/blog"
        onClick={close}
        className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
      >
        Blog
      </Link>
      <Link
        href="/admin/admini"
        onClick={close}
        className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
      >
        Admini
      </Link>
      <LogoutButton />
    </nav>
  );
};
export default AdminMobileNavMenu;
