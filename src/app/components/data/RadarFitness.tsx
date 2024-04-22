"'use client";
/**
 * @description This component renders a radar chart that displays the user's performance data for different categories (cardio, energy, endurance, etc.).
 * It fetches data from the `getUserPerformance` function and maps the data to a format suitable for the radar chart.
 * The chart allows visualization of the user's strengths and weaknesses across different performance metrics.
 */
import { DataFormatter } from "@/app/dataFormatter/dataFormatter";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { getUserPerformance } from "@/app/api/getFunctions";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";

export default function RadarFitness() {
  const { userId } = useContext(UserContext);
  const [userPerformance, setUserPerformance] = useState<any>(null);

  /**
   * Fetches the user's performance data and stores it in the state.
   * Handles any errors during the fetch process.
   */
  useEffect(() => {
    const fetchUserPerformance = async () => {
      try {
        const data = await getUserPerformance(userId);
        setUserPerformance(data);
      } catch (error) {
        console.error("Error fetching user performance:", error);
      }
    };
    fetchUserPerformance();
  }, [userId]);

  let formattedData: { value: number; kind: string }[] = [];
  if (userPerformance) {
    formattedData = DataFormatter.formatPerformanceData(userPerformance);
  }
  /**
   * @returns {JSX.Element} - The JSX element representing the radar chart component.
   */

  return (
    <div className="customshadow2 h-[263px] w-[258px] rounded-sm bg-[#FBFBFB]">
      {!userPerformance && ( // Check if userPerformance is null or undefined (not legit)
        <p className="text-center pt-[100px] text-base font-medium text-[#F04438]">
        Une erreur est survenue lors de la récupération des données. Veuillez réessayer plus tard.
      </p>
      )}
      {userPerformance && (
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="rounded-md bg-[#282D30]"
        >
          <RadarChart innerRadius="0" outerRadius="69%" data={formattedData}>
            <PolarGrid radialLines={false} />
            <PolarAngleAxis
              dataKey="kind"
              className="text-[12px] text-white"
              stroke="white"
              tickLine={false}
              dy={4}
              tickSize={15}
            />
            <PolarRadiusAxis tick={false} axisLine={false} />
            <Radar
              dataKey="value"
              fill="#FF0101B2"
              fillOpacity={1}
              stroke="#FF0101B2"
            />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
