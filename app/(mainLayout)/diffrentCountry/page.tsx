// app/(mainLayout)/diffrentCountry/page.tsx
import { redirect } from "next/navigation";

export default function DefaultCountryPage() {
  // Redirect to Sweden as default
  redirect("/diffrentCountry/Sweden");
}
