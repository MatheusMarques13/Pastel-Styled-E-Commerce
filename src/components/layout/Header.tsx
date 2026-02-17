"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { ShoppingBagIcon, UserIcon, SearchIcon, MenuIcon, XIcon, RocketIcon } from "@/components/ui/Icons";

export function Header() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-pink-500/90 backdrop-blur-md border-b border-pink-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <RocketIcon className="w-8 h-8" />
            <span className="text-xl font-bold text-white">
              Your<span className="text-pink-100">Shop</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-pink-100 hover:text-white font-medium"
            >
              Shop
            </Link>
            <Link
              href="/#categories"
              className="text-pink-100 hover:text-white font-medium"
            >
              Categories
            </Link>
            <Link
              href="/#new"
              className="text-pink-100 hover:text-white font-medium"
            >
              New Arrivals
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-pink-100 hover:text-white rounded-full hover:bg-pink-600">
              <SearchIcon />
            </button>

            {user ? (
              <div className="relative group">
                <button className="p-2 text-pink-100 hover:text-white rounded-full hover:bg-pink-600">
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
                className="p-2 text-pink-100 hover:text-white rounded-full hover:bg-pink-600"
              >
                <UserIcon />
              </Link>
            )}

            <Link
              href="/cart"
              className="relative p-2 text-pink-100 hover:text-white rounded-full hover:bg-pink-600"
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
              className="md:hidden p-2 text-pink-100 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-pink-400">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-pink-100 hover:text-white font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/#categories"
                className="text-pink-100 hover:text-white font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/#new"
                className="text-pink-100 hover:text-white font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              {!user && (
                <Link
                  href="/login"
                  className="text-white hover:text-pink-100 font-medium py-2"
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
