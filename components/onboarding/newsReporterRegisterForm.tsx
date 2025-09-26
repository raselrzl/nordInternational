"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { districts } from "@/app/utils/locationList";
import { newsReporterSchema } from "@/app/utils/zodSchemas";
import { UploadDropzone } from "../general/UploadThingReexported";
import { createNewsReporter } from "@/app/actions";

export default function NewsReporterRegisterForm() {
  const form = useForm<z.infer<typeof newsReporterSchema>>({
    resolver: zodResolver(newsReporterSchema),
    defaultValues: {
      reporterName: "",
      location: "",
      bio: "",
      profilePicture: "",
      facebookProfileAddress: "",
      phoneNumber: "",
    },
  });
  const [pending, setPending] = useState(false);

  async function onSubmit(data: z.infer<typeof newsReporterSchema>) {
    try {
      setPending(true);
      await createNewsReporter(data);
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.log("Something went wrong. Please try again.");
      }
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-14 pb-8 border-1">
      <div className="flex justify-center mb-6">
        <Image src="/n33.png" alt="logo image" width={300} height={100} />
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="reporterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Journalist's Name</FormLabel>
                <FormControl>
                  <Input placeholder="Mr Joe" {...field} />
                </FormControl>
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
                  <Input placeholder="01712000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
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
            name="facebookProfileAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook Profile Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.facebook.com/joe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio section */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Yourself</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="I am a hardworking, honest, and ambitious person..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Profile Picture Upload */}
          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Profile Picture</FormLabel>

                <FormControl>
                  <div>
                    {field.value ? (
                      <div className="relative w-fit">
                        <Image
                          src={field.value}
                          alt="profilePicture"
                          width={100}
                          height={100}
                          className="rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2"
                          onClick={() => field.onChange("")}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          field.onChange(res[0].url);
                          console.log("profilePicture uploaded successfully!");
                        }}
                        onUploadError={() => {
                          console.log(
                            "Something went wrong. Please try again."
                          );
                        }}
                        className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-none"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full cursor-pointer" disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
