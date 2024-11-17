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
  const { user } = useUser();
  const params = useParams();
  const capsuleCid = String(params.id);
  const [information, setInformation] = useState();
  const [documents, setDocuments] = useState<string[]>([]);
  const [documentNames, setDocumentNames] = useState<string[]>([]);
  const [json, setJson] = useState({});
  const [icon, setIcon] = useState();

  // FETCH ALL RELATED INFORMATION AND GET EACH CID AND CREATE LINKS FOR EACH ONE
  const getInformation = async (cid: string) => {
    const res = await axios.post("/api/capsule", {
      capsuleCid: capsuleCid,
      email: user?.primaryEmailAddress?.emailAddress,
    });

    const data = await res.data;

    console.log(await data);
    // information of capsule -> get newest one by doing length of files - 1
    const infoCID =
      data.combined.information.files[
        data.combined.information.files.length - 1
      ].cid;
    // icon -> latest icon
    const iconCID =
      data.combined.icon.files[data.combined.icon.files.length - 1]?.cid;
    // documents will have more than one file
    const documentCIDs = [];
    const documentsArr = data.combined.document.files;
    console.log(documentsArr);
    // loop through array and store in documentCIDs
    for (let i = 0; i < documentsArr.length; i++) {
      // push document CID into array
      setDocumentNames((prevDocuments) => [
        ...prevDocuments,
        documentsArr[i].name,
      ]);
      documentCIDs.push(documentsArr[i].cid);
    }
    // fetch information
    setInformation(await getSignedURL(infoCID));

    setIcon(await getSignedURL(iconCID));

    // fetch Document CID
    for (let i = 0; i < documentCIDs.length; i++) {
      const url = await getSignedURL(documentCIDs[i]);
      setDocuments((prevDocuments) => [...prevDocuments, url]);
    }
  };

  async function fetchJson(url: string) {
    try {
      // Send GET request with Axios
      const response = await axios.get(url);

      // Log the JSON data if request is successful
      console.log("Fetched JSON:", response.data);
    } catch (error) {
      // Catch and log any error that occurs during the request
      console.log("Error fetching the JSON:", error);
    }
  }
  const getSignedURL = async (cid: string) => {
    const urlRequest = await fetch("/api/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cid: cid }),
    });
    const url = await urlRequest.json();
    return url;
  };
  // add all data
  useEffect(() => {
    console.log(icon);
  }, [information, icon, documents]);
  useEffect(() => {
    getInformation(capsuleCid);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white font-semibold text-center rounded-3xl border shadow-md p-10 max-w-s">
        <div>
          {icon && (
            <img
              className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
              src={icon}
            />
          )}
          <div className="flex flex-col w-full items-center space-y-1">
            <div>
              <h1 className="text-lg text-gray-700">{}</h1>
            </div>
            <div className="items-center flex space-x-2">
              <Cake color="gray" height={20} width={20} />
              <h3 className="text-sm text-gray-400 ">11/14/2024</h3>
            </div>
            <div className="items-center flex space-x-2">
              <Phone color="gray" height={20} width={20} />
              <h3 className="text-sm text-gray-400 ">292-294-2924</h3>
            </div>
            <div className="flex space-x-2 content-center items-center text-wrap place-content">
              <House color="gray" height={20} width={20} />
              <p className="text-sm text-gray-400">
                5210 Address Bay Drive, Irving, TX, 75038
              </p>
            </div>
            <div className="flex space-x-2 content-center items-center text-wrap place-content">
              <p className="text-sm text-gray-400">Vietnamese</p>
            </div>
          </div>
        </div>
        <div className="pt-8">
          <h1 className="text-gray-700">Documents</h1>
        </div>
        {documents.map((item, index) => (
          <div className="flex items-center space-x-2" key={index}>
            <div className="h-[40px] w-full content-center rounded-md flex items-center space-x-2 p-3 mt-2 text-sm border-dashed border-2">
              <File color="#4a5568" />
              <a
                href={documents[index]}
                className="text-gray-700 hover:underline"
                target="_blank"
              >
                {documentNames[index]}
              </a>
            </div>
            <a
              href={documents[index]}
              className="text-gray-700 hover:underline"
              target="_blank"
            >
              <Link color="gray" width={20} height={20} />
            </a>
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
