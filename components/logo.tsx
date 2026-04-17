import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="text-accent font-bold text-xl hover:text-accent-hover transition-colors duration-150">
        Houses
      </div>
    </Link>
  );
};
export default Logo;
