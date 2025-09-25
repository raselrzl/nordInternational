import { prisma } from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";

export async function getSuperOneAdvertise() {
  return await prisma.advertisement.findMany({
    where: { advertisedCategory: "SUPER_1" },
    select: {
      id: true,
      createdAt: true,
      isFeatured: true,
      companyName: true,
      companyaddress: true,
      websiteLink: true,
      advertiseBanner: true,
      endDate: true,
      supervisedPhonenumber: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });
}
export async function SuperOne() {
  const Advertise = await getSuperOneAdvertise();
  return (
    <>
      {Advertise && Object.keys(Advertise).length > 0 ? (
        <div className="flex items-center justify-center">
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
                width={360} // adjust as needed
                height={300}
                className="w-[360px] md:w-full h-[170px] md:h-[170px] rounded-xl md:pt-0 py-2 mt-5 object-fill md:object-cover"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/noad.png"
            alt="no ad. image"
            className="w-full md:w-full h-[170px] md:h-[170px] rounded-xl md:pt-0 py-2 mt-5 object-fill md:object-cover"
          />
          <Link
            href="/post-an-article/post-advertisement"
            className="inline-block text-white bg-primary hover:bg-primary/90 px-4 py-1.5 rounded-md text-xs transition"
          >
            Click to Add Advertisement(SUPER_1)
          </Link>
        </div>
      )}
    </>
  );
}
