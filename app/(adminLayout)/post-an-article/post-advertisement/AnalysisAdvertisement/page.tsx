import { prisma } from "@/app/utils/db";
import AdvertisementAnalysisClient from "./AdvertisementAnalysisClient";

export default async function AdvertisementAnalysisServer() {
  // Fetch all advertisements on the server
  const ads = await prisma.advertisement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AdvertisementAnalysisClient serverAds={ads} />;
}
