import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";


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
      <body className={inter.className}>
        <Navbar navItems={
          [
            {
              name: "Home",
              link: "/"
            },
            {
              name: "Tutorial",
              link: ""
            },
            {
              name: "My Gallery",
              link: "gallery"
            },
            {
              name: "About Us",
              link: ""
            },
          //   {
          //     name: "Buy Credits",
          //     link: ""
          //   },
          ]
        }/>
        {children}
      </body>
    </html>
  );
}
