import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/navbar";
// import { AvailableLanguageTag, languageTag } from "@/paraglide/runtime";
import { Toaster } from "react-hot-toast";
import Footer from "./(Sidebar)/Components/footer";
import { useAuth } from "@/hooks/useAuth";
import { getSession } from "@/data/session";


export const metadata: Metadata = {
  title: "WellCareer",
  description: "Solutions innovantes Adaptees a vos besoins",
  icons: ["/logo_check.svg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const direction: Record<AvailableLanguageTag, "ltr" | "rtl"> = {
  //   en: "ltr",
  //   fr: "ltr",
  // };

  const { isAuthenticated } = useAuth() ;

  return (
    // <html lang={languageTag()} dir={direction[languageTag()]} className="light">
    <html className="light">
      <body className="font-Axiforma">
        <Providers>
         
            <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
