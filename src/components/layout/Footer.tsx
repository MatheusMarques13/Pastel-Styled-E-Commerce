"use client";

import Link from "next/link";
import { RocketIcon } from "@/components/ui/Icons";
import { useTheme } from "@/lib/theme-context";

export function Footer() {
  const { resolvedTheme } = useTheme();

  return (
    <footer 
      className="border-t mt-16"
      style={{ backgroundColor: resolvedTheme.colors.footerBg, borderColor: resolvedTheme.colors.headerBorder }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <RocketIcon className="w-8 h-8" />
              <span className="text-xl font-bold" style={{ color: resolvedTheme.colors.footerText }}>
                Your<span style={{ color: resolvedTheme.colors.headerTextMuted }}>Shop</span>
              </span>
            </Link>
            <p className="text-sm" style={{ color: resolvedTheme.colors.headerTextMuted }}>
              Curated pastel lifestyle products for the modern aesthetic.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-3" style={{ color: resolvedTheme.colors.footerText }}>Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:opacity-80" style={{ color: resolvedTheme.colors.headerTextMuted }}>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/#new" className="text-sm hover:opacity-80" style={{ color: resolvedTheme.colors.headerTextMuted }}>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-sm hover:opacity-80" style={{ color: resolvedTheme.colors.headerTextMuted }}>
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3" style={{ color: resolvedTheme.colors.footerText }}>Support</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm" style={{ color: resolvedTheme.colors.headerTextMuted }}>Contact Us</span>
              </li>
              <li>
                <span className="text-sm" style={{ color: resolvedTheme.colors.headerTextMuted }}>Shipping Info</span>
              </li>
              <li>
                <span className="text-sm" style={{ color: resolvedTheme.colors.headerTextMuted }}>Returns</span>
              </li>
              <li>
                <span className="text-sm" style={{ color: resolvedTheme.colors.headerTextMuted }}>FAQ</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3" style={{ color: resolvedTheme.colors.footerText }}>Legal</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm" style={{ color: resolvedTheme.colors.headerTextMuted }}>Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm" style={{ color: resolvedTheme.colors.headerTextMuted }}>Terms of Service</span>
              </li>
              <li>
                <span className="text-sm" style={{ color: resolvedTheme.colors.headerTextMuted }}>Cookie Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center" style={{ borderColor: resolvedTheme.colors.headerBorder }}>
          <p className="text-sm" style={{ color: resolvedTheme.colors.headerTextMuted }}>
            © 2026 YourShop. Made with 💜 and pastels.
          </p>
        </div>
      </div>
    </footer>
  );
}
