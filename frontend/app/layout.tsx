import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const bebas_neue = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: "--font-header" })

export const metadata: Metadata = {
  title: "Meap",
  description: "Meap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
