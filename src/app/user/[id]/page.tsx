"use client";
import React, { useContext, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { useParams } from "next/navigation";
import Home from "@/app/page";

const Index = () => {
  const { userId, setUserId } = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const userIdNumber = parseInt(id);
  console.log(userIdNumber);

  useEffect(() => {
    setUserId(userIdNumber);
  }, [userIdNumber, setUserId]);

  console.log(userId);

  return <Home />;
};

export default Index;
