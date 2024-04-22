"use client";
/**
 * Imports React dependencies and the UserContext from the global context provider.
 */
import React, { useContext, useState } from "react";
import { UserContext } from "@/app/providers/UseContext";

/**
 * ProfilMenu component that renders a profile dropdown menu.
 * 
 * This component retrieves user data (ID) and a function to update it (setUserId) from the UserContext.
 * It utilizes a state variable (isOpen) to control the visibility of the dropdown menu.
 * 
 * @returns {JSX.Element} - The ProfilMenu component.
 */
const ProfilMenu = () => {
  const { userId, setUserId } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Function to open the profile dropdown menu.
   */
  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  /**
   * Function to close the profile dropdown menu.
   */
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
          isOpen ? "block bg-[#282D30]/90" : "hidden bg-transparent"
        }`}
        style={{ width: "300px" }} // Set width using inline style
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
      >
        <li
          className="cursor-pointer px-4 py-2 hover:bg-red-500/80"
          onClick={() => setUserId(12)} // Use setUserId to update user ID
        >
          <span className={`${userId === 12 ? "font-bold" : ""}`}>
            Karl Dovineau
          </span>{" "}
          (ID: 12)
        </li>
        <li
          className="cursor-pointer px-4 py-2 hover:bg-red-500/80"
          onClick={() => setUserId(18)} // Use setUserId to update user ID
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
