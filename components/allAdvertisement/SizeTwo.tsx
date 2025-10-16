import { prisma } from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";

export async function getsizeTwoAdvertise() {
  return await prisma.advertisement.findMany({
    where: { advertisedCategory: "SIZE_2" },
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
export async function SizeTwoAdvertise() {
  const Advertise = await getsizeTwoAdvertise();
  return (
    <>
      {Advertise && Object.keys(Advertise).length > 0 ? (
        <div className="">
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
                fill
                className="object-cover"
                priority
              />
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <Image
            src="/noad.png"
            alt="image"
            fill
            className="object-cover"
            priority
          />
          <Link
              href="/about/advertise"
              className="inline-block text-white bg-primary hover:bg-primary/90 px-4 py-1.5 rounded-md text-xs transition"
            >
              Contact us for (SIZE_2) Advertisement 
            </Link>
        </div>
      )}
    </>
  );
}
