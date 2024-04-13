import React from "react";
import DailyActivity from "./data/Daily-Activity";
import SessionsLenght from "./data/Sessions-lenght";
import Radar from "./data/Radar";
import KPI from "./data/KPI";
import Calories from "./data/Calories";
import Proteines from "./data/Proteines";
import Glucides from "./data/Glucides";
import Lipides from "./data/Lipides";

export default function MainContent() {
  return (
    <div className="flex-grow-1 h-[calc(100vh-91px)] w-[calc(100vh-117px)] pl-[107px]">
      <div className="pt-[68px] flex-row space-y-[41px]">
        <h1 className="text-5xl font-medium text-black">
          Bonjour <span className="text-red-500">John Doe</span>
        </h1>
        <h2 className="font-normal text-[18px] pb-[77px]">Félicitations ! Vous avez explosé vos objectifs hier 👏</h2>
      </div>

      <div className="flex space-x-[31px]">
        <div className="flex-row space-y-[28px]">
            <DailyActivity />
            <div className="flex space-x-[30px]">
                <SessionsLenght />
                <Radar />
                <KPI />
            </div>
        </div>
        <div className="flex-row space-y-[39px]">
            <Calories />
            <Proteines />
            <Glucides />
            <Lipides />
        </div>
      </div>
    </div>
  );
}
