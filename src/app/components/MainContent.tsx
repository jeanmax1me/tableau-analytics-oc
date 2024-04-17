"use client";
import { useState, useContext, useEffect } from "react";
import DailyActivity from "./data/Daily-Activity";
import SessionsLenght from "./data/Sessions-Lenght";
import KPI from "./data/KPI";
import Calories from "./data/Calories";
import Proteines from "./data/Proteines";
import Glucides from "./data/Glucides";
import Lipides from "./data/Lipides";
import { getUserInfo } from "@/app/api/getFunctions";
import { UserContext } from "../providers/UseContext";
import RadarFitness from "./data/RadarFitness";

export default function MainContent() {
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
  }, [userId]); // Refetch data when userId changes

  return (
    <div className="flex-grow-1 h-[calc(100vh-91px)] w-[calc(100vh-117px)] pl-[3%] lg:pl-[107px]">
      <div className="flex-row space-y-[41px] pt-[68px]">
        <h1 className="text-5xl font-medium text-black">
          Bonjour{" "}
          <span className="text-red-500">
            {userData?.data?.userInfos?.firstName}
          </span>
        </h1>
        <h2 className="pb-[77px] text-[18px] font-normal">
          Félicitations ! Vous avez explosé vos objectifs hier 👏
        </h2>
      </div>

      <div className="flew-row space-x-[31px] lg:flex">
        <div className="flex-row space-y-[28px]">
          <DailyActivity />
          <div className="verticalgap flex-row lg:flex lg:space-x-[30px]">
            <SessionsLenght />
            <RadarFitness />
            <KPI />
          </div>
        </div>
        <div className="respgap flex-row space-y-[39px]">
          <Calories />
          <Proteines />
          <Glucides />
          <Lipides />
        </div>
      </div>
    </div>
  );
}
