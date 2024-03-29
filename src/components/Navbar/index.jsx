import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className=" flex justify-between m-4   ">
      <div className=" font-bold text-3xl m-2 ">
        <Link href="/">HOME</Link>
      </div>
      <div className="flex  ">
        <div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2  md:block">
            Login
          </button>
        </div>
        <div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 md:block">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
