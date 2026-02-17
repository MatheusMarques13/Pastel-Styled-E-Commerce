"use client";

import { useState } from "react";
import { products, categories } from "@/lib/data";
import { ProductCard } from "@/components/sections/ProductCard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchIcon } from "@/components/ui/Icons";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-pastel-purple-light via-pastel-pink-light to-pastel-blue-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block text-sm font-medium text-primary bg-white/60 px-4 py-1.5 rounded-full mb-4">
                ✨ New Spring Collection
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-4 leading-tight">
                Discover Your
                <br />
                <span className="text-primary">Pastel</span> Aesthetic
              </h1>
              <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto">
                Curated lifestyle products in soft, dreamy colors. From fashion to home
                decor, find your perfect pastel match.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 text-4xl opacity-30 animate-bounce">🌸</div>
          <div className="absolute bottom-10 right-10 text-4xl opacity-30 animate-bounce" style={{ animationDelay: "0.5s" }}>🦋</div>
          <div className="absolute top-1/2 right-20 text-3xl opacity-20 animate-bounce" style={{ animationDelay: "1s" }}>✨</div>
        </section>

        {/* Categories */}
        <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-text-secondary border border-border hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section id="new" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>
            <p className="text-sm text-text-muted">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-text-secondary">No products found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Features Banner */}
        <section className="bg-white border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-pastel-pink-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🚚</span>
                </div>
                <h3 className="font-semibold text-text-primary mb-1">Free Shipping</h3>
                <p className="text-sm text-text-secondary">On orders over $50</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-pastel-blue-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">↩️</span>
                </div>
                <h3 className="font-semibold text-text-primary mb-1">Easy Returns</h3>
                <p className="text-sm text-text-secondary">30-day return policy</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-pastel-mint-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🔒</span>
                </div>
                <h3 className="font-semibold text-text-primary mb-1">Secure Payment</h3>
                <p className="text-sm text-text-secondary">SSL encrypted checkout</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-pastel-yellow-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="font-semibold text-text-primary mb-1">24/7 Support</h3>
                <p className="text-sm text-text-secondary">Always here to help</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
