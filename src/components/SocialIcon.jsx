// Inline brand glyphs — single source so cards stay crisp (deliberately NOT
// rough-themed, per the scrapbook rule: small/iconographic chrome stays sharp).
// All paths use currentColor so the parent sets the tint.

const PATHS = {
  wand: (
    <>
      <path d="M4 20 L14 10" />
      <path d="M14.5 9.5 L16 6 L19.5 4.5 L18 8 Z" fill="currentColor" stroke="none" />
      <path d="M17 11 l1.2 .4 M19 13 l1.6 -.2 M16 7 l.5 -1.6 M20.5 9 l1.4 .6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  twitter: (
    <path
      d="M18.2 3H21l-6.6 7.5L22 21h-6.1l-4.3-5.6L6.7 21H4l7-8L3 3h6.2l3.9 5.2L18.2 3Zm-1.1 16h1.6L8 4.6H6.3L17.1 19Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7 M7 7v.01 M11 17v-4a2 2 0 0 1 4 0v4 M11 17v-7" />
    </>
  ),
  discord: (
    <>
      <path d="M8.5 8.2c2.3-.7 4.7-.7 7 0M8 16c2.6 1 5.4 1 8 0" />
      <path d="M8.5 8.2 7 7.2c-1.6.5-2.7 1.6-3 2.6-1 3 -.7 6 0 7.3 1.2 .9 2.4 1.4 3.6 1.7l.9-1.8" />
      <path d="M15.5 8.2 17 7.2c1.6.5 2.7 1.6 3 2.6 1 3 .7 6 0 7.3-1.2.9-2.4 1.4-3.6 1.7l-.9-1.8" />
      <circle cx="9.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.2 L15 12 L10 14.8 Z" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function SocialIcon({ name, className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name] ?? null}
    </svg>
  );
}
