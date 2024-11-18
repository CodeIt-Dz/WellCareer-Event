import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
// import { AvailableLanguageTag, languageTag } from "@/paraglide/runtime";
import { useAuth } from "@/hooks/useAuth";


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
    <html className="light">
      <body className="font-Axiforma">
        <Providers>

            <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
