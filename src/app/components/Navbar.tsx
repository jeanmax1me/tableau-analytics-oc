import Image from "next/image";
import ProfilMenu from "./ProfilMenu";

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
        <nav className="flex lg:gap-[219px] pr-[91px] text-2xl font-medium gap-[50px]">
          <a href="/">
            <h1>Accueil</h1>
          </a>
          <ProfilMenu />
          <h1>Réglages</h1>
          <h1>Communauté</h1>
        </nav>
      </div>
    </div>
  );
}
