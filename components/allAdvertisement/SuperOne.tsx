// Server component (no "use client")
import { prisma } from "@/app/utils/db";
import { Advertisement } from "@/lib/generated/prisma";
import Image from "next/image";
import Link from "next/link";

type CountryEnum = Advertisement["country"];

export async function getSuperOneAdvertise(country: string) {
  const dbCountry = country.toUpperCase() as any; // Prisma enum type
  return await prisma.advertisement.findMany({
    where: {
      advertisedCategory: "ENTERPRISE_2",
      advertiseStatus: "ACTIVE",
      country: dbCountry as CountryEnum,
    },
    orderBy: { createdAt: "desc" },
    take: 1,
  });
}

export default async function SuperOne({ country }: { country: string }) {
  const Advertise = await getSuperOneAdvertise(country);

  return (
    <>
      {Advertise.length > 0 ? (
        <div className="flex items-center justify-center">
          {Advertise.map((ad) => (
            <Link
              key={ad.id}
              href={`https://${ad.websiteLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={ad.advertiseBanner}
                alt={ad.companyName}
                width={360}
                height={300}
                className="w-[360px] md:w-full h-[170px] md:h-[170px] rounded-xl py-2 mt-5 object-cover"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/noad.png"
            alt="no ad"
            className="w-full h-[170px] md:h-[170px] rounded-xl py-2 mt-5 object-cover"
          />
          <Link
            href="/about/advertise"
            className="inline-block text-white bg-primary hover:bg-primary/90 px-4 py-1.5 rounded-md text-xs transition"
          >
            Contact us for (SUPER_1) Advertisement
          </Link>
        </div>
      )}
    </>
  );
}
