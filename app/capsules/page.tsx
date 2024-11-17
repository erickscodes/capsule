"use client";

import NewCapsule from "@/components/NewCapsule";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const page = () => {
  const { user } = useUser();
  const getCapsules = async () => {
    try {
      const res = await axios.post("/api/capsule", {
        email: "hi",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NewCapsule />
    </div>
  );
};

export default page;
