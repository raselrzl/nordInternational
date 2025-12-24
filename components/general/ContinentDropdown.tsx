
import ContinentDropdownClient from "./ContinentDropdownClient";
import { getTopCountriesByContinent } from "./TopCountriesByContinent";

export default async function ContinentDropdown() {
  const data = await getTopCountriesByContinent();

  return <ContinentDropdownClient data={data} />;
}
