export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  colors?: string[];
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const categories = [
  "All",
  "Clothing",
  "Accessories",
  "Home",
  "Beauty",
  "Electronics",
];

export const getProducts = (t: (key: string) => string): Product[] => [
  {
    id: "1",
    name: t("products.items.1.name"),
    price: 68.0,
    description: t("products.items.1.description"),
    image: "🧶",
    category: "Clothing",
    rating: 4.8,
    reviews: 124,
    colors: ["#f8b4c8", "#a8d8ea", "#ffeaa7"],
    badge: "Bestseller",
  },
  {
    id: "2",
    name: t("products.items.2.name"),
    price: 129.0,
    description: t("products.items.2.description"),
    image: "⌚",
    category: "Accessories",
    rating: 4.9,
    reviews: 89,
    colors: ["#f8b4c8", "#d1b3e8"],
    badge: "New",
  },
  {
    id: "3",
    name: t("products.items.3.name"),
    price: 45.0,
    description: t("products.items.3.description"),
    image: "🏺",
    category: "Home",
    rating: 4.7,
    reviews: 56,
    colors: ["#b5ead7", "#ffd5c2", "#a8d8ea"],
  },
  {
    id: "4",
    name: t("products.items.4.name"),
    price: 32.0,
    description: t("products.items.4.description"),
    image: "🧴",
    category: "Beauty",
    rating: 4.6,
    reviews: 203,
    badge: "Popular",
  },
  {
    id: "5",
    name: t("products.items.5.name"),
    price: 89.0,
    description: t("products.items.5.description"),
    image: "🎧",
    category: "Electronics",
    rating: 4.5,
    reviews: 312,
    colors: ["#b5ead7", "#f8b4c8", "#ffeaa7"],
    badge: "Top Rated",
  },
  {
    id: "6",
    name: t("products.items.6.name"),
    price: 55.0,
    description: t("products.items.6.description"),
    image: "🧣",
    category: "Accessories",
    rating: 4.8,
    reviews: 67,
    colors: ["#d1b3e8", "#ffd5c2"],
  },
  {
    id: "7",
    name: t("products.items.7.name"),
    price: 38.0,
    description: t("products.items.7.description"),
    image: "🕯️",
    category: "Home",
    rating: 4.9,
    reviews: 178,
    badge: "Gift Favorite",
  },
  {
    id: "8",
    name: t("products.items.8.name"),
    price: 28.0,
    description: t("products.items.8.description"),
    image: "👜",
    category: "Accessories",
    rating: 4.4,
    reviews: 95,
    colors: ["#fef9ef", "#f8b4c8", "#a8d8ea"],
  },
];
