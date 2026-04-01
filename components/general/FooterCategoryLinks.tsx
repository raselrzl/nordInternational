import Link from "next/link";

const sections = [
  {
    title: "Top News",
    items: [
      { label: "Latest Headlines", slug: "latest" },
      { label: "Politics & Power", slug: "politics" },
      { label: "Crime & Public Safety", slug: "crime" },
      { label: "Crisis & Emergencies", slug: "crisis" },
    ],
  },
  {
    title: "World & Society",
    items: [
      { label: "Education & Learning", slug: "education" },
      { label: "Health & Wellness", slug: "health" },
      { label: "Human Rights", slug: "human-rights" },
      { label: "Culture & Society", slug: "culture" },
      { label: "Travel & Exploration", slug: "travel" },
    ],
  },
  {
    title: "Business & Economy",
    items: [
      { label: "Economy & Markets", slug: "economy" },
      { label: "Business & Industry", slug: "business" },
      { label: "Finance & Investment", slug: "finance" },
      { label: "Technology & Innovation", slug: "technology" },
      { label: "AI & Future Tech", slug: "ai-and-future-tech" },
    ],
  },
  {
    title: "Arts & Lifestyle",
    items: [
      { label: "Entertainment & Culture", slug: "entertainment" },
      { label: "Books & Arts", slug: "books-and-arts" },
      { label: "Sports & Athletics", slug: "sports" },
    ],
  },
  {
    title: "Opinion & Features",
    items: [
      { label: "Opinions & Analysis", slug: "opinion" },
      { label: "Editorial & Opinion", slug: "editorial" },
      { label: "In-Depth Analysis", slug: "analysis" },
      { label: "Feature Stories", slug: "story" },
      { label: "Exclusive Interviews", slug: "interview" },
      { label: "Investigative Reports", slug: "investigation" },
    ],
  },
  {
    title: "Law & Environment",
    items: [
      { label: "Law & Justice", slug: "law-and-justice" },
      { label: "Environment & Climate", slug: "environment" },
    ],
  },
];

export default function FooterCategoryLinks() {
  return (
    <footer className="mt-20 border-y border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-800 dark:text-gray-300">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-2 py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">

        {sections.map((section) => (
          <div key={section.title}>
            
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-800 dark:text-gray-200 mb-4">
              {section.title}
            </h3>

            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}`}
                    className="text-sm hover:underline hover:text-black dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        ))}

      </div>
    </footer>
  );
}