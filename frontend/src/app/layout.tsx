import React from "react";
import type { Metadata } from "next";
import { Germania_One, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar"
import Footer from "@/components/common/Footer";
import Main from "@/components/common/Main";

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
  title: "asozial",
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
      <body className="h-100vh w-100vw flex flex-col justify-between p-6">
        <Navbar />
        <Main />
        <Footer />
        </body>
    </html>
  );
}
