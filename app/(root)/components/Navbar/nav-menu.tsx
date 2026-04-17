import Link from "next/link";

const NavMenu = () => {
  return (
    <nav className="hidden md:flex flex-row items-center justify-center gap-8">
      <Link href="/oferta" className="">
        Oferta
      </Link>
      <Link href="/blog" className="">
        Blog
      </Link>
    </nav>
  );
};
export default NavMenu;
