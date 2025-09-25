export default function ThankYouPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center text-foreground">
      <h1 className="text-4xl font-bold mb-6">Thank You!</h1>

      <p className="text-lg mb-4">
        Thank you sincerely for expressing interest in advertising.
      </p>

      <p className="text-lg mb-4">
        Our team will contact you very soon. We are verifying the information you provided and may reach out for additional details if needed.
      </p>

      <p className="text-lg mb-4">
        We are always committed to providing professional and effective advertising services. We appreciate the interest you have shown.
      </p>

      <p className="text-lg mb-8">
        Thank you again for sending your message. We hope to do great work together.
      </p>

      <a
        href="/"
        className="inline-block px-6 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
      >
        Return to Homepage
      </a>
    </div>
  );
}
