"'use client";
import { getUserInfo } from "@/app/api/getFunctions";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

export default function Radar() {
  const { userId } = useContext(UserContext);
  const [userData, setUserData] = useState<any>(null);

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

  const score = userData?.data?.todayScore || userData?.data?.score;
  const scorePercent = [
    { name: "score", value: score * 100 },
    { name: "remaining", value: 100 - score },
  ];

  const COLORS = ["#E60000", "#FBFBFB"];

  return (
    <div className="relative h-[263px] w-[258px] rounded-md bg-[#FBFBFB]">
      <p className="absolute left-[30px] top-[24px] z-10 text-[15px] font-medium text-[#20253A]">
        Score
      </p>
      <div className="absolute left-[41%] top-[33%] z-10 grid h-[74px] place-items-center">
        <span className="text-center text-[26px] font-bold text-[#282D30]">
          {scorePercent[0].value}%
        </span>
        <span className="text-center text-base font-medium text-[#78798C]">
          de votre <br /> objectif
        </span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            data={scorePercent}
            innerRadius={72}
            outerRadius={84}
            startAngle={90}
            endAngle={480}
            width={200}
            height={200}
          >
            {scorePercent.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
