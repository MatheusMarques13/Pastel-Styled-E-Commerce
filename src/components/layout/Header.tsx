"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useTheme } from "@/lib/theme-context";
import { ShoppingBagIcon, UserIcon, SearchIcon, MenuIcon, XIcon, RocketIcon, HeartIcon, ShareIcon } from "@/components/ui/Icons";
import { SettingsDropdown } from "@/components/ui/Settings";

export function Header() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { totalItems: wishlistCount } = useWishlist();
  const { resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerStyle = {
    backgroundColor: resolvedTheme.colors.headerBg,
    borderColor: resolvedTheme.colors.headerBorder,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "YourShop",
          text: "Check out this amazing shop!",
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={headerStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <RocketIcon className="w-8 h-8" />
            <span className="text-xl font-bold" style={{ color: resolvedTheme.colors.headerText }}>
              Your<span style={{ color: resolvedTheme.colors.headerTextMuted }}>Shop</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="font-medium"
              style={{ color: resolvedTheme.colors.headerTextMuted }}
            >
              Shop
            </Link>
            <Link
              href="/#categories"
              className="font-medium"
              style={{ color: resolvedTheme.colors.headerTextMuted }}
            >
              Categories
            </Link>
            <Link
              href="/#new"
              className="font-medium"
              style={{ color: resolvedTheme.colors.headerTextMuted }}
            >
              New Arrivals
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button 
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              style={{ color: resolvedTheme.colors.headerTextMuted }}
              onClick={handleShare}
              aria-label="Share"
            >
              <ShareIcon />
            </button>

            <Link
              href="/wishlist"
              className="relative p-2 rounded-full hover:bg-white/20 transition-colors"
              style={{ color: resolvedTheme.colors.headerTextMuted }}
              aria-label="Wishlist"
            >
              <HeartIcon />
              {wishlistCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                  style={{ backgroundColor: resolvedTheme.colors.secondary }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button 
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              style={{ color: resolvedTheme.colors.headerTextMuted }}
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            <SettingsDropdown />

            {user ? (
              <div className="relative group">
                <button 
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  style={{ color: resolvedTheme.colors.headerTextMuted }}
                >
                  <UserIcon />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <p className="px-4 py-2 text-sm text-text-secondary border-b border-border">
                    Hi, {user.name}! 👋
                  </p>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface-alt hover:text-text-primary"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                style={{ color: resolvedTheme.colors.headerTextMuted }}
              >
                <UserIcon />
              </Link>
            )}

            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-white/20 transition-colors"
              style={{ color: resolvedTheme.colors.headerTextMuted }}
            >
              <ShoppingBagIcon />
              {totalItems > 0 && (
                <span 
                  className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                  style={{ backgroundColor: resolvedTheme.colors.secondary }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full"
              style={{ color: resolvedTheme.colors.headerTextMuted }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t" style={{ borderColor: resolvedTheme.colors.headerBorder }}>
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="font-medium py-2"
                style={{ color: resolvedTheme.colors.headerTextMuted }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/#categories"
                className="font-medium py-2"
                style={{ color: resolvedTheme.colors.headerTextMuted }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/#new"
                className="font-medium py-2"
                style={{ color: resolvedTheme.colors.headerTextMuted }}
                onClick={() => setMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              {!user && (
                <Link
                  href="/login"
                  className="font-medium py-2"
                  style={{ color: resolvedTheme.colors.headerText }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
