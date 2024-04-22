"use client";
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
import { DataFormatter } from "@/app/dataFormatter/dataFormatter";
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



  const kpiData = DataFormatter.formatKpiData(userData || {}); 
  const COLORS = ["#E60000", "#FBFBFB"];
  // Color palette for the chart slices

  return (
    <div className="relative h-[263px] w-[258px] rounded-md bg-[#FBFBFB]">
      <p className="absolute left-[30px] top-[24px] z-10 text-[15px] font-medium text-[#20253A]">
        Score
      </p>
      {!userData && ( // Check if userData is null or undefined (not legit)
        <p className="text-center pt-[100px] text-base font-medium text-[#F04438]">
          Une erreur est survenue lors de la récupération des données. Veuillez réessayer plus tard.
        </p>
      )}
      {userData && (
        <>
          <div className="absolute left-[41%] top-[33%] z-10 grid h-[74px] place-items-center">
            <span className="text-center text-[26px] font-bold text-[#282D30]">
              {kpiData.score}%
            </span>
            <span className="text-center text-base font-medium text-[#78798C]">
              de votre <br /> objectif
            </span>
          </div>
          {kpiData.score !== undefined && kpiData.remaining !== undefined && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={[
                    { name: "score", value: kpiData.score },
                    { name: "remaining", value: kpiData.remaining },
                  ]}
                  innerRadius={72}
                  outerRadius={84}
                  startAngle={90}
                  endAngle={480}
                  width={200}
                  height={200}
                >
                  <Cell key="score" fill={COLORS[0]} />
                  <Cell key="remaining" fill={COLORS[1]} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </>
      )}
    </div>
  );
}