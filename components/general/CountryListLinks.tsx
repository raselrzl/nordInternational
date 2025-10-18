"use client";

import Image from "next/image";
import Link from "next/link";

const euCountries = [
  { name: "Bangladesh", flag: "/flags/bangladesh.jpg", link: "/diffrentCountry?country=Bangladesh" },
  { name: "Austria", flag: "/flags/Austria.png", link: "/diffrentCountry?country=Austria" },
  { name: "Belgium", flag: "/flags/belgium.webp", link: "/diffrentCountry?country=Belgium" },
  { name: "Bulgaria", flag: "/flags/bulgaria.webp", link: "/diffrentCountry?country=Bulgaria" },
  { name: "Croatia", flag: "/flags/croatia.webp", link: "/diffrentCountry?country=Croatia" },
  { name: "Cyprus", flag: "/flags/cyprus.jpg", link: "/diffrentCountry?country=Cyprus" },
  { name: "Czech Republic", flag: "/flags/czech-republic.png", link: "/diffrentCountry?country=Czech%20Republic" },
  { name: "Denmark", flag: "/flags/denmark.jpg", link: "/diffrentCountry?country=Denmark" },
  { name: "Estonia", flag: "/flags/estonia.jpeg", link: "/diffrentCountry?country=Estonia" },
  { name: "Finland", flag: "/flags/finland.jpg", link: "/diffrentCountry?country=Finland" },
  { name: "France", flag: "/flags/france.jpg", link: "/diffrentCountry?country=France" },
  { name: "Germany", flag: "/flags/germany.jpg", link: "/diffrentCountry?country=Germany" },
  { name: "Greece", flag: "/flags/greece.webp", link: "/diffrentCountry?country=Greece" },
  { name: "Hungary", flag: "/flags/hungary.png", link: "/diffrentCountry?country=Hungary" },
  { name: "Ireland", flag: "/flags/ireland.webp", link: "/diffrentCountry?country=Ireland" },
  { name: "Italy", flag: "/flags/italy.webp", link: "/diffrentCountry?country=Italy" },
  { name: "Latvia", flag: "/flags/latvia.jpg", link: "/diffrentCountry?country=Latvia" },
  { name: "Lithuania", flag: "/flags/lithuania.jpg", link: "/diffrentCountry?country=Lithuania" },
  { name: "Luxembourg", flag: "/flags/luxembourg.webp", link: "/diffrentCountry?country=Luxembourg" },
  { name: "Malta", flag: "/flags/malta.jpg", link: "/diffrentCountry?country=Malta" },
  { name: "Netherlands", flag: "/flags/netherlands.webp", link: "/diffrentCountry?country=Netherlands" },
  { name: "Poland", flag: "/flags/poland.jpeg", link: "/diffrentCountry?country=Poland" },
  { name: "Portugal", flag: "/flags/portugal.webp", link: "/diffrentCountry?country=Portugal" },
  { name: "Romania", flag: "/flags/romania.png", link: "/diffrentCountry?country=Romania" },
  { name: "Slovakia", flag: "/flags/slovakia.jpg", link: "/diffrentCountry?country=Slovakia" },
  { name: "Slovenia", flag: "/flags/slovenia.jpeg", link: "/diffrentCountry?country=Slovenia" },
  { name: "Spain", flag: "/flags/spain.svg", link: "/diffrentCountry?country=Spain" },
  { name: "Sweden", flag: "/flags/swedish.png", link: "/diffrentCountry?country=Sweden" },
];

export default function CountryListLinks() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-4 px-8 mt-8">
      {euCountries.map((country) => (
        <Link
          key={country.name}
          href={country.link}
          onClick={scrollToTop}
          className="flex items-center justify-center gap-2 border p-1 transition-all 
                     hover:opacity-80 active:opacity-60 active:scale-95 rounded"
        >
          <Image
            src={country.flag}
            alt={`${country.name} flag`}
            width={20}
            height={18}
            className="rounded-sm border"
          />
          <span className="text-xs font-medium">{country.name}</span>
        </Link>
      ))}
    </div>
  );
}
