import "./globals.css";
import type { Metadata } from "next";
import CartFlyAnimation from "@/components/ui/CartFlyAnimation";

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
    <html lang="en">
      <body>
        {children}
        <CartFlyAnimation />
      </body>
    </html>
  );
}