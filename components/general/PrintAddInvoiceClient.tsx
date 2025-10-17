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

  // ----- PDF capture -----
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

    const pageWidth = pdf.internal.pageSize.getWidth(); // ~595pt
    const pageHeight = pdf.internal.pageSize.getHeight(); // ~842pt

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Fit whole capture on ONE page
    const ratio = Math.min(pageWidth / canvasWidth, pageHeight / canvasHeight);
    const imgWidth = canvasWidth * ratio;
    const imgHeight = canvasHeight * ratio;

    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    // Render captured image (no extra PDF border — single visible box comes from CSS)
    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight, undefined, "FAST");
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
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "⬇️ Download INVOICE"
          )}
        </Button>
      </div>

      {/* Off-screen wrapper */}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        {/* Capture area (A4 width). All content stays INSIDE this sharp box */}
        <div
          ref={contentRef}
          style={{
            position: "relative", // for watermark
            width: "794px", // ≈ A4 width @ 96dpi (8.27in * 96)
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "12px 10px", // tight L/R padding; everything stays inside
            fontSize: "11.2pt",
            lineHeight: 1.22, // reduced line spacing to help fit
            fontFamily: "'Inter','Helvetica','Arial',sans-serif",
            boxSizing: "border-box", // single, sharp, visible border (all sides)
            borderRadius: 0, // NOT rounded
            overflow: "hidden", // prevents any overflow beyond the box
          }}
        >
          {/* Watermark (centered, inside the box) */}
          <img
            src={logoUrl}
            alt="Watermark"
            crossOrigin="anonymous"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              top: "68%",
              transform: "translate(-50%, -50%) rotate(-18deg)",
              width: "48%",
              opacity: 0.06,
              pointerEvents: "none",
              userSelect: "none",
              zIndex: 0,
              filter: "grayscale(100%)",
            }}
          />

          {/* Foreground content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                borderBottom: "1px solid #111",
              }}
            >
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <img
                  src={logoUrl}
                  alt="Logo"
                  width={180}
                  height={60}
                  style={{ objectFit: "cover" }}
                  crossOrigin="anonymous"
                />
                <p style={{ fontSize: "15pt", color: "#555", marginLeft: 4 }}>
                  Invoice
                </p>
              </div>
              <div
                style={{ textAlign: "right", fontSize: "10pt", color: "#333" }}
              >
                <p>Invoice number: INV-{ad.id.slice(0, 6).toUpperCase()}</p>
                <p>Date: {formattedStartDate}</p>
              </div>
            </div>

            {/* Company & Ad Info */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                marginBottom: "8px",
                borderBottom: "1px solid #111",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{ fontWeight: 600, marginBottom: "4px" }}>
                  Company Information
                </h2>
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

              <div style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{ fontWeight: 600, marginBottom: "4px" }}>
                  Advertisement Information
                </h2>
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

            {/* Description */}
            {ad.additionalInfo && (
              <div style={{ marginBottom: "8px" }}>
                <h2 style={{ fontWeight: 600, marginBottom: "4px" }}>
                  Details
                </h2>
                <p style={{ textAlign: "justify" }}>{ad.additionalInfo}</p>
              </div>
            )}

            {/* Ad Banner — centered perfectly inside the box */}
            {bannerUrl && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "6px 0 8px",
                }}
              >
                <img
                  src={bannerUrl}
                  alt="Banner"
                  width={300}
                  height={200}
                  style={{
                    display: "block",
                    objectFit: "cover",
                    border: "1px solid #e5e7eb",
                    borderRadius: 0, // keep everything squared
                  }}
                  crossOrigin="anonymous"
                />
              </div>
            )}

            {/* Calculation Table (compact, inside the box) */}
            <div style={{ marginTop: 4, marginBottom: 8 }}>
              <h2 style={{ fontWeight: 600, marginBottom: 4 }}>Calculation</h2>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "11pt",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "6px 8px",
                        border: "1px solid #e5e7eb",
                        background: "#f7f7f7",
                        fontWeight: 600,
                      }}
                    >
                      Details
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "6px 8px",
                        border: "1px solid #e5e7eb",
                        background: "#f7f7f7",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Rate (Daily)
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "6px 8px",
                        border: "1px solid #e5e7eb",
                        background: "#f7f7f7",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Day
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "6px 8px",
                        border: "1px solid #e5e7eb",
                        background: "#f7f7f7",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Total (SEK)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: "6px 8px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      Advertisement ({formattedStartDate} - {formattedEndDate})
                    </td>
                    <td
                      style={{
                        padding: "6px 8px",
                        border: "1px solid #e5e7eb",
                        textAlign: "right",
                      }}
                    >
                      {dailyRate.toLocaleString("en-US")}
                    </td>
                    <td
                      style={{
                        padding: "6px 8px",
                        border: "1px solid #e5e7eb",
                        textAlign: "right",
                      }}
                    >
                      {durationInDays}
                    </td>
                    <td
                      style={{
                        padding: "6px 8px",
                        border: "1px solid #e5e7eb",
                        textAlign: "right",
                      }}
                    >
                      {subtotal.toLocaleString("en-US")}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        padding: "8px 8px",
                        border: "1px solid #e5e7eb",
                        textAlign: "right",
                        fontWeight: 700,
                        background: "#fafafa",
                      }}
                    >
                      Total
                    </td>
                    <td
                      style={{
                        padding: "8px 8px",
                        border: "1px solid #e5e7eb",
                        textAlign: "right",
                        fontWeight: 700,
                        background: "#fafafa",
                      }}
                    >
                      {subtotal.toLocaleString("en-US")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bank Info */}
            <div style={{ marginTop: "6px", fontSize: "11pt" }}>
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
                <strong>SWIFT Code:</strong> HANDSESS
              </p>

              <div
                style={{
                  marginTop: "6px",
                  padding: "8px",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e5e7eb",
                  borderRadius: 0,
                }}
              >
                <p style={{ fontWeight: "bold", color: "#0d47a1" }}>
                  📌 Reference:
                </p>
                <p>Please use the following reference in your bank transfer:</p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "14pt",
                    marginTop: "4px",
                  }}
                >
                  INV-{ad.id.slice(0, 6).toUpperCase()}
                </p>
              </div>
            </div>

            {/* Due Date */}
            <div
              style={{
                marginTop: "8px",
                backgroundColor: "#fffbe6",
                padding: "8px",
                border: "1px solid #ffecb3",
                fontSize: "11pt",
                color: "#aa6c39",
                borderRadius: 0,
              }}
            >
              <p style={{ fontWeight: "bold" }}>🕒 Payment Due Date:</p>
              <p>Please make the payment by {formattedDueDate}.</p>
            </div>

            {/* Footer Note */}
            <div style={{ marginTop: "8px", fontSize: "10pt", color: "#777" }}>
              <p>
                This invoice is an automatically generated digital document and
                does not require a signature.
              </p>
              <p>
                The advertisement will be published on Nord International according to
                the scheduled time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
