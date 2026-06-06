import { Cinzel, MedievalSharp, Inter } from "next/font/google";
import "./globals.css";

const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const wizard = MedievalSharp({
  variable: "--font-wizard",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const SITE_NAME = "HexaFalls Socials";
const SITE_DESCRIPTION =
  "Every owl from the HexaFalls keep — Instagram, Twitter/X, LinkedIn, Discord, YouTube, and registration. Follow the 58-hour wizarding hackathon at JIS University, Kolkata.";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://socials.hexafalls.org";

const OG_IMAGE = "https://hexafalls.org/banners/og-banner.png";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} · Follow the keep`,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "HexaFalls",
    "socials",
    "hackathon",
    "techfest",
    "JIS University",
    "GDG",
    "Kolkata",
  ],
  creator: "GDG on Campus · JIS University",
  publisher: "HexaFalls",
  icons: {
    icon: "https://hexafalls.org/logos/main_logo.png",
    shortcut: "https://hexafalls.org/logos/main_logo.png",
    apple: "https://hexafalls.org/logos/main_logo.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} · Follow the keep`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_IN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · Follow the keep`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
    creator: "@hexafalls",
    site: "@hexafalls",
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${wizard.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-midnight text-silver-hp">
        {/* Page-wide ambient fog. Fixed to the viewport, sits behind everything. */}
        <div aria-hidden="true" className="hp-fog">
          <span className="hp-fog__cloud hp-fog__cloud--a" />
          <span className="hp-fog__cloud hp-fog__cloud--b" />
          <span className="hp-fog__cloud hp-fog__cloud--c" />
          <span className="hp-fog__cloud hp-fog__cloud--d" />
        </div>
        {children}
      </body>
    </html>
  );
}
