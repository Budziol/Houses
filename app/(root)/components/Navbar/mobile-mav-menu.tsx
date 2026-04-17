import Link from "next/link";

const MobileNavMenu = ({ close }: { close: () => void }) => {
  return (
    <nav className="w-full flex flex-col items-center justify-center">
      <Link
        href="/oferta"
        onClick={close}
        className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
      >
        Oferta
      </Link>
      <Link
        href="/blog"
        onClick={close}
        className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
      >
        Blog
      </Link>
    </nav>
  );
};
export default MobileNavMenu;
