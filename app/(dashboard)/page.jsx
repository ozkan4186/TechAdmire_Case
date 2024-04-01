"use client";
import Navbar from "@/components/Navbar/page";

import { UserButton, auth } from "@clerk/nextjs";
import Home from "@/components/Home/page";

export default function Dashboard() {
  return (
    <div>
      <div className="flex justify-around bg-red-400 p-10 ">
        <Navbar />
        <UserButton />
      </div>
      <Home />
    </div>
  );
}
