import type { Metadata } from "next";
import localFont from "@next/font/local";
import "./globals.css";
import Navbar from "~/components/navbar";
import Providers from "./provider";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Wonderlend",
  description: "AI Service to help startups get funds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${satoshi.variable} font-sans`}>
      <body>
        <div id="modal-root" />
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
