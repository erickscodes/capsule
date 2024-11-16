"use client";

import {
  ArrowBigLeftDashIcon,
  Cake,
  Download,
  File,
  House,
  Image,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  cardName: z.string().min(2, {
    message: "Required",
  }),
  cardDescription: z.string().min(2, {
    message: "Required",
  }),
  fullName: z.string().min(2, {
    message: "Required",
  }),
  dateOfBirth: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  emergencyName: z.string().optional(),
  emergencyPhoneNumber: z.string().optional(),
  emergencyEmail: z.string().optional(),
});

const page = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardDescription: "",
      fullName: "",
      dateOfBirth: "",
      bio: "",
      emergencyName: "",
      emergencyPhoneNumber: "",
      emergencyEmail: "",
    },
  });

  const { getValues } = form;
  const formValues = getValues();
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function onFileUpload() {}
  return (
    <div className="flex">
      <div className="md:w-3/4 w-full bg-slate-100 rounded-md md:shadow-xl p-10">
        <h1 className="text-4xl font-bold">Editor</h1>
        <p className="text-gray-400">Enter in details for card here</p>

        {/* FORM DATA */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="pt-4 text-xl py-5 border-dashed border-2 p-4 rounded-xl">
              <h1 className="font-semibold">Card Information</h1>
              <div className="flex flex-col md:flex-row md:space-x-4 items-center">
                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Medical Information"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Required</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Description" {...field} />
                      </FormControl>
                      <FormDescription>Required</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="text-xl py-5 border-dashed border-2 p-4 rounded-xl">
              <h1 className="font-semibold pb-4">User Information</h1>
              <div className="text-xl pb-2 rounded-xl space-y-2 border-dashed border-2 p-4">
                <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
                  <Label>Profile Picture</Label>
                  <Input type="file" />
                </div>
                {/* submit for files */}
                <Button
                  onClick={(e) => {
                    e.preventDefault(); // Only necessary if there's a possibility of it triggering submit
                    // Your logic here
                  }}
                >
                  Upload
                </Button>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 items-center pt-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: John Doe" {...field} />
                      </FormControl>
                      <FormDescription>Required</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 11/14/2024" {...field} />
                      </FormControl>
                      <FormDescription>Optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 items-center">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 123-456-7890" {...field} />
                      </FormControl>
                      <FormDescription>Optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: 456 Elm Street, Suite 3
Los Angeles, CA 90001"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="text-xl">
              <div className="text-xl py-5 border-dashed border-2 p-4 rounded-xl">
                <h1 className="font-semibold">Emergency Contact</h1>
                <div className="flex flex-col md:flex-row md:space-x-4 items-center">
                  <FormField
                    control={form.control}
                    name="emergencyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: John Doe" {...field} />
                        </FormControl>
                        <FormDescription>Optional</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyPhoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 11/14/2024" {...field} />
                        </FormControl>
                        <FormDescription>Optional</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="emergencyEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 1234@email.com" {...field} />
                      </FormControl>
                      <FormDescription>Optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="pt-4"></div>
              <div className="text-xl pt-5 border-dashed border-2 p-4 rounded-xl space-y-2">
                <h1 className="font-semibold">Documents</h1>
                <FormItem>
                  <FormLabel>File Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Insurance Card" />
                  </FormControl>
                  <FormDescription>Required</FormDescription>
                  <FormMessage />
                </FormItem>
                <div className="grid w-full max-w-sm items-center gap-1.5 pb-2">
                  <Label>File</Label>
                  <Input type="file" />
                </div>
                {/* submit for files */}
                <Button
                  onClick={(e) => {
                    e.preventDefault(); // Only necessary if there's a possibility of it triggering submit
                    // Your logic here
                  }}
                >
                  Upload
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="bg-[#14b8a6] hover:bg-[#14b8a6] w-full"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>

      {/* card */}
      <div className="items-center justify-center h-screen bg-white w-full md:flex hidden">
        <div className="bg-white  text-center rounded-3xl border shadow-md p-10 max-w-s">
          <div>
            <img
              className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt="product designer"
            />
            <div className="flex flex-col w-full items-center space-y-1">
              <div>
                <h1 className="text-lg text-gray-700 font-semibold">
                  Full Name
                </h1>
              </div>
              <div className="items-center flex space-x-2">
                <Cake color="gray" height={20} width={20} />
                <h3 className="text-sm text-gray-400 ">2/22/2022</h3>
              </div>
              <div className="items-center flex space-x-2">
                <Phone color="gray" height={20} width={20} />
                <h3 className="text-sm text-gray-400 ">123-456-7890</h3>
              </div>
              <div className="flex space-x-2 content-center items-center text-wrap place-content">
                <House color="gray" height={20} width={20} />
                <p className="text-sm text-gray-400">Hack UTD</p>
              </div>
              <div className="flex space-x-2 content-center items-center text-wrap place-content">
                <p className="text-sm text-gray-400">Vietnamese</p>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <h1 className="text-gray-700 font-semibold">Documents</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-[40px] border w-full content-center rounded-md flex items-center space-x-2 p-3 mt-2 text-sm">
              <File color="#4a5568" />
              <h1 className="text-gray-700">Past Medical History</h1>
            </div>
            <Download color="gray" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-[40px] border w-full content-center rounded-md flex items-center space-x-2 p-3 mt-2 text-sm">
              <File color="#4a5568" />
              <h1 className="text-gray-700">Insurance Card</h1>
            </div>
            <Download color="gray" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-[40px] border w-full content-center rounded-md flex items-center space-x-2 p-3 mt-2 text-sm">
              <File color="#4a5568" />
              <h1 className="text-gray-700">Primary Physician</h1>
            </div>
            <Download color="gray" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-[40px] border w-full content-center rounded-md flex items-center space-x-2 p-3 mt-2 text-sm">
              <Image color="#4a5568" />
              <h1 className="text-gray-700">Current Medication</h1>
            </div>
            <Download color="gray" />
          </div>
          <button className=" bg-[#14b8a6] px-8 py-2 mt-8 rounded-xl text-gray-100 font-semibold tracking-wide">
            Emergency Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
