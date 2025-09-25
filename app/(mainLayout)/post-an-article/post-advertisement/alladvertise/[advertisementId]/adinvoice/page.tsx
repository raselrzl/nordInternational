import React from "react";
import { prisma } from "@/app/utils/db";
import { EmptyState } from "@/components/general/EmptyState";
import Image from "next/image";
import { notFound } from "next/navigation";
import PrintInvoiceClient from "@/components/general/PrintAddInvoiceClient";

async function getAdvertisement(advertisementId: string) {
  const ad = await prisma.advertisement.findUnique({
    where: {
      id: advertisementId,
    },
  });

  if (!ad) notFound();
  return ad;
}

export default async function AdvertiseDetailsPage({
  params,
}: {
  params: Promise<{ advertisementId: string }>;
}) {
  const { advertisementId } = await params;
  const ad = await getAdvertisement(advertisementId);

  if (!ad) {
    return (
      <EmptyState
        title="Oops! Nothing to show yet."
        description="This advertisement could not be found."
        buttonText="Go back to the homepage"
        href="/"
      />
    );
  }

  // Dates
  const start = new Date(ad.startDate);
  const end = new Date(ad.endDate);

  const formattedStartDate = start.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedEndDate = end.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Pricing Logic
  const dailyRate = 400; // Example daily rate
  const durationInDays = Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );
  const totalPrice = dailyRate * durationInDays;

  // Payment Due Date = Start Date + 15 days
  const paymentDueDate = new Date(start);
  paymentDueDate.setDate(start.getDate() + 15);

  const formattedDueDate = paymentDueDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <PrintInvoiceClient ad={ad as any} />
      <div className="max-w-4xl mx-auto bg-white border rounded-lg shadow-md p-10 my-10 font-sans">
        {/* 🔰 Header with Logo */}
        <div className="flex justify-between items-center border-b pb-6 mb-8">
          <div className="flex items-center gap-4">
            <div>
              <Image
                src="/n1w.png"
                alt="Company Logo"
                width={140}
                height={50}
                className="rounded"
              />
            </div>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>Invoice Number: INV-{ad.id.slice(0, 6).toUpperCase()}</p>
            <p>Date: {formattedStartDate}</p>
          </div>
        </div>

        {/* 🏢 Company & 📢 Ad Info */}
        <div className="grid grid-cols-2 gap-6 text-sm text-gray-700 mb-8">
          <div>
            <h2 className="font-semibold mb-2">Company Information</h2>
            <p>
              <strong>Name:</strong> {ad.companyName}
            </p>
            <p>
              <strong>Address:</strong> {ad.companyaddress}
            </p>
            <p>
              <strong>Supervisor:</strong> {ad.supervisedName}
            </p>
            <p>
              <strong>Phone:</strong> {ad.supervisedPhonenumber}
            </p>
            {ad.websiteLink && (
              <p>
                <strong>Website:</strong> {ad.websiteLink}
              </p>
            )}
          </div>
          <div>
            <h2 className="font-semibold mb-2">Advertisement Information</h2>
            <p>
              <strong>Type:</strong> {ad.advertisedCategory}
            </p>
            <p>
              <strong>Duration:</strong> {formattedStartDate} -{" "}
              {formattedEndDate}
            </p>
            <p>
              <strong>Total Days:</strong> {durationInDays} days
            </p>
            <p>
              <strong>Status:</strong> {ad.advertiseStatus}
            </p>
          </div>
        </div>

        {/* 📄 Description */}
        <div className="mb-8">
          <h2 className="font-semibold mb-2 text-gray-700">
            Detailed Description
          </h2>

          <p className="text-sm text-gray-700 text-justify">
            {ad.additionalInfo}
          </p>
        </div>

        {/* 📸 Banner Image */}
        {ad.advertiseBanner && (
          <div className="mb-10 flex justify-center">
            <Image
              src={ad.advertiseBanner}
              alt="Advertisement Banner"
              width={300}
              height={250}
              className="rounded-md border"
            />
          </div>
        )}

        {/* 💵 Invoice Breakdown */}
        <div className="border-t pt-4 text-sm text-gray-800">
          <div className="flex justify-between mb-2">
            <span>Rate per day</span>

            <span>SEK {dailyRate.toLocaleString("en-US")}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Total Days</span>
            <span>{durationInDays} Day</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
            <span>Total</span>
            <span>SEK {totalPrice.toLocaleString("en-US")}</span>
          </div>
        </div>

        {/* 🏦 Bank Info */}
        <div className="mt-10 text-sm text-gray-700 border-t pt-6">
          <h2 className="font-semibold mb-2">
            Payment Information (Investment/Transfer)
          </h2>
          {/* SEB Bank details */}
          <p className="mt-6">
            <strong>Bank Name:</strong> SEB Bank
          </p>
          <p>
            <strong>Account Number:</strong> 987 654 321
          </p>
          <p>
            <strong>Account Name:</strong> Jagrato News
          </p>
          <p>
            <strong>Branch:</strong> Stockholm, Sweden
          </p>
          <p>
            <strong>SWIFT Code:</strong> ESSESESS
          </p>

          <div className="mt-4 bg-gray-100 p-3 rounded-md border">
            <p className="font-semibold text-primary">
              📌 Bank Transfer Reference
            </p>
            <p>Please use the following reference in your transfer:</p>
            <p className="mt-1 font-bold text-lg tracking-wider text-gray-800">
              🔖 Reference: INV-{ad.id.slice(0, 6).toUpperCase()}
            </p>
          </div>
        </div>

        {/* 📅 Payment Due Date */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md text-sm">
          <p className="font-semibold">🕒 Payment Due Date:</p>
          <p>
            Please make the payment for this invoice by{" "}
            <span className="font-bold text-red-600">{formattedDueDate}</span>.
          </p>
        </div>

        {/* 📝 Footer Note */}
        <div className="mt-10 text-xs text-gray-500 border-t pt-4 leading-6">
          <p>
            This invoice is an automatically generated digital document and does
            not require any signature.
          </p>
          <p>
            The advertisement will be published on the Jagrato Barta website
            according to the specified duration.
          </p>
        </div>
      </div>
    </>
  );
}
