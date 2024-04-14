"use client";
import React, { useState } from "react";
import {
  getUserInfo,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
} from "@/app/api/getFunctions";

interface Session {
  day: string;
  calories?: number;
  kilogram?: number;
  sessionLength?: number;
}

const MyComponent = () => {
  const [userId, setUserId] = useState(12);
  const [userData, setUserData] = useState<any>(null);
  const [activityData, setActivityData] = useState<any>(null);
  const [userAverageSessions, setUserAverageSessions] = useState<any>(null);
  const [userPerformance, setUserPerformance] = useState<any>(null);

  const handleGetUserInformation = async () => {
    const fetchedData = await getUserInfo(userId);
    console.log(fetchedData);
    setUserData(fetchedData);
  };

  const handleGetUserActivity = async () => {
    const fetchedData = await getUserActivity(userId);
    console.log(fetchedData);
    setActivityData(fetchedData);
  };

  const handleGetUserAverageSessions = async () => {
    const fetchedData = await getUserAverageSessions(userId);
    console.log(fetchedData);
    setUserAverageSessions(fetchedData);
  };

  const handleGetUserPerformance = async () => {
    const fetchedData = await getUserPerformance(userId);
    console.log(fetchedData);
    setUserPerformance(fetchedData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-semibold">User Information & Activity</h2>
        <input
          type="number"
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          placeholder="Enter User ID"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
          onClick={handleGetUserInformation}
          className="rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Get User Info
        </button>
        <button
          onClick={handleGetUserActivity}
          className="rounded-md bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          Get User Activity
        </button>
        <button
          onClick={handleGetUserAverageSessions}
          className="rounded-md bg-indigo-300 px-4 py-2 font-bold text-white hover:bg-indigo-700"
        >
          Get User Average Sessions
        </button>
        <button
          onClick={handleGetUserPerformance}
          className="rounded-md bg-orange-200 px-4 py-2 font-bold text-white hover:bg-orange-400"
        >
          Get User Performance
        </button>
      </div>
      {userData?.data?.userInfos && ( 
        <div>
          <div className="mt-8 rounded-md border border-gray-300 p-4">
            <h3 className="mb-2 text-lg font-medium">User Details</h3>
            <ul className="list-disc pl-4">
              <li>Name: {userData?.data?.userInfos?.firstName || "—"}</li>
              <li>Last Name: {userData?.data?.userInfos?.lastName || "—"}</li>
              <li>Age: {userData?.data?.userInfos?.age || "—"}</li>
              <li>
                Score: {userData?.data?.todayScore || userData?.data?.score}{" "}
              </li>
            </ul>
          </div>
          <div className="mt-8 rounded-md border border-gray-300 p-4">
            <h3 className="mb-2 text-lg font-medium">keyData</h3>
            <ul className="list-disc pl-4">
              <li>Calories: {userData?.data?.keyData?.calorieCount || "—"}</li>
              <li>Protéines: {userData?.data?.keyData?.proteinCount || "—"}</li>
              <li>
                Glucides: {userData?.data?.keyData?.carbohydrateCount || "—"}
              </li>
              <li>Lipides: {userData?.data?.keyData?.lipidCount || "—"}</li>
            </ul>
          </div>
        </div>
      )}
      {activityData?.data?.sessions && (
        <div className="mt-8 rounded-md border border-gray-300 p-4">
          <h3 className="mb-2 text-lg font-medium">User Activity</h3>

          {activityData?.data?.sessions?.map((session: Session) => (
            <p key={session.day}>
              Date: {session.day}, Calories: {session.calories}, Poids:{" "}
              {session.kilogram}
            </p>
          ))}
        </div>
      )}
      {userAverageSessions?.data?.sessions && (
        <div className="mt-8 rounded-md border border-gray-300 p-4">
          <h3 className="mb-2 text-lg font-medium">User Average Sessions</h3>
          {userAverageSessions?.data?.sessions?.map((session: Session) => (
            <p key={session.day}>
              Day: {session.day}, Session Lenght: {session.sessionLength}
            </p>
          ))}
        </div>
      )}
      {userPerformance?.data?.data && (
        <div>
          <div className="mt-8 rounded-md border border-gray-300 p-4">
            <h3 className="mb-2 text-lg font-medium">User Performance</h3>
            <ul className="list-disc pl-4">
              <li>cardio: {userPerformance?.data?.data[0].value}</li>
              <li>energy: {userPerformance?.data?.data[1].value}</li>
              <li>endurance: {userPerformance?.data?.data[2].value}</li>
              <li>strength: {userPerformance?.data?.data[3].value}</li>
              <li>speed: {userPerformance?.data?.data[4].value}</li>
              <li>intensity: {userPerformance?.data?.data[5].value}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
