"use client";

import Link from "next/link";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { StarIcon, ShoppingBagIcon } from "@/components/ui/Icons";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Image area */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 bg-gradient-to-br from-pastel-purple-light to-pastel-pink-light flex items-center justify-center">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
            {product.image}
          </span>
          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <p className="text-xs text-text-muted uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex text-pastel-yellow">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className="w-3.5 h-3.5"
                filled={i < Math.floor(product.rating)}
              />
            ))}
          </div>
          <span className="text-xs text-text-muted">({product.reviews})</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-text-primary">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
            aria-label="Add to cart"
          >
            <ShoppingBagIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
