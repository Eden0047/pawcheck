import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";
import PawCursor from "@/components/PawCursor";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PawCheck 🐾 | Pet Health Advisor",
  description: "Trusted health advice for your furry family",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${inter.variable} font-inter bg-cream text-nearblack`}>
        <PawCursor />
        {children}
      </body>
    </html>
  );
}
