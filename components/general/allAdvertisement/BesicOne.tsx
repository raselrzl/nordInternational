import { prisma } from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";

export async function getBesicOneAdvertise() {
  return await prisma.advertisement.findMany({
    where: { advertisedCategory: "BASIC_1" },
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
export async function BesicOneAdvertise() {
  const ProOneAdvertise = await getBesicOneAdvertise();
  return (
    <>
      {ProOneAdvertise && Object.keys(ProOneAdvertise).length > 0 ? (
        <div className="flex items-center justify-center border">
          {ProOneAdvertise.map((pro1) => (
            <Link
              href={`https://${pro1.websiteLink}`}
              key={pro1.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={pro1.advertiseBanner}
                alt={pro1.companyName}
                width={400} // adjust as needed
                height={300}
                className="w-[350px] md:w-[300px] h-full rounded-xl"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-2 mb-10">
          <Image
            src="/noad.png"
            alt="no ad. image"
            width={400} // adjust as needed
            height={300}
            className="w-[370px] md:w-[600px] h-[200px] rounded-xl"
          />
          <Link
            href="/post-an-article/post-advertisement"
            className="inline-block text-white bg-primary hover:bg-primary/90 px-4 py-1.5 rounded-md text-xs transition"
          >
            Click to Add Advertisement(BASIC_1)
          </Link>
        </div>
      )}
    </>
  );
}
