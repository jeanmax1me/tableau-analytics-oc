"use client";
/**
 * @description This component displays the user's total protein intake count.
 * It fetches the data using the `fetchProteinesCount` function and stores it in the state.
 * The component renders an icon, the protein count value, and a label indicating "Protéines".
 */
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { fetchProteinesCount } from "@/app/api/getFunctions";

export default function Proteines() {
  const { userId } = useContext(UserContext);
  const [proteineCount, setProteineCount] = useState<number | null>(null);
 /**
   * Fetches the user's protein intake count and stores it in the state.
   * Handles any errors during the fetch process.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProteinesCount(userId);
        setProteineCount(data);
      } catch (error) {
        console.error(error);
           // Set ProteineCount to null in case of error or non-existent user
           setProteineCount(null);
      }
    };

    fetchData();
  }, [userId]);

    /**
   * @returns {JSX.Element} - The JSX element representing the protein intake component.
   */
  return (
    <div className="customshadow2 flex h-[124px]  w-[258px] items-center rounded-sm  bg-[#FBFBFB] pl-8">
      <div className="flex space-x-[24px]">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="60"
            height="60"
            rx="6"
            fill="#4AB8FF"
            fillOpacity="0.1"
          />
          <path
            d="M39.2353 24.4706C38.8824 24.1176 38.4118 23.8823 38.0588 23.8823C37.9412 23.4118 37.8235 23.0588 37.4706 22.7059C36.6471 21.8823 35.2353 21.8823 34.4118 22.7059C33.7059 23.4118 33.5882 24.5882 34.1765 25.4118L31.5882 27.8823L30.2941 26.5882L27.7059 29.1765C27.4706 29.0588 27.1176 29.0588 26.8824 29.0588C23.5882 29.0588 21 31.647 21 34.9412C21 38.2353 23.5882 40.8235 26.8824 40.8235C30.1765 40.8235 32.7647 38.2353 32.7647 34.9412C32.7647 34.7059 32.7647 34.3529 32.6471 34.1176L35.2353 31.5294L33.9412 30.2353L36.4118 27.7647C37.2353 28.3529 38.4118 28.2353 39.1176 27.5294C40.0588 26.7059 40.0588 25.2941 39.2353 24.4706Z"
            fill="#4AB8FF"
          />
        </svg>

        <div className="flex-row space-y-0.5">
          <h1 className="pt-[7px] text-xl font-bold text-[#282D30]">   {proteineCount !== null ? proteineCount + "g" : "N/A"}</h1>
          <h2 className="text-sm font-medium text-[#74798C]">Protéines</h2>
        </div>
      </div>
    </div>
  );
}
