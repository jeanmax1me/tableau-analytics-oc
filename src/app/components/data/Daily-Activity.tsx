"use client";
import { getUserActivity } from "@/app/api/getFunctions";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

interface Session {
  day: string;
  kilogram: number;
  calories: number;
}

interface CustomTooltipProps {
  payload?: any;
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

  let chartData: { day: string; kilogram: number; calories: number }[] = [];
  if (activityData) {
    chartData = activityData.data.sessions.map((session: Session) => ({
      day: session.day,
      Poids: session.kilogram,
      Calories: session.calories,
    }));
  }

  /*
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
          showYAxis={false}
   
        />
      )}
    </div>
  );
}
*/

const CustomTooltip: React.FC<CustomTooltipProps> = ({  payload }) => {
  if ( payload && payload.length) {
    return (
      <div className="custom-tooltip font-medium text-white text-[10px] bg-[#E60000] w-[46px] h-[63px] grid place-items-center">
        <p>{payload[0].value}kg</p>
        <p>{payload[1].value}Kcal</p>
      </div>
    );
  }
  return null;
};



  return (
    <div className="relative h-[320px] w-[835px] rounded-md bg-[#FBFBFB]">
      <div className="inline-flex w-full justify-between px-4 pb-[58px]">
        <h3 className="pl-[32px] pt-[24px] font-medium">
          Activité Quotidienne
        </h3>
        <div className="mt-3 inline-flex items-center">
          <div className="mr-[7px] h-2 w-2 rounded-full bg-[#282D30]"></div>
          <span className="pr-8">Poids (kg)</span>
          <div className="mr-2 h-2 w-2 rounded-full bg-[#E60000]"></div>{" "}
          <span>Calories brûlées (kCal)</span>
        </div>
      </div>
      {chartData.length > 0 && (
        <div className="flex w-full justify-center">
     
          <BarChart width={770} height={184} data={chartData} barCategoryGap={40}>
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickSize={19} tickLine={false} />
            <YAxis
              dataKey="Calories"
              orientation="right"
              axisLine={false}
              tickSize={30} tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} offset={30} />
            <Bar dataKey="Poids" fill="#282D30" minPointSize={3} maxBarSize={7} radius={[20, 20, 0, 0]}/>
            <Bar dataKey="Calories" fill="#E60000" radius={[20, 20, 0, 0]} maxBarSize={7}/>
          </BarChart>
          </div>
      )}
    </div>
  );
}
