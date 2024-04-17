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
      <div className="inline-flex w-full justify-between px-4">
        <h3 className="mt-3 pl-14 font-medium">Activité Quotidienne</h3>
        <div className="mt-3 inline-flex items-center">
          <div className="mr-[7px] h-2 w-2 rounded-full bg-[#282D30]"></div>
          <span className="pr-8">Poids (kg)</span>
          <div className="mr-2 h-2 w-2 rounded-full bg-[#E60000]"></div>{" "}
          <span>Calories brûlées (kCal)</span>
        </div>
      </div>
      {chartData.length > 0 && (
        <BarChart
          data={chartData}
          index="day"
          categories={["Poids", "Calories"]}
          colors={["zinc-800", "red-500"]}
          yAxisWidth={30}
          showLegend={false}
          className="pb-8"
        />
      )}
    </div>
  );
}
