"use client";
/**
 * @description This component displays the user's daily activity data in a bar chart.
 * It fetches the user activity data using the `getUserActivity` function and stores it in the state.
 * The chart displays bars for weight (kg) and burned calories (kCal) for each day. 
 * It uses a custom tooltip component to display the weight and calories values on hover.
 */
import { getUserActivity } from "@/app/api/getFunctions";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { DataFormatter } from "@/app/dataFormatter/dataFormatter";
// Interface for a session data point
interface Session {
  day: string;
  kilogram: number;
  calories: number;
}

// Interface for custom tooltip props
interface CustomTooltipProps {
  payload?: any;
}

export default function DailyActivity() {
  const { userId } = useContext(UserContext);
  const [activityData, setActivityData] = useState<any>(null);

  
  /**
   * Fetches the user's activity data using the `getUserActivity` function and stores it in the state.
   * Handles any errors during the fetch process.
   */
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

  const formattedData = activityData?.data.sessions.map(
    (session: Session) => DataFormatter.formatActivityData(session)
  ) || [];
   /**
   * Custom tooltip component to display weight and calories on hover.
   * @param {CustomTooltipProps} props - The tooltip props object.
   * @returns {JSX.Element} - The JSX element representing the custom tooltip.
   */
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
    if (payload && payload.length) {
      return (
        <div className="custom-tooltip grid h-[63px] w-[46px] place-items-center bg-[#E60000] text-[10px] font-medium text-white">
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
      {formattedData.length > 0 && (
        <div className="flex w-full justify-center">
          <BarChart
            width={770}
            height={184}
            data={formattedData}
            barCategoryGap={40}
            className="text-[#9B9EAC]"
          >
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickSize={19}
              tickLine={false}
              className="text-[#9B9EAC]"
            />
            <YAxis
              dataKey="Calories"
              orientation="right"
              axisLine={false}
              tickSize={30}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} offset={30} />
            <Bar
              dataKey="Poids"
              fill="#282D30"
              minPointSize={3}
              maxBarSize={7}
              radius={[20, 20, 0, 0]}
            />
            <Bar
              dataKey="Calories"
              fill="#E60000"
              radius={[20, 20, 0, 0]}
              maxBarSize={7}
            />
          </BarChart>
        </div>
      )}
       {formattedData.length === 0 && !activityData?.error  && ( // Check for error state or empty data
      <p className="text-center pt-[100px] text-base font-medium text-[#F04438]">
        Une erreur est survenue lors de la récupération des données. Veuillez réessayer plus tard.
      </p>
    )}
    </div>
  );
}
