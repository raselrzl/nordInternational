import { prisma } from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";

export async function getDeluxeOneAdvertise() {
  return await prisma.advertisement.findMany({
    where: { advertisedCategory: "DELUXE_1" },
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
export async function DeluxeOneAdvertise() {
  const Advertise = await getDeluxeOneAdvertise();
  return (
    <div className="w-full flex justify-center">
      {Advertise && Advertise.length > 0 ? (
        <div className="border w-[600px] h-[70px] flex items-center justify-center">
          {Advertise.map((pro1) => (
            <Link
              href={`https://${pro1.websiteLink}`}
              key={pro1.id}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Image
                src={pro1.advertiseBanner}
                alt={pro1.companyName}
                width={600}
                height={70}
                className="max-h-[70px] w-auto object-contain"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="border w-[600px] h-[70px] flex items-center justify-center rounded-xl bg-primary/10 mx-auto">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">
              No advertisement available.
            </p>
            <Link
              href="/post-an-article/post-advertisement"
              className="inline-block text-white bg-primary hover:bg-primary/90 px-4 py-1.5 rounded-md text-xs transition"
            >
              Add Advertisement(DELUXE_1)
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
