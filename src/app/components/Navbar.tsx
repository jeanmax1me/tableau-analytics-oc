import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="customshadow mx-auto flex h-[91px] max-w-[1440px] items-center justify-between bg-[#020203] text-white">
      <div className="pl-[28px]">
        <Image
          src="/logonavbar.png"
          width={178}
          height={61}
          alt="SportSee Logo"
        />
      </div>
      <div>
        <nav className="text-2xl flex gap-[219px] pr-[91px] font-medium">
          <h1>Accueil</h1>
          <h1>Profil</h1>
          <h1>Réglage</h1>
          <h1>Communauté</h1>
        </nav>
      </div>
    </div>
  );
}
