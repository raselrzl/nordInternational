"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { AdvertiserSchema } from "@/app/utils/zodSchemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { districts } from "@/app/utils/locationList";
import { createAdvertiser } from "@/app/actions";

export default function Advertiser() {
  const form = useForm<z.infer<typeof AdvertiserSchema>>({
    resolver: zodResolver(AdvertiserSchema),
    defaultValues: {
      supervisorName: "",
      companyName: "",
      companyAddress: "",
      phoneNumber: "",
      aboutCompany: "",
      companyWebsite: "",
    },
  });
  const [pending, setPending] = useState(false);
   async function onSubmit(values: z.infer<typeof AdvertiserSchema>) {
    try {
      setPending(true);
      await createAdvertiser(values);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.log("Something went wrong. Please try again.");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-10 pb-8 border-1">
      <div className="flex justify-center mb-2">
        <img src="/logo/logo1.png" alt="logo image" width={300} height={100} />
      </div>
      <h1 className="text-center mb-4 font-bold text-xl">We’re delighted to have you with us!</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)} className="space-y-5"
        >
          <FormField
            control={form.control}
            name="supervisorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Mr. Joe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name / Job </FormLabel>
                <FormControl>
                  <Input placeholder="Media Limited / Employed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Location / Address</SelectLabel>
                      {districts.map((district) => (
                        <SelectItem value={district.name} key={district.id}>
                          <span>{district.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="07319000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Website / Job title (if any)</FormLabel>
                <FormControl>
                  <Input placeholder="www.company.com / Teacher" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aboutCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="I am a teacher..."
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Submitting..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
