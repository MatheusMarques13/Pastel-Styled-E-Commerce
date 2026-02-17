"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { ShoppingBagIcon, UserIcon, SearchIcon, MenuIcon, XIcon } from "@/components/ui/Icons";

export function Header() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <span className="text-xl font-bold text-text-primary">
              Petal<span className="text-primary">Shop</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-text-secondary hover:text-text-primary font-medium"
            >
              Shop
            </Link>
            <Link
              href="/#categories"
              className="text-text-secondary hover:text-text-primary font-medium"
            >
              Categories
            </Link>
            <Link
              href="/#new"
              className="text-text-secondary hover:text-text-primary font-medium"
            >
              New Arrivals
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-surface-alt">
              <SearchIcon />
            </button>

            {user ? (
              <div className="relative group">
                <button className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-surface-alt">
                  <UserIcon />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
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
                className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-surface-alt"
              >
                <UserIcon />
              </Link>
            )}

            <Link
              href="/cart"
              className="relative p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-surface-alt"
            >
              <ShoppingBagIcon />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-text-secondary hover:text-text-primary font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/#categories"
                className="text-text-secondary hover:text-text-primary font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/#new"
                className="text-text-secondary hover:text-text-primary font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              {!user && (
                <Link
                  href="/login"
                  className="text-primary hover:text-primary-dark font-medium py-2"
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
