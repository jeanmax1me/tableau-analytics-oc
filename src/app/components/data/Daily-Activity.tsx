"use client";
import { BarChart } from "@tremor/react";
import { getUserActivity } from "@/app/api/getFunctions";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";

interface Session {
  day: string;
  kilogram: number;
  calories: number;
}

export default function DailyActivity() {
  const { userId } = useContext(UserContext);
  const [activityData, setActivityData] = useState<any>(null);

  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        const data = await getUserActivity(userId);
        setActivityData(data);
      } catch (error) {
        console.error("Error fetching user activity:", error);
      }
    };

    fetchUserActivity();
  }, [userId]);

  // Define variables to hold chart data
  let chartData: { day: string; kilogram: number; calories: number }[] = [];
  // Extract data if activityData is available
  if (activityData) {
    chartData = activityData.data.sessions.map((session: Session) => ({
      day: session.day,
      Poids: session.kilogram,
      Calories: session.calories,
    }));
  }

  return (
    <div className="relative h-[320px] w-[835px] rounded-md bg-[#FBFBFB]">
      <h3 className="absolute mt-1 pl-8">Activité Quotidienne</h3>
      {chartData.length > 0 && (
        <BarChart
          data={chartData}
          index="day"
          categories={["Poids", "Calories"]}
          colors={["zinc-800", "red-500"]}
          yAxisWidth={30}
        />
      )}
    </div>
  );
}
