import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workroo UI components",
  description: "Workroo component library — copy HTML and CSS for admin screens.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
