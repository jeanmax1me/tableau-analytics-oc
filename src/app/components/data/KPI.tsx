"'use client";
/**
 * @description This component displays the user's KPI (Key Performance Indicator) score.
 * It fetches the user data using the `getUserInfo` function and stores it in the state.
 * The component renders a pie chart with two slices representing the score and the remaining 
 * percentage to reach the goal (100%). It also displays the score percentage as a text value
 * and a label indicating "de votre objectif" (French for "from your goal").
 */
import { getUserInfo } from "@/app/api/getFunctions";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

export default function Radar() {
  const { userId } = useContext(UserContext);
  const [userData, setUserData] = useState<any>(null);

    /**
   * Fetches the user's data using the `getUserInfo` function and stores it in the state.
   * Handles any errors during the fetch process.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getUserInfo(userId);
        setUserData(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId]);

    /**
   * Extracts the score value from the user data, prioritizing today's score if available.
   */
  const score = userData?.data?.todayScore || userData?.data?.score;
  
  /**
   * Calculates the score percentage and remaining percentage to reach the goal (100%).
   */
  const scorePercent = [
    { name: "score", value: score * 100 },
    { name: "remaining", value: 100 - score },
  ];

  const COLORS = ["#E60000", "#FBFBFB"];
  // Color palette for the chart slices

  return (
    <div className="relative h-[263px] w-[258px] rounded-md bg-[#FBFBFB]">
      <p className="absolute left-[30px] top-[24px] z-10 text-[15px] font-medium text-[#20253A]">
        Score
      </p>
      <div className="absolute left-[41%] top-[33%] z-10 grid h-[74px] place-items-center">
        <span className="text-center text-[26px] font-bold text-[#282D30]">
          {scorePercent[0].value}%
        </span>
        <span className="text-center text-base font-medium text-[#78798C]">
          de votre <br /> objectif
        </span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            data={scorePercent}
            innerRadius={72}
            outerRadius={84}
            startAngle={90}
            endAngle={480}
            width={200}
            height={200}
          >
            {scorePercent.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
