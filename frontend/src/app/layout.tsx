import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";
import AuthWrapper from "./components/AuthWrapper";

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
  return (
    <html className="light">
      <body className="font-Axiforma">
        <Providers>
          <NextTopLoader color="blue" showSpinner={false} />
          <AuthWrapper>
            {children}
          </AuthWrapper>
        </Providers>
      </body>
    </html>
  );
}