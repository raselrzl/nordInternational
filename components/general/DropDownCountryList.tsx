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
    name: "Czech Republic",
    flag: "/flags/czech-republic.png",
    link: "/diffrentCountry#CzechNews",
  },

  { name: "Denmark", flag: "/flags/denmark.jpg", link: "/economy#DenmarkNews" },
  {
    name: "Estonia",
    flag: "/flags/estonia.jpeg",
    link: "/international#EstoniaNews",
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
    link: "/diffrentCountry#GreeceNews",
  },
  {
    name: "Hungary",
    flag: "/flags/hungary.png",
    link: "/diffrentCountry#HungaryNews",
  },
  {
    name: "Ireland",
    flag: "/flags/ireland.webp",
    link: "/diffrentCountry#IrelandNews",
  },
  { name: "Italy", flag: "/flags/italy.webp", link: "/sports#ItalyNews" },
  {
    name: "Latvia",
    flag: "/flags/latvia.jpg",
    link: "/diffrentCountry#LatviaNews",
  },
  {
    name: "Lithuania",
    flag: "/flags/lithuania.jpg",
    link: "/diffrentCountry#LithuaniaNews",
  },
  {
    name: "Luxembourg",
    flag: "/flags/luxembourg.webp",
    link: "/law-and-justice#LuxembourgNews",
  },
  {
    name: "Malta",
    flag: "/flags/malta.jpg",
    link: "/diffrentCountry#MaltaNews",
  },
  {
    name: "Netherlands",
    flag: "/flags/netherlands.webp",
    link: "/science#NetherlandsNews",
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
    link: "/diffrentCountry#RomaniaNews",
  },
  {
    name: "Slovakia",
    flag: "/flags/slovakia.jpg",
    link: "/diffrentCountry#SlovakiaNews",
  },
  {
    name: "Slovenia",
    flag: "/flags/slovenia.jpeg",
    link: "/diffrentCountry#SloveniaNews",
  },

  { name: "Spain", flag: "/flags/spain.svg", link: "/entertainment#SpainNews" },
  { name: "Sweden", flag: "/flags/swedish.png", link: "/national#SwedishNews" },
];

export default function DropDownCountryList() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="mr-2">
          <ChevronDown className="h-6 w-6" />
          <Globe />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 max-h-[400px] overflow-y-auto"
      >
        {euCountries.map((country, index) => (
          <div key={country.name}>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={country.link}>
                <div className="flex items-center gap-2 pl-3">
                  <Image
                    src={country.flag}
                    alt={`${country.name} flag`}
                    width={26}
                    height={18}
                    className="rounded-sm"
                  />
                  <span className="font-semibold">{country.name}</span>
                </div>
              </Link>
            </DropdownMenuItem>
            {index < euCountries.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
