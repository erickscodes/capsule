"use client";

import NewCapsule from "@/components/NewCapsule";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
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

  const handleEdit = (cid: string) => {
    router.replace(`/capsule/${cid}/editor`);
  };

  const handleDelete = async (cid: string) => {
    try {
      const res = await axios.post("/api/deleteCapsule", {
        capsuleCid: cid,
      });
      const data = res.data;
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-4xl font-semibold tracking-wider">My Capsules</h1>
      {capsules.map((item: any, index: number) => (
        <div
          className="min-w-[300px] min-h-[200px] max-w-[400px] rounded-lg p-4 border-dashed border-2"
          key={index}
          // onClick={() => handleClick(item.cid)}
        >
          <h1 className="text-lg font-semibold text-[#14b8a6]">
            {item.keyvalues.name}
          </h1>
          <h1 className="text-gray-700">{item.keyvalues.description}</h1>
          <div className="w-full flex space-x-1 pt-20">
            <div
              className="p-2 bg-[#14b8a6] rounded-lg font-semibold text-white w-1/2"
              onClick={() => handleClick(item.cid)}
            >
              View
            </div>
            <div
              className="p-2 bg-gray-400 hover:text-white rounded-lg font-semibold text-gray-500 w-1/2"
              onClick={() => handleDelete(item.cid)}
            >
              Delete
            </div>
          </div>
        </div>
      ))}

      <div className="fixed bottom-4 right-4 text-white p-4">
        <NewCapsule />
      </div>
    </div>
  );
};

export default Page;
