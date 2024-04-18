"use client";
import React, { useContext, useEffect } from "react";
import { UserContext } from "@/app/providers/UseContext";
import { useParams } from "next/navigation";
import SessionsLenght from "@/app/components/data/Sessions-Lenght";


const Index = () => {
  const { userId, setUserId } = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const userIdNumber = parseInt(id);

  useEffect(() => {
    setUserId(userIdNumber);
  }, [userIdNumber, setUserId]);



  return <SessionsLenght />;
};

export default Index;
