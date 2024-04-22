"use client";
/**
 * @description This component displays the user's total glucide intake count.
 * It fetches the data using the `fetchGlucidesCount` function and stores it in the state.
 * The component renders an icon, the glucide count value, and a label indicating "Glucides".
 */
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { fetchGlucidesCount } from "@/app/api/getFunctions";

export default function Glucides() {
  const { userId } = useContext(UserContext);
  const [glucideCount, setGlucideCount] = useState<number | null>(null);

    /**
   * Fetches the user's glucide intake count and stores it in the state.
   * Handles any errors during the fetch process.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGlucidesCount(userId);
        setGlucideCount(data);
      } catch (error) {
        console.error(error);
         // Set glucideCount to null in case of error or non-existent user
         setGlucideCount(null);
      }
    };

    fetchData();
  }, [userId]);

    /**
   * @returns {JSX.Element} - The JSX element representing the glucide intake component.
   */
  return (
    <div className="customshadow2 flex h-[124px] w-[258px] items-center rounded-sm bg-[#FBFBFB] pl-8">
      <div className="flex space-x-[24px]">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.101652"
            width="60"
            height="60"
            rx="6"
            fill="#F9CE23"
          />
          <path
            d="M37.6575 35.1C37.225 36.0575 37.0187 36.485 36.4612 37.3313C35.685 38.5125 34.5912 39.985 33.235 39.9975C32.03 40.0088 31.72 39.2138 30.085 39.2225C28.45 39.2313 28.1075 40.0113 26.9025 40C25.5462 39.9875 24.51 38.6588 23.7325 37.4763C21.5625 34.1713 21.335 30.2938 22.6737 28.2325C23.625 26.7663 25.1262 25.91 26.5387 25.91C27.9762 25.91 28.8787 26.6975 30.0675 26.6975C31.22 26.6975 31.9225 25.9088 33.585 25.9088C34.8412 25.9088 36.1725 26.5925 37.12 27.7738C34.0137 29.4775 34.5187 33.9138 37.6575 35.1Z"
            fill="#FDCC0C"
          />
          <path
            d="M22.8428 35.1C23.2753 36.0575 23.4816 36.485 24.0391 37.3313C24.8153 38.5125 25.9091 39.985 27.2653 39.9975C28.4703 40.0088 28.7803 39.2138 30.4153 39.2225C32.0503 39.2313 32.3928 40.0113 33.5978 40C34.9541 39.9875 35.9903 38.6588 36.7678 37.4763C38.9378 34.1713 39.1653 30.2938 37.8266 28.2325C36.8753 26.7663 35.3741 25.91 33.9616 25.91C32.5241 25.91 31.6216 26.6975 30.4328 26.6975C29.2803 26.6975 28.5778 25.9088 26.9153 25.9088C25.6591 25.9088 24.3278 26.5925 23.3803 27.7738C26.4866 29.4775 25.9816 33.9138 22.8428 35.1Z"
            fill="#FDCC0C"
          />
          <path
            d="M33.005 23.3737C33.6875 22.4987 34.205 21.2625 34.0162 20C32.9025 20.0763 31.6 20.785 30.8387 21.7088C30.1487 22.5475 29.5787 23.7912 29.8 25C31.0162 25.0375 32.2737 24.3112 33.005 23.3737Z"
            fill="#FDCC0C"
          />
        </svg>

        <div className="flex-row space-y-0.5">
          <h1 className="pt-[7px] text-xl font-bold text-[#282D30]">
            {glucideCount}g
          </h1>
          <h2 className="text-sm font-medium text-[#74798C]">Glucides</h2>
        </div>
      </div>
    </div>
  );
}
