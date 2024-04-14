"use client";
import React, { createContext, useState } from "react";

interface UserContextChildren extends React.ReactElement {}

export const UserContext = createContext({
  userId: 12,
  setUserId: (newUserId: number) => {},
  handleProfileChange: (newUserId: number) => {},
});

export const UserProvider = ({
  children,
}: {
  children: UserContextChildren;
}) => {
  const [userId, setUserId] = useState(12);
  const handleProfileChange = (newUserId: number) => {
    setUserId(newUserId);
  };
  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        handleProfileChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
