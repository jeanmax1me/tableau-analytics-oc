"use client";
/**
 * @description This page component renders the user's fitness radar chart.
 * It retrieves the user ID from the URL parameter and stores it in the context.
 * The component then displays the `RadarFitness` component which presumably visualizes the user's fitness data in a radar chart format.
 */
import React, { useContext, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { useParams } from "next/navigation";
import RadarFitness from "@/app/components/data/RadarFitness";


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



  return <RadarFitness />;
};

export default Index;
