"'use client";
import { Card, ProgressCircle } from "@tremor/react";
import { getUserInfo } from "@/app/api/getFunctions";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext"; 

export default function Radar() {
  const { userId, setUserId, handleProfileChange } = useContext(UserContext);
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
  }, [userId]); // Refetch data when userId 
  

    const score = userData?.data?.todayScore || userData?.data?.score;
    const scorePercent = score*100;
  
   
  return (
    <div className="h-[263px] w-[258px] space-y-10 bg-[#FBFBFB] rounded-md">
      <div className="space-y-3">
        <p className="text-sm text-[#20253A] translate-y-3 pl-6 font-medium">Score</p>
        <Card className="mx-auto h-[263px] w-[258px]">
          <div>
            <ProgressCircle value={scorePercent} size="xl" color="red">
              <div className="grid h-[74px] place-items-center">
                <span className="text-center text-[26px] font-bold text-[#282D30]">
                  {scorePercent}%
                </span>
                <span className="text-center text-base font-medium text-[#78798C]">
                  de votre objectif
                </span>
              </div>
            </ProgressCircle>
          </div>
        </Card>
      </div>
    </div>
  );
}
