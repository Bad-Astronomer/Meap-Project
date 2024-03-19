import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { NavbarFloating } from "@/app/_components/ui/NavbarFloating";
import { Footer } from "@/app/_components/ui/Footer";
import { Navbar } from "./_components/ui/Navbar";

import { getServerSession } from "next-auth";
import SessionProvider from "@/app/_components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });
const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-header",
});

export const metadata: Metadata = {
  title: "Meap",
  description: "Meap",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          <NavbarFloating
            navItems={[
              {
                name: "Home",
                link: "/home",
              },
              {
                name: "Tutorial",
                link: "/",
              },
              {
                name: "My Gallery",
                link: "gallery",
              },
              {
                name: "About Us",
                link: "about_us",
              },
              //   {
              //     name: "Buy Credits",
              //     link: ""
              //   },
            ]}
          />
          <div className="stars-bg">{children}</div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
