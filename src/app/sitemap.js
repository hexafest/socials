const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://socials.hexafalls.org";

// Single-page hub — just the root. Add entries here if more routes appear.
export default function sitemap() {
  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
