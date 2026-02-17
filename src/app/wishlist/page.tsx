"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { useTheme } from "@/lib/theme-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ShoppingBagIcon, TrashIcon } from "@/components/ui/Icons";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const { resolvedTheme } = useTheme();

  const handleAddToCart = (product: typeof items[0]) => {
    addItem(product);
    removeItem(product.id);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">💝</span>
            <h1 className="text-3xl font-bold text-text-primary">My Wishlist</h1>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💝</div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-text-secondary mb-6">
                Save items you love by clicking the heart icon on any product.
              </p>
              <Link href="/">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <>
              <p className="text-text-secondary mb-6">
                {items.length} {items.length === 1 ? "item" : "items"} in your wishlist
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/product/${product.id}`}>
                      <div className="aspect-square flex items-center justify-center text-6xl bg-surface-alt">
                        {product.image}
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-semibold text-text-primary hover:text-primary transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-text-secondary text-sm mb-3">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                            title="Add to Cart"
                          >
                            <ShoppingBagIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="p-2 rounded-full bg-danger/10 text-danger hover:bg-danger hover:text-white transition-colors"
                            title="Remove from Wishlist"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
