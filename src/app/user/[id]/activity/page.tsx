"use client";
/**
 * @description This page component renders the user's health data dashboard.
 * It retrieves the user ID from the URL parameter and stores it in the context.
 * The component then displays various data visualization components for:
 *  - Daily Activity
 *  - Calories
 *  - Proteins
 *  - Carbohydrates
 *  - Lipids
 */
import React, { useContext, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { useParams } from "next/navigation";
import DailyActivity from "@/app/components/data/Daily-Activity";
import Glucides from "@/app/components/data/Glucides";
import Calories from "@/app/components/data/Calories";
import Proteines from "@/app/components/data/Proteines";
import Lipides from "@/app/components/data/Lipides";

const Index = () => {
  const { userId, setUserId } = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const userIdNumber = parseInt(id);
  /**
   * Extracts the user ID from the URL parameter and stores it in the context.
   */
  useEffect(() => {
    setUserId(userIdNumber);
  }, [userIdNumber, setUserId]);  // Dependency array ensures effect runs on ID change


  return (
    <div className="grid place-items-center gap-5">
      <DailyActivity />
      <Calories />
      <Proteines />
      <Glucides />
      <Lipides />
    </div>
  );
};

export default Index;
