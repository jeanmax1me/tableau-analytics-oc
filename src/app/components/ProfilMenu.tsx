"use client";
import React, { useContext, useState } from "react"; 
import { UserContext } from "@/app/providers/UseContext"; 

const ProfilMenu = () => {
  const { userId, setUserId } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" onMouseLeave={handleCloseMenu}>
      <h1
        className="px-4 pb-2 font-medium text-white hover:cursor-pointer"
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
      >
        Profil
      </h1>
      <ul
        className={`absolute left-1/2 top-full -translate-x-1/2 overflow-hidden rounded-md shadow-md transition duration-200 ease-in-out ${
          isOpen ? "block bg-[#282D30]/90"
             : "hidden bg-transparent"
        }`}
        style={{ width: "300px" }} // Set width using inline style
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
      >
        <li
          className="cursor-pointer px-4 py-2 hover:bg-red-500/80"
          onClick={() => setUserId(12)} // Use setUserId from context
        >
          <span className={`${userId === 12 ? "font-bold" : ""}`}>
            Karl Dovineau
          </span>{" "}
          (ID: 12)
        </li>
        <li
          className="cursor-pointer px-4 py-2 hover:bg-red-500/80"
          onClick={() => setUserId(18)} // Use setUserId from context
        >
          <span className={`${userId === 18 ? "font-bold" : ""}`}>
            Cecilia Ratorez
          </span>{" "}
          (ID: 18)
        </li>
      </ul>
    </div>
  );
};

export default ProfilMenu;
