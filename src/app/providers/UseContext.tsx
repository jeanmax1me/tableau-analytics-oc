"use client";
import React, { createContext, useState } from "react";

/**
 * Interface defining the context object used for user data and profile management.
 */
interface UserContextChildren extends React.ReactElement {}

/**
 * Creates a React Context object for user data and profile management.
 * 
 * This context provides properties for:
 *   - `userId`: The current user ID (default: 12).
 *   - `setUserId`: A function to update the user ID.
 *   - `handleProfileChange`: A function to handle user profile changes (potentially updates userId).
 */
export const UserContext = createContext({
  userId: 12,
  setUserId: (newUserId: number) => {},
  handleProfileChange: (newUserId: number) => {},
});

/**
 * UserProvider component that wraps child components and provides them access to user context.
 * 
 * @param {object} props - Component properties
 * @param {React.ReactElement} props.children - Child components to be wrapped within the context.
 * 
 * @returns {JSX.Element} - The UserProvider component.
 */
export const UserProvider = ({ children }: { children: UserContextChildren }) => {
  const [userId, setUserId] = useState(12);

  /**
   * Function to update the user ID state.
   * 
   * @param {number} newUserId - The new user ID to set.
   */
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
