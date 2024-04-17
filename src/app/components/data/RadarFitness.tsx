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
      1: "Cardio",
      2: "Energie",
      3: "Endurance",
      4: "Force",
      5: "Vitesse",
      6: "Intensité",
    };

    const newData = chartData.map(({ value, kind }) => ({ value, kind: kindMap[kind] }));

    const desiredOrder = ['Intensité', 'Vitesse', 'Force', 'Endurance', 'Energie', 'Cardio'];
    const sortedData = desiredOrder.map((kind) =>
      newData.filter((obj) => obj.kind === kind)[0]
    );

    console.log(sortedData);


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
