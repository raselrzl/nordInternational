"use client";

import React, { useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

type Ad = {
  id: string;
  companyName: string;
  companyaddress: string;
  supervisedName: string;
  supervisedPhonenumber: string;
  websiteLink?: string | null;
  advertisedCategory: string;
  advertiseStatus: string;
  additionalInfo?: string | null;
  advertiseBanner?: string | null;
  startDate: string | Date;
  endDate: string | Date;
};

export default function PrintInvoiceClient({
  ad,
  dailyRate = 400,
  buttonClassName = "mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/70 active:bg-primary/70 transition cursor-pointer",
}: {
  ad: Ad;
  dailyRate?: number;
  buttonClassName?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  // ----- Dates & pricing -----
  const start = useMemo(() => new Date(ad.startDate), [ad.startDate]);
  const end = useMemo(() => new Date(ad.endDate), [ad.endDate]);

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

  const durationInDays = Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );

  const subtotal = dailyRate * durationInDays;
  const moms = subtotal * 0.25; // 25% VAT (MOMS)
  const totalWithMoms = subtotal + moms;

  const paymentDueDate = useMemo(() => {
    const d = new Date(start);
    d.setDate(start.getDate() + 15);
    return d;
  }, [start]);

  const formattedDueDate = paymentDueDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ----- Assets & refs -----
  const filename = `INV-${ad.id.slice(0, 6).toUpperCase()}.pdf`;
  const logoUrl = "/n1w.png";
  const bannerUrl = ad.advertiseBanner || "";

  const contentRef = useRef<HTMLDivElement>(null);

  // ----- PDF Capture -----
  const handleDownload = async () => {
    if (!contentRef.current) return;
    setIsLoading(true);

    const canvas = await html2canvas(contentRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth(); // 595.28 pt
    const pageHeight = pdf.internal.pageSize.getHeight(); // 841.89 pt
    const margin = 36; // 0.5 inch = 36 pt
    const printableWidth = pageWidth - margin * 2;
    const printableHeight = pageHeight - margin * 2;

    const imgWidth = printableWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const finalHeight = Math.min(imgHeight, printableHeight);
    const finalWidth = (canvas.width * finalHeight) / canvas.height;

    const x = (pageWidth - finalWidth) / 2;
    const y = (pageHeight - finalHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight, undefined, "FAST");
    pdf.save(filename);

    setIsLoading(false);
  };

  return (
    <>
      {/* Download button */}
      <div className="flex justify-end mb-6 print:hidden">
        <Button
          onClick={handleDownload}
          className={buttonClassName}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-between">
              <Loader2 className="animate-spin w-5 h-5" />
              Downloading...
            </div>
          ) : (
            "⬇️ Download INVOICE"
          )}
        </Button>
      </div>

      {/* Hidden printable area */}
      <div style={{ position: "absolute", top: "-7777px", left: "-7777px" }}>
        <div
          ref={contentRef}
          style={{
            position: "relative",
            width: "720px", // fits A4 printable width within 0.5" margins
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "20px 36px",
            fontSize: "11pt",
            lineHeight: 1.3,
            fontFamily: "'Inter','Helvetica','Arial',sans-serif",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* Watermark */}
          <img
            src={logoUrl}
            alt="Watermark"
            crossOrigin="anonymous"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              top: "60%",
              transform: "translate(-50%, -50%) rotate(-18deg)",
              width: "48%",
              opacity: 0.06,
              pointerEvents: "none",
              zIndex: 0,
              filter: "grayscale(100%)",
            }}
          />

          {/* Foreground */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #111",
                marginBottom: "10px",
              }}
            >
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <img
                  src={logoUrl}
                  alt="Logo"
                  width={150}
                  height={60}
                  crossOrigin="anonymous"
                />
                <p style={{ fontSize: "15pt", color: "#555" }}>Invoice</p>
              </div>
              <div style={{ textAlign: "right", fontSize: "10pt", color: "#333" }}>
                <p>Invoice #: INV-{ad.id.slice(0, 6).toUpperCase()}</p>
                <p>Date: {formattedStartDate}</p>
              </div>
            </div>

            {/* Company Info */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                borderBottom: "1px solid #111",
                paddingBottom: "6px",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 600 }}>Company Information</h3>
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

              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 600 }}>Advertisement Info</h3>
                <p>
                  <strong>Category:</strong> {ad.advertisedCategory}
                </p>
                <p>
                  <strong>Duration:</strong> {formattedStartDate} - {formattedEndDate}
                </p>
                <p>
                  <strong>Days:</strong> {durationInDays}
                </p>
                <p>
                  <strong>Status:</strong> {ad.advertiseStatus}
                </p>
              </div>
            </div>

            {/* Banner */}
         {/*    {ad.advertiseBanner && (
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <img
                  src={ad.advertiseBanner}
                  alt="Banner"
                  width={300}
                  height={180}
                  crossOrigin="anonymous"
                  style={{
                    border: "1px solid #ddd",
                    objectFit: "cover",
                  }}
                />
              </div>
            )} */}

            {/* Table */}
            {/* <h3 style={{ fontWeight: 600, marginBottom: 4 }}>Calculation</h3> */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "8px",
                fontSize: "10.5pt",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                  <th style={{ textAlign: "left", border: "1px solid #ddd", padding: "8px" }}>Details</th>
                  <th style={{ textAlign: "right", border: "1px solid #ddd", padding: "8px" }}>Rate</th>
                  <th style={{ textAlign: "right", border: "1px solid #ddd", padding: "8px" }}>Days</th>
                  <th style={{ textAlign: "right", border: "1px solid #ddd", padding: "8px" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Advertisement ({formattedStartDate} - {formattedEndDate})
                  </td>
                  <td style={{ border: "1px solid #ddd", textAlign: "right", padding: "8px" }}>
                    {dailyRate.toLocaleString("en-US")}
                  </td>
                  <td style={{ border: "1px solid #ddd", textAlign: "right", padding: "8px" }}>
                    {durationInDays}
                  </td>
                  <td style={{ border: "1px solid #ddd", textAlign: "right", padding: "8px" }}>
                    {subtotal.toLocaleString("en-US")}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} style={{ textAlign: "right", fontWeight: 600, border: "1px solid #ddd", padding: "8px" }}>
                    MOMS (25%)
                  </td>
                  <td style={{ textAlign: "right", border: "1px solid #ddd", padding: "8px" }}>
                    {moms.toLocaleString("en-US")}
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#f7f7f7" }}>
                  <td colSpan={3} style={{ textAlign: "right", fontWeight: 700, border: "1px solid #ddd", padding: "8px" }}>
                    Total (SEK)
                  </td>
                  <td style={{ textAlign: "right", border: "1px solid #ddd", padding: "8px", fontWeight: 700 }}>
                    {totalWithMoms.toLocaleString("en-US")}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Bank Info */}
            <div style={{ fontSize: "10.5pt" }}>
              <p>
                <strong>Bank Name:</strong> Svenska Handelsbanken
              </p>
              <p>
                <strong>Account Number:</strong> 987 654 321
              </p>
              <p>
                <strong>Account Name:</strong> Nord International
              </p>
              <p>
                <strong>Branch:</strong> Stockholm City
              </p>
              <p>
                <strong>SWIFT:</strong> HANDSESS
              </p>
            </div>

            {/* Reference */}
            <div
              style={{
                marginTop: "8px",
                padding: "8px",
                background: "#eef3ff",
                border: "1px solid #cfd8ff",
              }}
            >
              <strong>📌 Reference:</strong> INV-{ad.id.slice(0, 6).toUpperCase()}
            </div>

            {/* Due Date */}
            <div
              style={{
                marginTop: "8px",
                padding: "8px",
                background: "#fff9e6",
                border: "1px solid #ffecb3",
                color: "#aa6c39",
              }}
            >
              <strong>🕒 Payment Due:</strong> {formattedDueDate}
            </div>

            {/* Footer */}
            <p style={{ marginTop: "8px", fontSize: "10pt", color: "#666" }}>
              This is an automatically generated invoice and does not require a signature.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
