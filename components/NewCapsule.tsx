"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  cardName: z.string().min(2, {
    message: "Required",
  }),
  cardDescription: z.string().min(2, {
    message: "Required",
  }),
});

const NewCapsule = () => {
  const { user } = useUser();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardDescription: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const emailAdress = user?.primaryEmailAddress?.emailAddress;
    console.log(emailAdress, values);

    console.log(values);

    const response = await axios.post("/api/createCapsule", {
      capsuleName: values.cardName,
      capsuleDescription: values.cardDescription,
      email: emailAdress,
    });

    console.log(response);
    const data = await response.data;
    // get capsule CID
    const capsuleCid = data?.upload?.cid;
    // push user into editor
    router.push(`capsule/${capsuleCid}/editor`);

    try {
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#14b8a6] hover:bg-[#14b8a6]">New Capsule</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Capsule</DialogTitle>
          <DialogDescription>Create a new capsule!</DialogDescription>
        </DialogHeader>
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
            <Button
              type="submit"
              className="bg-[#14b8a6] hover:bg-[#14b8a6] w-full"
            >
              Submit
            </Button>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCapsule;
