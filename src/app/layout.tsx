import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const messages = await getMessages();

  return {
    title: "YourShop — Pastel Lifestyle Store",
    description: messages.hero?.description as string || "Curated pastel lifestyle products for the modern aesthetic. Shop clothing, accessories, home decor, and more.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <ThemeProvider>{children}</ThemeProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
