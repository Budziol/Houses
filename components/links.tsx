import Link from "next/link";
import React, { ComponentProps } from "react";
import { GhostButton } from "./buttons";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  linkClassName?: string;
} & ComponentProps<typeof Link>;

export const DefaultLink = ({
  href,
  children,
  linkClassName,
}: {
  href: string;
  children: React.ReactNode;
  linkClassName?: string;
}) => {
  return (
    <Link
      href={href}
      className={`text-main hover:text-main-hover hover:underline transition-colors duration-150 ${linkClassName}`}
    >
      {children}
    </Link>
  );
};

export const NavLink = ({
  href,
  children,
  linkClassName,
}: {
  href: string;
  children: React.ReactNode;
  linkClassName?: string;
}) => {
  return (
    <Link
      href={href}
      className={`text-sm font-semibold text-background-muted hover:text-text-main whitespace-nowrap transition-colors duration-150 ${linkClassName}`}
    >
      {children}
    </Link>
  );
};

export const GhostLink = ({
  href,
  children,
  className,
  linkClassName,
  ...props
}: Props) => {
  return (
    <Link href={href} className={linkClassName}>
      <GhostButton className={className}>{children}</GhostButton>
    </Link>
  );
};
