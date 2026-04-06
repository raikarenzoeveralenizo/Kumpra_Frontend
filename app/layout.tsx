import "./globals.css";
import type { Metadata } from "next";
import CartFlyAnimation from "@/components/ui/CartFlyAnimation";
import { Poppins } from "next/font/google"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"], // SemiBold
});

export const metadata: Metadata = {
  title: "Multi-Store Ecommerce",
  description: "Shopee-like ecommerce starter built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        {children}
        <CartFlyAnimation />
      </body>
    </html>
  );
}