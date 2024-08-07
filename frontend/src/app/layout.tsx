import type { Metadata } from "next";
import { Germania_One, Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import React from "react";

const germania = Germania_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-germania",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "asocial",
  description: "A social app for asozial devs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${germania.variable} font-serif ${sourceCodePro.variable} font-sans`}
    >
      <body>{children}</body>
    </html>
  );
}
