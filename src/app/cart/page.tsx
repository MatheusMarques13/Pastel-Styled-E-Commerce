"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import { MinusIcon, PlusIcon, TrashIcon, ArrowLeftIcon, ShoppingBagIcon } from "@/components/ui/Icons";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  const shipping = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-text-primary mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Your cart is empty
              </h2>
              <p className="text-text-secondary mb-6">
                Looks like you haven&apos;t added anything yet.
              </p>
              <Link href="/">
                <Button icon={<ShoppingBagIcon />}>Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-2xl border border-border p-4 flex gap-4"
                  >
                    {/* Product Image */}
                    <Link href={`/product/${item.product.id}`}>
                      <div className="w-24 h-24 bg-gradient-to-br from-pastel-purple-light to-pastel-pink-light rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-4xl">{item.product.image}</span>
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-text-primary hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-text-muted">{item.product.category}</p>
                      <p className="text-lg font-bold text-text-primary mt-1">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-text-muted hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <TrashIcon />
                      </button>
                      <div className="flex items-center gap-2 bg-surface-alt rounded-lg px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-0.5 text-text-secondary hover:text-text-primary"
                        >
                          <MinusIcon className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-0.5 text-text-secondary hover:text-text-primary"
                        >
                          <PlusIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mt-4"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal ({items.length} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-success font-medium">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-semibold text-text-primary text-base">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <p className="text-xs text-text-muted mt-3 bg-pastel-yellow-light p-2 rounded-lg">
                      💡 Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                    </p>
                  )}

                  <Link href="/checkout" className="block mt-6">
                    <Button fullWidth size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
                    <span>🔒</span>
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
