"'use client";
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

interface Session {
  value: number;
  kind: number
}

type KindMap = {
  [key: number]: string; 
};

export default function RadarFitness() {
const { userId } = useContext(UserContext);
  const [userPerformance, setUserPerformance] = useState<any>(null);

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
    // Extract data if activityData is available
    if (userPerformance) {
      chartData = userPerformance.data.data.map((session: Session) => ({
        value: session.value,
        kind: session.kind
      }));
    }

    const kindMap: KindMap = {
      1: "cardio",
      2: "energy",
      3: "endurance",
      4: "strength",
      5: "speed",
      6: "intensity",
    };

    const newData = chartData.map(({ value, kind }) => ({ value, kind: kindMap[kind] }));
    console.log(newData);    

  return (
    <div className="h-[263px] w-[258px] bg-[#FBFBFB] customshadow2 rounded-sm;
    ">
        <ResponsiveContainer width="100%" height="100%" className="border bg-[#282D30]" >
          <RadarChart innerRadius="0" outerRadius="63%" data={newData} >
            <PolarGrid />
            <PolarAngleAxis dataKey="kind" className="text-[11px] text-white" stroke="white" tickLine={false}/>
            <PolarRadiusAxis tick={false} axisLine={false} />
            <Radar
              dataKey="value"
              fill="#EF4444"
              fillOpacity={0.8}
              stroke="#EF4444"
            />
          </RadarChart>
        </ResponsiveContainer>
    </div>
  );
}
