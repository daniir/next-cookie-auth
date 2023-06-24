"use client";

import { useRouter } from "next/navigation";
import useAuthContext from "@/hook/useAuth";
import React from "react";

function NavBar() {
  const router = useRouter();
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="bg-slate-800 p-5 flex justify-between items-baseline">
      <div>
        <h1 className="text-white font-bold capitalize text-lg">
          welcome <span className="capitalize">{user?.FirstName} {user?.LastName}</span>
        </h1>
      </div>
      <div>
        <button
          className="bg-red-500 rounded-lg p-2 text-center text-white hover:font-bold hover:bg-red-600 hover:border-2 hover:border-white"
          type="button"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
