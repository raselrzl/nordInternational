import { prisma } from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";

export async function getBesicTwoAdvertise() {
  return await prisma.advertisement.findMany({
    where: { advertisedCategory: "BASIC_2", advertiseStatus: "ACTIVE" },
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
export async function BesicTwoAdvertise() {
  const Advertise = await getBesicTwoAdvertise();

  return (
    <>
      {Advertise && Advertise.length > 0 ? (
        <div className="relative w-full h-[100px] md:h-[200px]">
          {Advertise.map((pro1) => (
            <Link
              href={`https://${pro1.websiteLink}`}
              key={pro1.id}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block relative"
            >
              <img
                src={pro1.advertiseBanner}
                alt={pro1.companyName}
         
                className="object-cover rounded"
            
              />
              <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-0.5 rounded">
                Ad.
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="relative w-full h-[100px] md:h-[200px] flex ">
          <img
            src="/noad.png"
            alt="image"
     
            className="object-cover md:rounded"
 
          />
            <Link
              href="/about/advertise"
              className="inline-block text-white bg-primary hover:bg-primary/90 px-4 py-1.5 rounded-md text-xs transition"
            >
              Contact us for (BASIC_2) Advertisement 
            </Link>
        </div>
      )}
    </>
  );
}

