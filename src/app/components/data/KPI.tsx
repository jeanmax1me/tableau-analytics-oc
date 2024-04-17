"'use client";
import { getUserInfo } from "@/app/api/getFunctions";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { Card, ProgressCircle } from "@tremor/react";

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
  const scorePercent = score * 100;

  /*
  return (
    <div className="h-[263px] w-[258px] space-y-10 rounded-md bg-[#FBFBFB] relative">
      <div className="space-y-3 relative">
        <p className="translate-y-3 pl-6 text-sm font-medium text-[#20253A]">
          Score
        </p>
        <div className="absolute grid h-[74px] place-items-center top-1/4 left-[40%]">
          <span className="text-center text-[26px] font-bold text-[#282D30]">
            {scorePercent}%
          </span>
          <span className="text-center text-base font-medium text-[#78798C]">
            de votre <br /> objectif
          </span>
        </div>
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="transparent"
            stroke="#FF0000"
            stroke-width="4"
            stroke-linecap="round"
            stroke-dasharray={2 * Math.PI * 35} // Full circle circumference
            stroke-dashoffset={2 * Math.PI * 35 * (1 - scorePercent / 100)} // Unfilled portion based on progress
          />
        </svg>
      </div>
    </div>
  );
}
*/
  return (
    <div className="relative h-[263px] w-[258px] space-y-10 rounded-md bg-[#FBFBFB]">
      <p className="absolute left-[30px] top-[24px] text-[15px] font-medium text-[#20253A] z-10">
        Score
      </p>
      <Card className="mx-auto h-[263px] w-[258px]">
        <div>
          <ProgressCircle value={scorePercent} size="xl" color="red">
            <div className="grid h-[74px] place-items-center">
              <span className="text-center text-[26px] font-bold text-[#282D30]">
                {scorePercent}%
              </span>
              <span className="text-center text-base font-medium text-[#78798C]">
                de votre <br /> objectif
              </span>
            </div>
          </ProgressCircle>
        </div>
      </Card>
    </div>
  );
}
