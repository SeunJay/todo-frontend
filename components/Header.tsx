import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-[#0D0D0D] w-full h-[150px] flex justify-center items-center">
      <Link
        href={"/"}
        className="w-[190px] md:w-[250px] h-[48px] flex gap-[10px] mx-auto"
      >
        <Image
          src={"/assets/todo-icon.png"}
          alt="logo"
          width={22}
          height={30}
          className="h-[38px] mt-[9px]"
        />
        <h2 className="text-[25px] md:text-[40px] font-extrabold text-[#4EA8DE] leading-[48.41px] ">
          Todo <span className="text-[#5E60CE]">App</span>
        </h2>
      </Link>
    </header>
  );
};

export default Header;
