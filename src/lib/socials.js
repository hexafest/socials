// Single source of truth for the socials hub. Each entry carries its own
// brand accent (kept close to the HexaFalls palette) + an inline SVG icon.
// `primary: true` renders as the big gold "Register Now" CTA at the top.

export const SOCIALS = [
  {
    id: "register",
    label: "Register Now",
    handle: "hexafalls.org",
    href: "https://hexafalls.org",
    color: "#EF4444",
    glow: "rgba(239,68,68,0.32)",
    primary: true,
    icon: "wand",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@hexafalls_",
    href: "https://instagram.com/hexafalls_",
    color: "#E1306C",
    glow: "rgba(225,48,108,0.30)",
    icon: "instagram",
  },
  {
    id: "twitter",
    label: "Twitter / X",
    handle: "@hexafalls",
    href: "https://twitter.com/hexafalls",
    color: "#66FCF1",
    glow: "rgba(102,252,241,0.30)",
    icon: "twitter",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "/company/hexafalls",
    href: "https://www.linkedin.com/company/hexafalls",
    color: "#0A66C2",
    glow: "rgba(56,135,214,0.34)",
    icon: "linkedin",
  },
  {
    id: "discord",
    label: "Discord",
    handle: "Join the keep",
    href: "https://discord.com/invite/FdgCkrmrG",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.32)",
    icon: "discord",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@hexafalls",
    href: "https://www.youtube.com/@hexafalls",
    color: "#FF4D4D",
    glow: "rgba(255,77,77,0.30)",
    icon: "youtube",
  },
];

export default SOCIALS;
