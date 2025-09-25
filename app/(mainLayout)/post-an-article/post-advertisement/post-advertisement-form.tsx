"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, XIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { UploadDropzone } from "@/components/general/UploadThingReexported";
import { createAnAdvertisement } from "@/app/actions";

const advertisementPackages = [
  { id: "PREMIER_1", name: "Premier 1" },
  { id: "PREMIER_2", name: "Premier 2" },
  { id: "SIZE_1", name: "Size 1" },
  { id: "SIZE_2", name: "Size 2" },
  { id: "SUPER_1", name: "Super 1" },
  { id: "SUPER_2", name: "Super 2" },
  { id: "PREMIUM_1", name: "Premium 1" },
  { id: "PREMIUM_2", name: "Premium 2" },
  { id: "STANDARD_1", name: "Standard 1" },
  { id: "STANDARD_2", name: "Standard 2" },
  { id: "DELUXE_1", name: "Deluxe 1" },
  { id: "DELUXE_2", name: "Deluxe 2" },
  { id: "ULTIMATE_1", name: "Ultimate 1" },
  { id: "ULTIMATE_2", name: "Ultimate 2" },
  { id: "BASIC_1", name: "Basic 1" },
  { id: "BASIC_2", name: "Basic 2" },
  { id: "PRO_1", name: "Pro 1" },
  { id: "PRO_2", name: "Pro 2" },
  { id: "ENTERPRISE_1", name: "Enterprise 1" },
  { id: "ENTERPRISE_2", name: "Enterprise 2" },
];

export function CreateAdvertisementForm() {
  const [pending, setPending] = useState(false);
  const form = useForm({
    defaultValues: {
      companyName: "",
      companyaddress: "",
      supervisedName: "",
      supervisedPhonenumber: "",
      advertisedCategory: "",
      isFeatured: false,
      advertiseStatus: "DRAFT",
      /*       pageToview: "", */
      advertiseduration: 365,
      advertiseBanner: "",
      websiteLink: "",
      additionalInfo: "",
      startDate: "",
      endDate: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  async function onSubmit(data: any) {
    try {
      setPending(true);
      await createAnAdvertisement(data);
      console.log("📝 Submitted data:", data);
      toast.success("News article submitted!");
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        toast.error("Something went wrong (NEXT_REDIRECT). Please try again.");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Fill in all the details related to the advertisement here.
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <FormField
                control={control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Advertisement Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter company name..."
                        {...field}
                        className="placeholder:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="companyaddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter company address..."
                        {...field}
                        className="placeholder:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="supervisedName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observer's Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter observer's name..."
                        {...field}
                        className="placeholder:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="supervisedPhonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supervisor's Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number..."
                        {...field}
                        className="placeholder:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Starting Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ending Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-6">
              <FormField
                control={control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Do you want to display this advertisement on the front
                      page?
                    </FormLabel>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="advertiseStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DRAFT">DRAFT</SelectItem>
                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="advertisedCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Advertisement Package</FormLabel>
                    <div className="grid grid-cols-4 md:grid-cols-5 gap-1">
                      {advertisementPackages.map((pkg) => (
                        <Button
                          className="p-2 text-xs md:text-md"
                          key={pkg.id}
                          type="button"
                          variant={
                            field.value === pkg.id ? "default" : "outline"
                          }
                          onClick={() => field.onChange(pkg.id)}
                        >
                          {pkg.name}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*    <FormField
                control={control}
                name="advertisedCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>বিজ্ঞাপনের প্যাকেজ নির্বাচন করুন</FormLabel>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {advertisementPackages.map((pkg) => (
                        <label
                          key={pkg.id}
                          className="flex items-center justify-center gap-2 p-2 border rounded-xs cursor-pointer hover:bg-muted hover:text-white transition-all"
                        >
                          <input
                            type="radio"
                            className="hidden peer"
                            checked={field.value === pkg.id}
                            onChange={() => field.onChange(pkg.id)}
                          />
                          <span className="w-4 h-4 md:w-6 md:h-6 rounded-full border-2 transition-all peer-checked:bg-primary peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary mr"></span>
                          <span className="text-xs md:text-sm">{pkg.name}</span>
                        </label>
                      ))}
                    </div>
                  </FormItem>
                )}
              /> */}

              <FormField
                control={control}
                name="advertiseduration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <div className="grid grid-cols-3 gap-1">
                      {[1, 2, 3, 4, 5].map((y) => {
                        const days = y * 365;
                        return (
                          <Button
                            key={days}
                            type="button"
                            variant={
                              field.value === days ? "default" : "outline"
                            }
                            onClick={() => field.onChange(days)}
                          >
                            {y} Year
                          </Button>
                        );
                      })}
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-6 pt-6">
              <FormField
                control={control}
                name="advertiseBanner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Upload a banner that will be displayed as your
                      advertisement
                    </FormLabel>

                    <FormControl>
                      {field.value ? (
                        <div className="relative w-fit">
                          <img
                            src={field.value}
                            alt="Banner"
                            className="w-32 h-32 object-cover rounded"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2"
                            onClick={() => field.onChange("")}
                          >
                            <XIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <UploadDropzone
                          endpoint="imageUploader"
                          className="border-primary ut-button:bg-primary"
                          onClientUploadComplete={(res) =>
                            field.onChange(res[0].url)
                          }
                          onUploadError={async (err) => {
                            toast.error("Upload failed: " + err.message);
                          }}
                        />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="websiteLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Do you want the image to redirect to a specific link when
                      clicked?
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="https://..."
                        {...field}
                        className="placeholder:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Short Description..."
                        {...field}
                        className="placeholder:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              Publishing...
            </>
          ) : (
            "Publish ad."
          )}
        </Button>
      </form>
    </Form>
  );
}
