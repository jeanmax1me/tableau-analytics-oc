import { LineChart } from "@tremor/react";
import { getUserAverageSessions } from "@/app/api/getFunctions";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext"; 
import { white } from "tailwindcss/colors";

interface Session {
  day: number; 
  sessionLength: number; 
}


export default function SessionsLenght() {
  const { userId } = useContext(UserContext);
  const [averageSessions, setAverageSessions] = useState<any>(null);

  useEffect(() => {
    const fetchUserAverageSessions = async () => {
      try {
        const data = await getUserAverageSessions(userId);
        setAverageSessions(data);
      } catch (error) {
        console.error("Error fetching user average sessions:", error);
      }
    };
    fetchUserAverageSessions();
  }, [userId]);

  
    // Define variables to hold chart data
    let chartData: { day: number; sessionLenght: number }[] = [];
    // Extract data if activityData is available
    if (averageSessions) {
      chartData = averageSessions.data.sessions.map((session: Session) => ({
        day: session.day,
        sessionLength: session.sessionLength
      }));
    }


  const customTooltip = (props) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-48 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-tremor-content">Durée de la session</p>
              <p className="font-medium text-tremor-content-emphasis">
                {category.value} min
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="h-[263px] w-[258px] bg-red-500 relative">
      <h3 className="text-sm font-medium absolute text-zinc-50 pt-3 pl-10">
      Durée moyenne des sessions
      </h3>
      <LineChart
        className="h-[263px] w-[258px] pt-8 text-tremor-brand-faint"
        data={chartData}
        index="day"
        categories={["sessionLength"]}
        colors={["zinc-50"]}
        yAxisWidth={30}
        customTooltip={customTooltip}
        showLegend={false}
        showGridLines={false}
        maxValue={80}
          />
    </div>
  );
}
