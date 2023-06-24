"use client";

import useAuthContext from "@/hook/useAuth";
import NavBar from "./components/navBar";
import Footer from "./components/footer";

export default function Home() {
  const { isAuth, user } = useAuthContext();

  return (
    <>
      {isAuth && <NavBar />}
      <div className="container mx-auto grid grid-cols-3 gap-2 mt-56 shadow-xl w-1/2">
        <div className="col-span-2 bg-neutral-100 border-2 border-black rounded-l-lg text-center p-5">
          <h1 className="font-bold uppercase text-lg">Hello! 👋👋</h1>
          <p className="mt-8 text-justify">
            Now you've access to the Home page. {""}
            <span className="italic font-bold">{`"${user?.UserName}"`}</span> your user id is{" "}
            <span className="italic font-bold">{`"${user?.Id}"`}</span>.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center bg-cyan-950 border-2 border-black rounded-r-lg text-center p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-15 h-15 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h1 className="uppercase font-bold text-white text-2xl mt-2">{user?.FirstName}</h1>
        </div>
      </div>
      {isAuth && <Footer />}
    </>
  );
}
