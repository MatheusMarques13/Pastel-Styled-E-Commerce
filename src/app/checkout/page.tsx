"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { ArrowLeftIcon, CreditCardIcon, LockIcon, CheckIcon } from "@/components/ui/Icons";

type Step = "shipping" | "payment" | "confirmation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId] = useState(
    () => "PSH-" + Date.now().toString(36).toUpperCase().slice(-6)
  );

  // Shipping form
  const [shipping, setShipping] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  // Payment form
  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shippingCost + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep("confirmation");
    clearCart();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  if (items.length === 0 && step !== "confirmation") {
    router.push("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span className="text-xl font-bold text-text-primary">
                Your<span className="text-primary">Shop</span>
              </span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <LockIcon className="w-4 h-4" />
              Secure Checkout
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {(["shipping", "payment", "confirmation"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === s
                    ? "bg-primary text-white"
                    : (["shipping", "payment", "confirmation"].indexOf(step) > i)
                    ? "bg-success text-white"
                    : "bg-surface-alt text-text-muted"
                }`}
              >
                {["shipping", "payment", "confirmation"].indexOf(step) > i ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-sm font-medium capitalize hidden sm:block ${
                  step === s ? "text-text-primary" : "text-text-muted"
                }`}
              >
                {s}
              </span>
              {i < 2 && (
                <div className="w-12 h-0.5 bg-surface-alt mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Confirmation */}
        {step === "confirmation" && (
          <div className="max-w-lg mx-auto text-center">
            <Card className="p-10">
              <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckIcon className="w-10 h-10 text-success" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Order Confirmed! 🎉
              </h1>
              <p className="text-text-secondary mb-2">
                Thank you for your purchase!
              </p>
              <p className="text-sm text-text-muted mb-8">
                Order #{orderId}
                <br />
                A confirmation email has been sent to {shipping.email || "your email"}.
              </p>
              <Link href="/">
                <Button>Continue Shopping</Button>
              </Link>
            </Card>
          </div>
        )}

        {step !== "confirmation" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              {step === "shipping" && (
                <Card>
                  <h2 className="text-xl font-semibold text-text-primary mb-6">
                    Shipping Information
                  </h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        placeholder="Jane"
                        value={shipping.firstName}
                        onChange={(e) =>
                          setShipping({ ...shipping, firstName: e.target.value })
                        }
                        required
                      />
                      <Input
                        label="Last Name"
                        placeholder="Doe"
                        value={shipping.lastName}
                        onChange={(e) =>
                          setShipping({ ...shipping, lastName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Input
                      label="Email"
                      type="email"
                      placeholder="jane@example.com"
                      value={shipping.email}
                      onChange={(e) =>
                        setShipping({ ...shipping, email: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Address"
                      placeholder="123 Pastel Lane"
                      value={shipping.address}
                      onChange={(e) =>
                        setShipping({ ...shipping, address: e.target.value })
                      }
                      required
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <Input
                        label="City"
                        placeholder="Dreamville"
                        value={shipping.city}
                        onChange={(e) =>
                          setShipping({ ...shipping, city: e.target.value })
                        }
                        required
                      />
                      <Input
                        label="State"
                        placeholder="CA"
                        value={shipping.state}
                        onChange={(e) =>
                          setShipping({ ...shipping, state: e.target.value })
                        }
                        required
                      />
                      <Input
                        label="ZIP Code"
                        placeholder="90210"
                        value={shipping.zip}
                        onChange={(e) =>
                          setShipping({ ...shipping, zip: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="flex justify-between pt-4">
                      <Link href="/cart">
                        <Button variant="ghost" icon={<ArrowLeftIcon className="w-4 h-4" />}>
                          Back to Cart
                        </Button>
                      </Link>
                      <Button type="submit">Continue to Payment</Button>
                    </div>
                  </form>
                </Card>
              )}

              {step === "payment" && (
                <Card>
                  <h2 className="text-xl font-semibold text-text-primary mb-6">
                    Payment Details
                  </h2>

                  {/* Payment Methods */}
                  <div className="flex gap-3 mb-6">
                    <div className="flex-1 border-2 border-primary bg-primary/5 rounded-xl p-3 text-center cursor-pointer">
                      <CreditCardIcon className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="text-xs font-medium text-primary">Credit Card</p>
                    </div>
                    <div className="flex-1 border border-border rounded-xl p-3 text-center cursor-pointer hover:border-primary/50 transition-colors">
                      <p className="text-xl mb-0.5">🍎</p>
                      <p className="text-xs font-medium text-text-secondary">Apple Pay</p>
                    </div>
                    <div className="flex-1 border border-border rounded-xl p-3 text-center cursor-pointer hover:border-primary/50 transition-colors">
                      <p className="text-xl mb-0.5">G</p>
                      <p className="text-xs font-medium text-text-secondary">Google Pay</p>
                    </div>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <Input
                      label="Card Number"
                      placeholder="4242 4242 4242 4242"
                      value={payment.cardNumber}
                      onChange={(e) =>
                        setPayment({
                          ...payment,
                          cardNumber: formatCardNumber(e.target.value),
                        })
                      }
                      maxLength={19}
                      icon={<CreditCardIcon className="w-4 h-4" />}
                      required
                    />
                    <Input
                      label="Cardholder Name"
                      placeholder="Jane Doe"
                      value={payment.cardName}
                      onChange={(e) =>
                        setPayment({ ...payment, cardName: e.target.value })
                      }
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        placeholder="MM/YY"
                        value={payment.expiry}
                        onChange={(e) =>
                          setPayment({
                            ...payment,
                            expiry: formatExpiry(e.target.value),
                          })
                        }
                        maxLength={5}
                        required
                      />
                      <Input
                        label="CVV"
                        placeholder="123"
                        type="password"
                        value={payment.cvv}
                        onChange={(e) =>
                          setPayment({ ...payment, cvv: e.target.value })
                        }
                        maxLength={4}
                        icon={<LockIcon className="w-4 h-4" />}
                        required
                      />
                    </div>

                    <div className="bg-pastel-mint-light rounded-xl p-3 flex items-center gap-2 text-sm text-text-secondary">
                      <LockIcon className="w-4 h-4 text-success flex-shrink-0" />
                      Your payment information is encrypted and secure. We never store your card details.
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="ghost"
                        icon={<ArrowLeftIcon className="w-4 h-4" />}
                        onClick={() => setStep("shipping")}
                      >
                        Back
                      </Button>
                      <Button type="submit" disabled={isProcessing}>
                        {isProcessing ? (
                          <>Processing...</>
                        ) : (
                          <>Pay ${total.toFixed(2)}</>
                        )}
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h3 className="font-semibold text-text-primary mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-pastel-purple-light to-pastel-pink-light rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">{item.product.image}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-text-muted">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-text-primary">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-semibold text-text-primary">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
