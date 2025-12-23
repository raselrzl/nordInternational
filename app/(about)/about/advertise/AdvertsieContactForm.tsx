"use client";

import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { submitAdvertiseRequest } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function AdvertiseForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      companyWebsite: "",
      phoneNumber: "",
      message: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, reset } = form;

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      await submitAdvertiseRequest(formData);

      toast.success("Your message has been sent.");
      reset();
    } catch (error: any) {
      console.error("Submission failed:", error);
      setLoading(false);
    }
  };

  return (
    <div id="advertiseForm" className="max-w-2xl mx-auto px-1 py-16 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">
        Advertising Inquiry
      </h1>
      <p className="text-md mb-10 text-center text-gray-300">
        If you're interested in advertising, please fill out the form below.
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="bg-[#202020] border border-gray-700 shadow-md">
            <CardContent className="space-y-4 pt-6">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Your Name</FormLabel>
                    <FormControl>
                      <Input
                      required
                        placeholder="Enter your name..."
                        {...field}
                        className="bg-[#2a2a2a] text-gray-200 border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        required
                        placeholder="example@email.com"
                        {...field}
                        className="bg-[#2a2a2a] text-gray-200 border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Company Name</FormLabel>
                    <FormControl>
                      <Input
                      required
                        placeholder="Enter your company name..."
                        {...field}
                        className="bg-[#2a2a2a] text-gray-200 border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Company Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        required
                        {...field}
                        className="bg-[#2a2a2a] text-gray-200 border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter phone number..."
                        required
                        {...field}
                        className="bg-[#2a2a2a] text-gray-200 border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        required
                        placeholder="Write your message..."
                        {...field}
                        className="bg-[#2a2a2a] text-gray-200 border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
