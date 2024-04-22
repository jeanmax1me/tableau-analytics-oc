"'use client";
/**
 * @description This component renders a radar chart that displays the user's performance data for different categories (cardio, energy, endurance, etc.).
 * It fetches data from the `getUserPerformance` function and maps the data to a format suitable for the radar chart.
 * The chart allows visualization of the user's strengths and weaknesses across different performance metrics.
 */
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

/**
 * @typedef {Object} Session - Represents a session object within the performance data.
 * @property {number} value - The performance value for a specific category.
 * @property {number} kind - A numerical identifier for the performance category.
 */
interface Session {
  value: number;
  kind: number
}
/**
 * @typedef {Object} KindMap - A map to translate numerical category identifiers to human-readable labels.
 * @property {string} [key: number] - The key represents the numerical identifier for the category.
 * @property {string} value - The value represents the human-readable label for the category.
 */

type KindMap = {
  [key: number]: string; 
};

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



    let chartData: { value: number; kind: number }[] = [];
    if (userPerformance) {
      chartData = userPerformance.data.data.map((session: Session) => ({
        value: session.value,
        kind: session.kind
      }));
    }

      /**
   * A map to translate numerical category identifiers to human-readable labels for the chart.
   */
    const kindMap: KindMap = {
      1: "Cardio",
      2: "Energie",
      3: "Endurance",
      4: "Force",
      5: "Vitesse",
      6: "Intensité",
    };

     /**
   * Transforms the data to use human-readable category labels and ensures the desired order for the chart.
   */
    const newData = chartData.map(({ value, kind }) => ({ value, kind: kindMap[kind] }));

    const desiredOrder = ['Intensité', 'Vitesse', 'Force', 'Endurance', 'Energie', 'Cardio'];
    const sortedData = desiredOrder.map((kind) =>
      newData.filter((obj) => obj.kind === kind)[0]
    );
 /**
   * @returns {JSX.Element} - The JSX element representing the radar chart component.
   */

  return (
    <div className="h-[263px] w-[258px] bg-[#FBFBFB] customshadow2 rounded-sm;
    ">
        <ResponsiveContainer width="100%" height="100%" className="bg-[#282D30] rounded-md" >
          <RadarChart innerRadius="0" outerRadius="69%" data={sortedData} >
            <PolarGrid  radialLines={false}/>
            <PolarAngleAxis dataKey="kind" className="text-[12px] text-white" stroke="white" tickLine={false} dy={4} tickSize={15}/>
            <PolarRadiusAxis tick={false} axisLine={false} />
            <Radar
              dataKey="value"
              fill="#FF0101B2"
              fillOpacity={1}
              stroke="#FF0101B2"
    
            />
          </RadarChart>
        </ResponsiveContainer>
    </div>
  );
}
