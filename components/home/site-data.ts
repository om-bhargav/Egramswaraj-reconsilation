export const DOWNLOAD_LINK = "#DOWNLOAD_LINK";

export const PHONE = "9569396208";
export const PHONE_HREF = "tel:+919569396208";
export const EMAIL = "ombhargav788@gmail.com";
export const EMAIL_HREF = "mailto:ombhargav788@gmail.com";
export const FEEDBACK_HREF =
  "mailto:ombhargav788@gmail.com?subject=Feedback%20on%20eGramSwaraj%20Automation";

export const NAV_LINKS = [
  { href: "/#overview", label: "Overview" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#features", label: "Features" },
  { href: "/#screens", label: "Screens" },
  { href: "/#trial", label: "Trial" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#screens", label: "Screens" },
  { href: "#faq", label: "FAQ" },
  { href: DOWNLOAD_LINK, label: "Download Trial" },
  { href: "/contact", label: "Contact" },
] as const;
