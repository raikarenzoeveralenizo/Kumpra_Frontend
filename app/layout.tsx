import "./globals.css";
import type { Metadata } from "next";
import CartFlyAnimation from "@/components/ui/CartFlyAnimation";
// 1. Import Playfair_Display instead of Poppins
import { Playfair_Display } from "next/font/google"; 

// 2. Configure the new font
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kompra.ph | Multi-Store Ecommerce",
  description: "Your premium neighborhood marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. Apply the playfair class name here
    <html lang="en" className={playfair.className}>
      <body>
        {children}
        <CartFlyAnimation />
      </body>
    </html>
  );
}