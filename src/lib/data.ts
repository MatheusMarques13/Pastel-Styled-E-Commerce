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

export const products: Product[] = [
  {
    id: "1",
    name: "Cozy Knit Sweater",
    price: 68.0,
    description:
      "A beautifully soft knit sweater in pastel tones. Perfect for layering or wearing on its own during cooler days. Made from premium organic cotton blend.",
    image: "🧶",
    category: "Clothing",
    rating: 4.8,
    reviews: 124,
    colors: ["#f8b4c8", "#a8d8ea", "#ffeaa7"],
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Minimalist Watch",
    price: 129.0,
    description:
      "Elegant minimalist watch with a pastel pink leather strap and rose gold accents. Water-resistant and perfect for everyday wear.",
    image: "⌚",
    category: "Accessories",
    rating: 4.9,
    reviews: 89,
    colors: ["#f8b4c8", "#d1b3e8"],
    badge: "New",
  },
  {
    id: "3",
    name: "Ceramic Vase Set",
    price: 45.0,
    description:
      "Set of 3 handcrafted ceramic vases in complementary pastel shades. Each piece is unique and adds a touch of elegance to any room.",
    image: "🏺",
    category: "Home",
    rating: 4.7,
    reviews: 56,
    colors: ["#b5ead7", "#ffd5c2", "#a8d8ea"],
  },
  {
    id: "4",
    name: "Lavender Body Lotion",
    price: 32.0,
    description:
      "Luxurious body lotion infused with real lavender extract. Deeply moisturizing formula that leaves skin silky smooth and delicately scented.",
    image: "🧴",
    category: "Beauty",
    rating: 4.6,
    reviews: 203,
    badge: "Popular",
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    price: 89.0,
    description:
      "Premium wireless earbuds in a pastel mint case. Crystal-clear sound, active noise cancellation, and 24-hour battery life.",
    image: "🎧",
    category: "Electronics",
    rating: 4.5,
    reviews: 312,
    colors: ["#b5ead7", "#f8b4c8", "#ffeaa7"],
    badge: "Top Rated",
  },
  {
    id: "6",
    name: "Silk Scarf",
    price: 55.0,
    description:
      "Luxurious 100% silk scarf with a dreamy watercolor print. Versatile accessory that can be worn as a headband, neck scarf, or bag accent.",
    image: "🧣",
    category: "Accessories",
    rating: 4.8,
    reviews: 67,
    colors: ["#d1b3e8", "#ffd5c2"],
  },
  {
    id: "7",
    name: "Scented Candle Trio",
    price: 38.0,
    description:
      "Three hand-poured soy candles in vanilla, rose, and jasmine. Each candle burns for 40+ hours and comes in a beautiful pastel glass jar.",
    image: "🕯️",
    category: "Home",
    rating: 4.9,
    reviews: 178,
    badge: "Gift Favorite",
  },
  {
    id: "8",
    name: "Cotton Tote Bag",
    price: 28.0,
    description:
      "Sturdy organic cotton tote bag with a cute embroidered design. Spacious enough for groceries, books, or everyday essentials.",
    image: "👜",
    category: "Accessories",
    rating: 4.4,
    reviews: 95,
    colors: ["#fef9ef", "#f8b4c8", "#a8d8ea"],
  },
];
