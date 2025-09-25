import { z } from "zod";

export const newsReporterSchema = z.object({
  reporterName: z
    .string()
    .min(2, "Your name must be at least 2 characters long"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().min(10, "Please write some information about yourself"),
  profilePicture: z.string().min(1, "Please upload a picture"),
  phoneNumber: z.string().min(10, "Please enter your phone number"),

  facebookProfileAddress: z.string().optional(),
});

export const AdvertiserSchema = z.object({
  supervisorName: z
    .string()
    .min(2, "Your name must be at least 2 characters long"),
  companyName: z
    .string()
    .min(4, "Company name must be at least 4 characters long"),
  companyAddress: z.string().min(1, "Location is required"),
  phoneNumber: z.string().min(1, "Please provide a phone number"),
  aboutCompany: z
    .string()
    .min(
      10,
      "Please provide a description of the company with at least 10 characters"
    ),

  companyWebsite: z.string().optional(),
});
const quoteSchema = z.object({
  text: z.string(),
  speakerInfo: z.string(),
});

export const newsArticleSchema = z.object({
  newsHeading: z.string().min(6, "News headline is required"),

  newsResource: z.string(),
  newsLocation: z.string().optional(),
  newsCategory: z.enum([
    "LATEST",
    "NATIONAL",
    "POLITICS",
    "COUNTRYWIDE",
    "INTERNATIONAL",
    "SPORTS",
    "EDUCATION",
    "HEALTH",
    "OPINION",
    "RELIGION",
    "CRIME",
    "TECHNOLOGY",
    "ENTERTAINMENT",
    "ECONOMY",
    "LAW_AND_JUSTICE",
    "ENVIRONMENT",
    "SCIENCE",
  ]),
  newsPicture: z.string().url("Required"),
  newsPictureHeading: z.string(),
  newsPictureCredit: z.string(),
  newsDetails: z.string().min(10, "Details"),
  duration: z.number().optional(),
  isFeatured: z.boolean().optional(),
  newsArticleStatus: z.enum(["EXPIRED", "ACTIVE", "DRAFT"]),
  reporterName: z.string().optional(),
  phoneNumber: z.string(),
  location: z.string(),
  facebookProfileAddress: z.string().optional(),
  bio: z.string(),
  profilePicture: z.string().url("Required"),
  quotes: z.array(quoteSchema),
});

export const AdvertiseRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  companyName: z.string().min(4),
  companyWebsite: z.string().min(4),
  phoneNumber: z.string().min(10),
  message: z.string().min(10),
});
