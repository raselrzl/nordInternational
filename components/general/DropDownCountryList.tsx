"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";

const euCountries = [
  {
    name: "Austria",
    flag: "/flags/Austria.png",
    link: "/international#AustriaNews",
  },
  {
    name: "Belgium",
    flag: "/flags/belgium.webp",
    link: "/countrywide#BelgiumNews",
  },
  {
    name: "Bulgaria",
    flag: "/flags/bulgaria.webp",
    link: "/crime#BulgariaNews",
  },
  {
    name: "Croatia",
    flag: "/flags/croatia.webp",
    link: "/environment#CroatiaNews",
  },
  { name: "Cyprus", flag: "/flags/cyprus.jpg", link: "/politics#CyprusNews" },

  {
    name: "CzechRepublic",
    flag: "/flags/czech-republic.png",
    link: "/diffrentCountry?country=CzechRepublic",
  },

  { name: "Denmark", flag: "/flags/denmark.jpg", link: "/economy#DenmarkNews" },
  {
    name: "Estonia",
    flag: "/flags/estonia.jpeg",
    link: "/diffrentCountry?country=Estonia",
  },
  { name: "Finland", flag: "/flags/finland.jpg", link: "/health#FinlandNews" },
  { name: "France", flag: "/flags/france.jpg", link: "/opinion#FranceNews" },
  {
    name: "Germany",
    flag: "/flags/germany.jpg",
    link: "/education#GermanyNews",
  },
  {
    name: "Greece",
    flag: "/flags/greece.webp",
    link: "/diffrentCountry?country=Greece",
  },
  {
    name: "Hungary",
    flag: "/flags/hungary.png",
    link: "/diffrentCountry?country=Hungary",
  },
  {
    name: "Ireland",
    flag: "/flags/ireland.webp",
    link: "/diffrentCountry?country=Ireland",
  },
  { name: "Italy", flag: "/flags/italy.webp", link: "/sports#ItalyNews" },
  {
    name: "Latvia",
    flag: "/flags/latvia.jpg",
    link: "/diffrentCountry?country=Latvia",
  },
  {
    name: "Lithuania",
    flag: "/flags/lithuania.jpg",
    link: "/diffrentCountry?country=Lithuania",
  },
  {
    name: "Luxembourg",
    flag: "/flags/luxembourg.webp",
    link: "/law-and-justice#LuxembourgNews",
  },
  {
    name: "Malta",
    flag: "/flags/malta.jpg",
    link: "/diffrentCountry?country=Malta",
  },
  {
    name: "Netherlands",
    flag: "/flags/netherlands.webp",
    link: "/diffrentCountry?country=Netherlands",
  },
  {
    name: "Poland",
    flag: "/flags/poland.jpeg",
    link: "/technology#PolandNews",
  },
  {
    name: "Portugal",
    flag: "/flags/portugal.webp",
    link: "/religion#PortugalNews",
  },

  {
    name: "Romania",
    flag: "/flags/romania.png",
    link: "/diffrentCountry?country=Romania",
  },
  {
    name: "Slovakia",
    flag: "/flags/slovakia.jpg",
    link: "/diffrentCountry?country=Slovakia",
  },
  {
    name: "Slovenia",
    flag: "/flags/slovenia.jpeg",
    link: "/diffrentCountry?country=Slovenia",
  },

  { name: "Spain", flag: "/flags/spain.svg", link: "/entertainment#SpainNews" },
  { name: "Sweden", flag: "/flags/swedish.png", link: "/national#SwedishNews" },

  { name: "Uk", flag: "/flags/uk.png", link: "/diffrentCountry?country=Uk" },
  {
    name: "Switzerland",
    flag: "/flags/switzerland.jpg",
    link: "/diffrentCountry?country=Switzerland",
  },
  {
    name: "Usa",
    flag: "/flags/usa.webp",
    link: "/diffrentCountry?country=Usa",
  },
  {
    name: "Canada",
    flag: "/flags/canada.jpg",
    link: "/diffrentCountry?country=Canada",
  },
  {
    name: "Australia",
    flag: "/flags/australia.jpg",
    link: "/diffrentCountry?country=Australia",
  },
  {
    name: "Norway",
    flag: "/flags/norway.webp",
    link: "/diffrentCountry?country=Norway",
  },
  {
    name: "Bangladesh",
    flag: "/flags/bangladesh.jpg",
    link: "/diffrentCountry?country=Bangladesh",
  },

  {
    name: "Chaina",
    flag: "/flags/chaina.jpg",
    link: "/diffrentCountry?country=Chaina",
  },
  {
    name: "Russia",
    flag: "/flags/russia.jpeg",
    link: "/diffrentCountry?country=Russia",
  },
  {
    name: "Afrika",
    flag: "/flags/afrika.png",
    link: "/diffrentCountry?country=Afrika",
  },
  {
    name: "Asia",
    flag: "/flags/asia.jpg",
    link: "/diffrentCountry?country=Asia",
  },
  {
    name: "India",
    flag: "/flags/india.jpg",
    link: "/diffrentCountry?country=India",
  },
  {
    name: "Middleeast",
    flag: "/flags/middleeast.webp",
    link: "/diffrentCountry?country=Middleeast",
  },
  {
    name: "Southamerica",
    flag: "/flags/southamerica.jpg",
    link: "/diffrentCountry?country=Southamerica",
  },
  {
    name: "Pakistan",
    flag: "/flags/pakistan.jpg",
    link: "/diffrentCountry?country=Pakistan",
  },
];

export default function DropDownCountryList() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="border-none shadow-none">
          <p className="font-bold text-md uppercase">Eyes On</p>
          <ChevronDown className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className=" max-h-[400px] overflow-y-auto p-2"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {euCountries.map((country) => (
            <DropdownMenuItem
              asChild
              key={country.name}
              className="cursor-pointer"
            >
              <Link href={country.link}>
                <div className="flex items-center gap-1">
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    width={16}
                    height={12}
                    className="rounded-sm"
                  />
                  <span className="font-semibold text-sm">{country.name}</span>
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
