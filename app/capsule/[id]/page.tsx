"use client";

import { pinata } from "@/utils/config";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import {
  ArrowBigLeftDashIcon,
  Cake,
  Download,
  File,
  House,
  Image,
  Link,
  Phone,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();
  const capsuleCid = String(params.id);
  const [information, setInformation] = useState<any>();
  const [documents, setDocuments] = useState<any>([]);
  const [iconSignedURL, setIconSignedURL] = useState("");

  // FETCH ALL RELATED INFORMATION AND GET EACH CID AND CREATE LINKS FOR EACH ONE
  const getInformation = async (cid: string) => {
    try {
      const res = await axios.post("/api/capsuleInformation", {
        capsuleCid: capsuleCid,
      });

      const data = await res.data;
      setInformation(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDocuments = async (cid: string) => {
    try {
      const res = await axios.post("/api/capsuleDocuments", {
        capsuleCid: capsuleCid,
      });

      const data = await res.data;
      setDocuments(data.documentNameAndCID);
    } catch (error) {
      console.log(error);
    }
  };

  const signDocument = async (cid: string) => {
    const urlRequest = await fetch("/api/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid: cid }),
    });
    const url = await urlRequest.json();
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const getIcon = async (cid: string) => {
    try {
      const res = await axios.post("/api/capsuleIcon", {
        capsuleCid: capsuleCid,
      });

      const data = await res.data;
      const urlRequest = await fetch("/api/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cid: data.iconCID }),
      });
      const url = await urlRequest.json();
      setIconSignedURL(url);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Promise.all([
      getInformation(capsuleCid),
      getDocuments(capsuleCid),
      getIcon(capsuleCid),
    ]);
  }, []);

  useEffect(() => {
    console.log(documents);
  }, [information, documents]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white font-semibold text-center rounded-3xl border shadow-md p-10 max-w-s">
        <div>
          {iconSignedURL ? (
            <img
              className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
              src={iconSignedURL}
              alt="profile picture"
            />
          ) : (
            <img
              className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
              src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
              alt="default"
            />
          )}
          <div className="flex flex-col w-full items-center space-y-1">
            <div>
              {information?.fullName ? (
                <h1 className="text-lg text-gray-700">
                  {information.fullName}
                </h1>
              ) : (
                <h1 className="text-lg text-gray-700">Full Name</h1>
              )}
            </div>
            <div className="items-center flex space-x-2">
              {information?.dateOfBirth ? (
                <div>
                  <Cake color="gray" height={20} width={20} />
                  <h3 className="text-sm text-gray-400 ">
                    {information?.dateOfBirth}
                  </h3>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="items-center flex space-x-2">
              {information?.phoneNumber ? (
                <div className="flex space-x-2">
                  <Phone color="gray" height={20} width={20} />
                  <h3 className="text-sm text-gray-400 ">
                    {information?.phoneNumber}
                  </h3>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="flex space-x-2 content-center items-center text-wrap place-content">
              {information?.address ? (
                <div className="flex space-x-2">
                  <House color="gray" height={20} width={20} />
                  <p className="text-sm text-gray-400">
                    {information?.address}
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="flex space-x-2 content-center items-center text-wrap place-content">
              {information?.bio ? (
                <div className="flex space-x-2">
                  <p className="text-sm text-gray-400">{information?.bio}</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="pt-8">
          <h1 className="text-gray-700">Documents</h1>
        </div>

        {documents.map((item: any, index: number) => (
          <div
            className="flex items-center space-x-2"
            key={index}
            onClick={() => signDocument(item.cid)}
          >
            <div className="h-[40px] w-full content-center rounded-md flex items-center space-x-2 p-3 mt-2 text-sm border-dashed border-2">
              <File color="#4a5568" />
              <h1 className="text-gray-700 hover:underline cursor-pointer">
                {item.name}
              </h1>
            </div>
            {/* <Download color="gray" /> */}
          </div>
        ))}

        <button className=" bg-[#14b8a6] px-8 py-2 mt-8 rounded-xl text-gray-100 font-semibold tracking-wide">
          Emergency Contacts
        </button>
      </div>
    </div>
  );
};

export default page;
