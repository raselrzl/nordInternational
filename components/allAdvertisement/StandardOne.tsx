import { prisma } from "@/app/utils/db";
import { Country } from "@/lib/generated/prisma";
import Image from "next/image";
import Link from "next/link";

interface StandardOneProps {
  country: string; // frontend country name like "Usa", "Bangladesh"
}

// Helper: map frontend country string to Prisma enum
function mapToCountryEnum(country: string): Country | undefined {
  if (!country) return undefined;
  const key = country.toUpperCase().replace(/ /g, "_") as keyof typeof Country;
  return Country[key];
}
// Data fetcher for SIZE_1 ads
export async function getStandardOneAdvertise(country: string) {
  const dbCountry = mapToCountryEnum(country);

  if (!dbCountry) return []; // fallback if mapping fails
  return await prisma.advertisement.findMany({
    where: {
      advertisedCategory: "STANDARD_1",
      advertiseStatus: "ACTIVE",
      country: dbCountry,
    },
    select: {
      id: true,
      companyName: true,
      websiteLink: true,
      advertiseBanner: true,
    },
    orderBy: { createdAt: "desc" },
    take: 1,
  });
}
 
// UI Component
export async function StandardOne({ country }: { country: string }) {
  const Advertise = await getStandardOneAdvertise(country);

  return (
    <>
      {Advertise && Object.keys(Advertise).length > 0 ? (
        <div className="flex items-center justify-center rounded-xl">
          {Advertise.map((ad) => (
            <Link
              href={`https://${ad.websiteLink}`}
              key={ad.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={ad.advertiseBanner}
                alt={ad.companyName}
                className="w-full h-[170px] rounded-xl object-cover"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl">
          <img
            src="/noad.png"
            alt="no ad. image"
           className="w-[360px] md:w-full h-[170px] md:h-[170px] rounded-xl md:pt-0 py-2 mt-5 object-cover"
          /> 
          <Link
            href="/about/advertise"
            className="inline-block text-white bg-primary hover:bg-primary/90 px-4 py-1.5 rounded-md text-xs transition"
          >
            Contact us for (STANDARD_1)
          </Link>
        </div>
      )}
    </>
  );
}
