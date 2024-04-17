import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  YAxis,
  Rectangle,
} from "recharts";
import { getUserAverageSessions } from "@/app/api/getFunctions";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";

interface Session {
  day: number;
  sessionLength: number;
}

interface CustomTooltipProps {
  payload?: any;
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

  let chartData: { day: number; sessionLength: number }[] = [];
  if (averageSessions) {
    chartData = averageSessions.data.sessions.map((session: Session) => ({
      day: session.day,
      sessionLength: session.sessionLength,
    }));
  }

  const CustomCursor = (props: any) => {
    const { points, width, height } = props;
    const { x, y } = points[0];
    const left = x - width;
    return (
      <Rectangle
        x={left}
        y={y}
        width={width}
        height={height + 10}
        stroke="transparent" 
        fill="black" 
        fillOpacity="0.18" 
      />
    );
  };

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
    if (!payload) return null;
    return (
      <div className="h-[34px] w-[50px] p-0">
        {payload.map((category: any, idx: React.Key | null | undefined) => (
          <div key={idx} className="flex">
            <p className="bg-white p-2 text-center text-[10px] font-medium">
              {category.value} min
            </p>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="customshadow2 relative h-[263px] w-[258px] rounded-md bg-red-500">
      <h3
        className="absolute pl-[34px] pt-[29px] text-[15px] font-medium leading-6 text-white
"
      >
        Durée moyenne des <br /> sessions
      </h3>
      <div className="absolute bottom-4 left-[14px] flex w-[229px] justify-between text-[12px] uppercase text-white opacity-50">
        <p>L</p>
        <p>M</p>
        <p>M</p>
        <p>J</p>
        <p>V</p>
        <p>S</p>
        <p>D</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} >
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="white"
            strokeWidth={2}
            dot={false}
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tick={{ fill: "white" }}
            tickLine={false}
            hide={true}
          />
          <YAxis domain={["dataMin - 20", "dataMax + 45"]} hide={true} />

          <Tooltip
            content={<CustomTooltip />}
            offset={30}
            cursor={<CustomCursor />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
