import { trackRoute } from "@/app/utils/routeTracker";

export default async function About() {
  await trackRoute("about");

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-200 leading-relaxed bg-[#202020]">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-center uppercase">
        About GlobalEye Press
      </h1>

      <p className="mb-4 text-sm">
        GlobalEye Press is an independent digital media company based in Portugal,
        delivering verified reporting and thoughtful analysis across global and
        regional stories.
      </p>

      <p className="mb-4 text-sm">
        We operate with editorial independence, transparency, and a commitment to
        accuracy. Our newsroom follows clear editorial standards and aligns its
        practices with applicable European regulations.
      </p>

      <p className="mb-6 text-sm">
        GlobalEye Press, a Souveral Network company, serves readers seeking
        clarity over noise in today’s information landscape.
      </p>

    </div>
  );
}
