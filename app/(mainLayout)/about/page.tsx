import { trackRoute } from "@/app/utils/routeTracker";

export default async function About() {
  await trackRoute("about");
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-foreground text-justify">
      <h1 className="text-3xl font-bold mb-4 text-center">
        About Nord International
      </h1>
      <p className="mb-4 text-lg leading-relaxed">
        <strong>Nord International</strong> is an independent and neutral online news platform that delivers important daily news, analysis, opinions, and fact-based reports to its readers. Our goal is to provide truthful news coverage and contribute to building an informed society.
      </p>

      <p className="mb-4 text-lg leading-relaxed">
        We believe that information is power, and it is our responsibility to bring that power to everyone. We cover various categories with due importance, including politics, economy, science, international affairs, technology, opinions, and entertainment.
      </p>

      <p className="mb-4 text-lg leading-relaxed">
        Nord International has no place for false or deliberately misleading information. Our journalists and reporters place the highest priority on objectivity and neutrality.
      </p>

      <p className="mb-4 text-lg leading-relaxed">
        We welcome readers’ feedback, suggestions, and criticisms. You can also send us a direct message through our{" "}
        <a href="mailto:contact@nordinternational.com" className="text-orange-600 hover:underline">
          contact
        </a>{" "}
        page if you wish.
      </p>

      <p className="text-lg font-medium mt-6 text-center">
        Stay aware, stay informed with Nord International.
      </p>
    </div>
  );
}
