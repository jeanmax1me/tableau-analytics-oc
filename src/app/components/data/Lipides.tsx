"use client";
/**
 * @description This component displays the user's total lipid intake count.
 * It fetches the data using the `fetchLipidesCount` function and stores it in the state.
 * The component renders an icon, the lipid count value, and a label indicating "Lipides".
 */
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext"; 
import { fetchLipidesCount } from "@/app/api/getFunctions";

export default function Lipides() {
  const { userId } = useContext(UserContext);
  const [lipideCount, setLipideCount] = useState<number | null>(null);
 /**
   * Fetches the user's lipid intake count and stores it in the state.
   * Handles any errors during the fetch process.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLipidesCount(userId);
        setLipideCount(data);
      } catch (error) {
        console.error(error);
          // Set LipidesCount to null in case of error or non-existent user
          setLipideCount(null);
      }
    };

    fetchData();
  }, [userId]);

   /**
   * @returns {JSX.Element} - The JSX element representing the lipid intake component.
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
            fill="#FD5181"
            fillOpacity="0.1"
          />
          <path
            d="M21.25 36C21.25 38.125 22.875 39.75 25 39.75H35C37.125 39.75 38.75 38.125 38.75 36H21.25Z"
            fill="#FD5181"
          />
          <path
            d="M38.75 33.5H21.25C20.5 33.5 20 33 20 32.25C20 31.5 20.5 31 21.25 31H38.75C39.5 31 40 31.5 40 32.25C40 33 39.5 33.5 38.75 33.5Z"
            fill="#FD5181"
          />
          <path
            d="M31.25 21H28.75C24.625 21 21.25 24.375 21.25 28.5H38.75C38.75 24.375 35.375 21 31.25 21ZM27.5 26C26.75 26 26.25 25.5 26.25 24.75C26.25 24 26.75 23.5 27.5 23.5C28.25 23.5 28.75 24 28.75 24.75C28.75 25.5 28.25 26 27.5 26ZM32.5 26C32.5 26.75 33 27.25 33.75 27.25C34.5 27.25 35 26.75 35 26C35 25.25 34.5 24.75 33.75 24.75C33 24.75 32.5 25.25 32.5 26Z"
            fill="#FD5181"
          />
        </svg>

        <div className="flex-row space-y-0.5">
          <h1 className="pt-[7px] text-xl font-bold text-[#282D30]">
            {lipideCount}g
          </h1>
          <h2 className="text-sm font-medium text-[#74798C]">Lipides</h2>
        </div>
      </div>
    </div>
  );
}
