import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Real Spice — Authentic Indian Cuisine",
  description:
    "Order fresh, authentic Indian food online from The Real Spice.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
  lang="en"
  className={`${playfair.variable} ${inter.variable}`}
  data-scroll-behavior="smooth"
>
  <body>{children}</body>
</html>
  );
}