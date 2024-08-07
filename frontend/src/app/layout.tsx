import type { Metadata } from "next";
import { Germania_One, Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import React from "react";
=======
>>>>>>> 429888ca30ce10cf12e81a58a870fd046efdad15

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
<<<<<<< HEAD
    <html lang="en">
      <body
        className={`${germania.variable} font-serif ${sourceCodePro.variable} font-sans`}
      >
        {children}
      </body>
=======
    <html
      lang="en"
      className={`${germania.variable} font-serif ${sourceCodePro.variable} font-sans`}
    >
      <body>{children}</body>
>>>>>>> 429888ca30ce10cf12e81a58a870fd046efdad15
    </html>
  );
}
