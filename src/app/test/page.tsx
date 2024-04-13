"use client";
import React, { useState, useEffect } from "react";
import { getUserInfo, getUserActivity } from "@/app/api/getFunctions"; // Assuming getFunctions.tsx is in the same directory

const MyComponent = () => {
  interface Session {
    day: string;
    kilogram?: number; // Optional property
    calories: number;
  }

  const [userId, setUserId] = useState(12);
  const [userData, setUserData] = useState<any>(null);
  const [activityData, setActivityData] = useState<any>(null);

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
      </div>

      {userData?.data?.userInfos && ( // Display user info only if data is fetched
        <div>
          <div className="mt-8 rounded-md border border-gray-300 p-4">
            <h3 className="mb-2 text-lg font-medium">User Details</h3>
            <ul className="list-disc pl-4">
              <li>Name: {userData?.data?.userInfos?.firstName || "—"}</li>
              <li>Last Name: {userData?.data?.userInfos?.lastName || "—"}</li>
              <li>Age: {userData?.data?.userInfos?.age || "—"}</li>
            </ul>
          </div>
          <div className="mt-8 rounded-md border border-gray-300 p-4">
            <h3 className="mb-2 text-lg font-medium">keyData</h3>
            <ul className="list-disc pl-4">
              <li>Calories: {userData?.data?.userInfos?.firstName || "—"}</li>
              <li>Protéines: {userData?.data?.userInfos?.lastName || "—"}</li>
              <li>Glucides: {userData?.data?.userInfos?.age || "—"}</li>
              <li>Lipides: {userData?.data?.userInfos?.age || "—"}</li>
            </ul>
          </div>
        </div>
      )}

      {activityData?.data?.sessions && ( // Display activity data only if data is fetched
        <div className="mt-8 rounded-md border border-gray-300 p-4">
          <h3 className="mb-2 text-lg font-medium">User Activity</h3>
          {/* Activity data */}
          {activityData?.data?.sessions?.map((session) => (
            <p key={session.day}>
              Date: {session.day}, Calories: {session.calories}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComponent;
