// Navbar / footer sitemap entries. This is a standalone site on its own
// subdomain, so every href is an absolute link back to the main hexafalls.org
// app (mirrors the SITEMAP shape used there).
export const MAIN_SITE = "https://hexafalls.org";

export const SITEMAP = [
  {
    href: `${MAIN_SITE}/about`, label: "The Prophecy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M3 5h6a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H3z" />
        <path d="M21 5h-6a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h6z" />
      </svg>
    ),
  },
  {
    href: `${MAIN_SITE}/timeline`, label: "Timeline", soon: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    href: `${MAIN_SITE}/events`, label: "The Events", soon: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M5 4h14a2 2 0 0 1 2 2v3H3V6a2 2 0 0 1 2-2z" />
        <path d="M3 9v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9" />
        <path d="M8 2v4M16 2v4" />
      </svg>
    ),
  },
  {
    href: `${MAIN_SITE}/teams`, label: "The Teams",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.2" />
        <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
        <path d="M15 20c0-2 2-3.5 4-3.5" />
      </svg>
    ),
  },
  {
    href: `${MAIN_SITE}/sponsors`, label: "Sponsors", color: "red",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
      </svg>
    ),
  },
  {
    href: `${MAIN_SITE}/faq`, label: "FAQ",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];
