"use client";
/**
 * @description This page component likely serves as a redirect or wrapper for the main application content.
 * It retrieves the user ID from the URL parameter (if present) and stores it in the context.
 * The component then renders the `Home` component, which presumably represents the main application UI.
 */
import React, { useContext, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { useParams } from "next/navigation";
import Home from "@/app/page";

const Index = () => {
  const { userId, setUserId } = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const userIdNumber = parseInt(id);

  /**
   * Extracts the user ID from the URL parameter (if present) and stores it in the context.
   */
  useEffect(() => {
    setUserId(userIdNumber);
  }, [userIdNumber, setUserId]); // Dependency array ensures effect runs on ID change (if present)


  return <Home />;
};

export default Index;
