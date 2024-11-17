"use client";

import axios from "axios";
import {
  Cake,
  Copy,
  File,
  House,
  Image,
  Link,
  Phone,
  Share,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QRCodeGenerator from "@/components/QRCodeGenerator";

const page = () => {
  const params = useParams();
  const capsuleCid = String(params.id);
  const [information, setInformation] = useState<any>();
  const [documents, setDocuments] = useState<any>([]);
  const [iconSignedURL, setIconSignedURL] = useState("");
  const [link, setLink] = useState("");

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

  useEffect(() => {
    // Ensure this runs only on the client
    setLink(`${window.location.origin}/capsule/${capsuleCid}`);
  }, [capsuleCid]);

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white font-semibold text-center rounded-3xl border shadow-md p-10 max-w-s">
        <div className="flex w-full justify-end pb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Share className="cursor-pointer" color="gray" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <h1 className="text-lg font-semibold">Connect with NFC Tag</h1>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input id="link" defaultValue={link} readOnly />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="px-3"
                  onClick={handleCopy}
                >
                  <span className="sr-only">Copy</span>
                  <Copy />
                </Button>
              </div>
              <div>
                {/* QR CODE */}
                <h1 className="text-lg font-semibold">Save this QR Code</h1>
                <QRCodeGenerator link={link} />
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
                <div className="flex space-x-2">
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

        <Dialog>
          <DialogTrigger asChild>
            <button className=" bg-[#14b8a6] px-8 py-2 mt-8 rounded-xl text-gray-100 font-semibold tracking-wide">
              Emergency Contacts
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Emergency Contacts</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-x-2">
              {/* content */}
              {information?.emergencyName ? (
                <div className="flex space-x-2">
                  <p className="text-lg">
                    {"Name: " + information?.emergencyName}
                  </p>
                </div>
              ) : (
                <div></div>
              )}
              {information?.emergencyPhone ? (
                <div className="flex space-x-2">
                  <p className="text-lg">
                    {"Phone: " + information?.emergencyPhone}
                  </p>
                </div>
              ) : (
                <div></div>
              )}
              {information?.email ? (
                <div className="flex space-x-2">
                  <p className="text-lg">{`Email: ` + information?.email}</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default page;
