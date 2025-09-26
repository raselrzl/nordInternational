import { prisma } from "@/app/utils/db";
import Image from "next/image";
import Link from "next/link";

export async function getSuperTwoAdvertise() {
  return await prisma.advertisement.findMany({
    where: { advertisedCategory: "SUPER_2" },
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
export async function SuperTwo() {
  const SuperTwoAdvertise = await getSuperTwoAdvertise();
  return (
    <div className="mb-4 px-2 md:p-0">
      <div className="">
        {SuperTwoAdvertise && Object.keys(SuperTwoAdvertise).length > 0 ? (
          <div className="flex items-center justify-center">
            {SuperTwoAdvertise.map((super1) => (
              <Link
                href={`https://${super1.websiteLink}`}
                key={super1.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={super1.advertiseBanner}
                  alt={super1.companyName}
                  width={400} // adjust as needed
                  height={200}
                  className="w-[400px] h-[200px] md:h-[180px] rounded-xl"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto border rounded-xl bg-gray-50 shadow-sm p-6 text-center mt-4">
            <p className="text-sm text-gray-600 mb-2">
              No <strong>Super Two</strong> advertisement available.
            </p>
            <Link
              href="/post-an-article/post-advertisement"
              className="inline-block text-white bg-primary hover:bg-primary/90 px-4 py-1.5 rounded-md text-xs transition"
            >
              Add Advertisement
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
