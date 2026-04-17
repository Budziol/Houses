"use client";

import { logout } from "@/app/actions/logout";
import { GhostButton } from "./buttons";

const LogoutButton = () => {
  return (
    <GhostButton className="py-2! px-3!" onClick={() => logout()}>
      Wyloguj się
    </GhostButton>
  );
};
export default LogoutButton;
