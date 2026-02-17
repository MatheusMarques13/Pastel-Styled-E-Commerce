"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import { StarIcon, ArrowLeftIcon, MinusIcon, PlusIcon, ShoppingBagIcon, HeartIcon } from "@/components/ui/Icons";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">😢</p>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Product not found</h1>
            <p className="text-text-secondary mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Button onClick={() => router.push("/")}>Back to Shop</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-pastel-purple-light to-pastel-pink-light rounded-3xl flex items-center justify-center aspect-square">
              <span className="text-[120px] lg:text-[180px]">{product.image}</span>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              {product.badge && (
                <span className="inline-flex self-start bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {product.badge}
                </span>
              )}

              <p className="text-sm text-text-muted uppercase tracking-wide mb-1">
                {product.category}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-pastel-yellow">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-5 h-5"
                      filled={i < Math.floor(product.rating)}
                    />
                  ))}
                </div>
                <span className="text-text-secondary">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-text-secondary leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-text-primary mb-2">Color</p>
                  <div className="flex gap-3">
                    {product.colors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(i)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === i
                            ? "border-text-primary scale-110"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Color option ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="text-3xl font-bold text-text-primary mb-6">
                ${product.price.toFixed(2)}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <p className="text-sm font-medium text-text-primary">Quantity</p>
                <div className="flex items-center gap-3 bg-surface-alt rounded-xl px-3 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-text-secondary hover:text-text-primary"
                  >
                    <MinusIcon />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-text-secondary hover:text-text-primary"
                  >
                    <PlusIcon />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  fullWidth
                  icon={<ShoppingBagIcon className="w-5 h-5" />}
                  onClick={handleAddToCart}
                >
                  {added ? "Added! ✓" : "Add to Cart"}
                </Button>
                <button className="p-4 border-2 border-border rounded-xl text-text-secondary hover:text-secondary hover:border-secondary transition-all">
                  <HeartIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-pastel-mint-light rounded-xl">
                  <p className="text-lg mb-1">🚚</p>
                  <p className="text-xs text-text-secondary">Free Shipping</p>
                </div>
                <div className="text-center p-3 bg-pastel-blue-light rounded-xl">
                  <p className="text-lg mb-1">↩️</p>
                  <p className="text-xs text-text-secondary">Easy Returns</p>
                </div>
                <div className="text-center p-3 bg-pastel-yellow-light rounded-xl">
                  <p className="text-lg mb-1">🔒</p>
                  <p className="text-xs text-text-secondary">Secure Pay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
