import { prisma } from "@/app/utils/db";
import { getCurrentUserType } from "@/app/utils/getCurrentUserType";
import Image from "next/image";
import Link from "next/link";

export async function getPremiumOneAdvertise() {
  return await prisma.advertisement.findMany({
    where: { advertisedCategory: "PREMIUM_1" },
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
export async function PremiumOneAdvertise() {
  const PremiarOneAdvertise = await getPremiumOneAdvertise();
  const currentUser = await getCurrentUserType();
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
              className="rounded-xl"
            >
              <Image
                src={premier1.advertiseBanner}
                alt={premier1.companyName}
                width={370} // adjust as needed
                height={300}
                className="w-[370px] h-[350px] rounded-xl"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/noad.png"
            alt="No Advertisement"
            width={400} // adjust as needed
            height={400}
            className="w-[370px] h-[250px] md:h-[350px]  rounded-xl
            "
          />
          <Link
              href="/about/advertise"
              className="inline-block text-white bg-primary hover:bg-primary/90 px-4 py-1.5 rounded-md text-xs transition"
            >
              Contact us for (PREMIUM_1) Advertisement 
            </Link>
        </div>
      )}
    </>
  );
}
