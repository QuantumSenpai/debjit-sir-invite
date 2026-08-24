import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { content } from "@/data/content";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: content.appTitle,
  description: content.appDescription,
  authors: [{ name: content.sectionLine }],
  keywords: ["Teacher's Day", "Invitation", content.teacherName, "CSE Section D"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: content.theme.oatMilk,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body
        className="min-h-full w-full flex flex-col items-center justify-center font-sans-body selection:bg-[#B98F62]/20 selection:text-[#4A3F33]"
        style={{
          backgroundColor: content.theme.oatMilk,
          color: content.theme.deepBark,
        }}
      >
        {children}
      </body>
    </html>
  );
}
