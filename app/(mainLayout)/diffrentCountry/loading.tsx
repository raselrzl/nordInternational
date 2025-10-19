import { Skeleton } from "@/components/ui/skeleton";
import { SuperOne } from "@/components/allAdvertisement/SuperOne";
import Image from "next/image";

const euCountries = [
  { name: "Austria", flag: "/flags/Austria.png" },
  { name: "Bangladesh", flag: "/flags/bangladesh.jpg" },
  { name: "Belgium", flag: "/flags/belgium.webp" },
  { name: "Bulgaria", flag: "/flags/bulgaria.webp" },
  { name: "Croatia", flag: "/flags/croatia.webp" },
  { name: "Cyprus", flag: "/flags/cyprus.jpg" },
  { name: "Czech Republic", flag: "/flags/czech-republic.png" },
  { name: "Denmark", flag: "/flags/denmark.jpg" },
  { name: "Estonia", flag: "/flags/estonia.jpeg" },
  { name: "Finland", flag: "/flags/finland.jpg" },
  { name: "France", flag: "/flags/france.jpg" },
  { name: "Germany", flag: "/flags/germany.jpg" },
  { name: "Greece", flag: "/flags/greece.webp" },
  { name: "Hungary", flag: "/flags/hungary.png" },
  { name: "Ireland", flag: "/flags/ireland.webp" },
  { name: "Italy", flag: "/flags/italy.webp" },
  { name: "Latvia", flag: "/flags/latvia.jpg" },
  { name: "Lithuania", flag: "/flags/lithuania.jpg" },
  { name: "Luxembourg", flag: "/flags/luxembourg.webp" },
  { name: "Malta", flag: "/flags/malta.jpg" },
  { name: "Netherlands", flag: "/flags/netherlands.webp" },
  { name: "Poland", flag: "/flags/poland.jpeg" },
  { name: "Portugal", flag: "/flags/portugal.webp" },
  { name: "Romania", flag: "/flags/romania.png" },
  { name: "Slovakia", flag: "/flags/slovakia.jpg" },
  { name: "Slovenia", flag: "/flags/slovenia.jpeg" },
  { name: "Spain", flag: "/flags/spain.svg" },
  { name: "Sweden", flag: "/flags/swedish.png" },
];

export default function Loading() {
  return (
    <>
      <div className="grid grid-cols-5 mt-4 md:mt-8 animate-pulse">
        {/* 🌍 Country Tabs */}
        <div className="col-span-5 md:col-span-1">
          <div className="hidden md:block pb-2 mb-6 overflow-x-auto pt-4">
            <div className="flex flex-wrap gap-3 px-2">
              {euCountries.slice(0, 6).map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 border rounded-lg px-3 py-1"
                >
                  <Image
                    src={c.flag}
                    alt=""
                    width={22}
                    height={15}
                    className="rounded-sm opacity-60"
                  />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
          <div className="px-2 pt-3">
            <SuperOne />
          </div>
        </div>

        {/* 📰 Main Content */}
        <div className="col-span-5 md:col-span-3">
          {/* Featured Article Skeleton */}
          <div className="flex items-center gap-2 pl-2 mb-2">
            <Skeleton className="h-5 w-8 rounded-sm" />
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="mb-6 max-h-[320px] md:border-1 md:p-2">
            <div className="grid grid-cols-5">
              <div className="col-span-5 md:col-span-3 mt-10 md:mt-0">
                <Skeleton className="w-full h-[240px] md:h-[270px] rounded-xl" />
              </div>
              <div className="pl-1 md:pl-4 col-span-5 md:col-span-2 mt-2">
                <Skeleton className="h-6 w-64 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6 mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>

          <div className="px-2 md:px-0">
            <SuperOne />
          </div>

          {/* Grid Articles Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 py-6 px-2 border-y-1 md:border-1 my-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="max-w-md w-full mx-auto my-1 sm:max-w-xs md:max-w-md lg:max-w-lg"
              >
                <Skeleton className="w-auto h-[110px] md:h-[150px] rounded-xl mb-2" />
                <Skeleton className="h-5 w-48 mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Ads */}
        <div className="col-span-5 md:col-span-1 px-2 pt-3">
          <SuperOne />
          <SuperOne />
        </div>
      </div>

      <SuperOne />
    </>
  );
}
