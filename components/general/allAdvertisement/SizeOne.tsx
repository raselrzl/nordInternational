import { prisma } from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";

// Data fetcher for SIZE_1 ads
export async function getsizeOneAdvertise() {
  return await prisma.advertisement.findMany({
    where: { advertisedCategory: "SIZE_1" },
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
export async function SizeOneAdvertise() {
  const Advertise = await getsizeOneAdvertise();

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
              <Image
                src={ad.advertiseBanner}
                alt={ad.companyName}
                width={300} // adjust as needed
                height={300}
                className="w-full h-[170px] rounded-xl"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/noad.png"
            alt="no ad. image"
            className="w-full h-[170px] rounded-xl"
          />
          <Link
            href="/post-an-article/post-advertisement"
            className="inline-block text-white bg-primary hover:bg-primary/90 py-1.5 rounded-md text-xs transition"
          >
            Click to Add Advertisement(SIZE_1)
          </Link>
        </div>
      )}
    </>
  );
}
