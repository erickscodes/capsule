"use client";

import NewCapsule from "@/components/NewCapsule";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [capsules, setCapsules] = useState<any>([]);
  const email = user?.primaryEmailAddress?.emailAddress;
  const getCapsules = async () => {
    try {
      const res = await axios.post("/api/capsules", {
        email: user?.primaryEmailAddress?.emailAddress,
      });
      const data = res.data;
      console.log(data.capsules.files);
      setCapsules(data.capsules.files);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (email) {
      getCapsules();
    }
  }, [email]);

  const handleClick = (cid: string) => {
    router.push(`/capsule/` + cid);
  };
  return (
    <div className="p-4 space-y-4">
      {capsules.map((item: any, index: number) => (
        <div
          className="min-w-[300px] min-h-[200px] max-w-[600px] rounded-lg p-4 cursor-pointer border-dashed border-2"
          key={index}
          onClick={() => handleClick(item.cid)}
        >
          <h1 className="text-lg font-semibold text-[#14b8a6]">
            {item.keyvalues.name}
          </h1>
          <h1 className="text-gray-700">{item.keyvalues.description}</h1>
        </div>
      ))}

      <div className="fixed bottom-4 right-4 text-white p-4">
        <NewCapsule />
      </div>
    </div>
  );
};

export default page;
