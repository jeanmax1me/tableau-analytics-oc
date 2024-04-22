"use client";
/**
 * @description This page component renders the user's session length data visualization.
 * It retrieves the user ID from the URL parameter and stores it in the context.
 * The component then displays the `SessionsLenght` component which presumably visualizes the length of the user's sessions.
 */
import React, { useContext, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { useParams } from "next/navigation";
import SessionsLenght from "@/app/components/data/Sessions-Lenght";


const Index = () => {
  const { userId, setUserId } = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const userIdNumber = parseInt(id);

  /**
   * Extracts the user ID from the URL parameter and stores it in the context.
   */
  useEffect(() => {
    setUserId(userIdNumber);
  }, [userIdNumber, setUserId]); // Dependency array ensures effect runs on ID change



  return <SessionsLenght />;
};

export default Index;
