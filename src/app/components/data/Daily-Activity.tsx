"use client";
import { BarChart } from "@tremor/react";
import { getUserActivity } from "@/app/api/getFunctions";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext"; // Import UserContext

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
  let customLabels: { [key: string]: string } = {
    kilogram: "Poids (kg)",
    calories: "Calories brûlées",
  };
  // Extract data if activityData is available
  if (activityData) {
    chartData = activityData.data.sessions.map((session) => ({
      day: session.day,
      kilogram: session.kilogram,
      calories: session.calories,
    }));
  }

  return (
    <div className="h-[320px] w-[835px] border relative">
      <h3 className="pl-8 mt-1 absolute">Activité Quotidienne</h3>
      {chartData.length > 0 && (
        <BarChart
          data={chartData}
          index="day"
          categories={["kilogram", "calories"]}
          colors={["zinc-800", "red-500"]}
          yAxisWidth={30}
        />
      )}
    </div>
  );
}
