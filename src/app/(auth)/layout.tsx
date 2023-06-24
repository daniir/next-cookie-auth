import React from "react";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-sky-800 to-blue-950">
      <div className="bg-cyan-950 rounded-lg p-10">{children}</div>
      <Toaster />
    </div>
  );
}
