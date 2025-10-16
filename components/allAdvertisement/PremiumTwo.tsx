import { prisma } from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";

export async function getPremiumTwoAdvertise() {
  return await prisma.advertisement.findMany({
    where: { advertisedCategory: "PREMIUM_2" },
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
export async function PremiumTwoAdvertise() {
  const PremiarOneAdvertise = await getPremiumTwoAdvertise();
  return (
    <>
      {PremiarOneAdvertise && Object.keys(PremiarOneAdvertise).length > 0 ? (
        <div className="flex items-center justify-center">
          {PremiarOneAdvertise.map((premier1) => (
            <Link
              href={`https://${premier1.websiteLink}`}
              key={premier1.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={premier1.advertiseBanner}
                alt={premier1.companyName}
                width={300} // adjust as needed
                height={100}
                className="w-full h-[100px] rounded-xl mt-2 object-cover"
              />
            </Link> 
          ))}
        </div>
      ) : (
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/noad.png"
              alt="No Advertisement"
              width={300} // adjust as needed
              height={300}
              className="w-full h-[100px] rounded-xl mt-2 object-cover"
            />
               <Link
              href="/about/advertise"
              className="inline-block text-white bg-primary hover:bg-primary/90 px-4 py-1.5 rounded-md text-xs transition"
            >
              Contact us for (PREMIUM_2) Advertisement 
            </Link>
          </div>
      )}
    </>
  );
}