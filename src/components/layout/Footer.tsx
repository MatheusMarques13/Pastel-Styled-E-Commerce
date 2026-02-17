import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-red-600 border-t border-red-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌸</span>
              <span className="text-xl font-bold text-white">
                Petal<span className="text-red-200">Shop</span>
              </span>
            </Link>
            <p className="text-red-100 text-sm">
              Curated pastel lifestyle products for the modern aesthetic.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-white mb-3">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-red-100 hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/#new" className="text-sm text-red-100 hover:text-white">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-sm text-red-100 hover:text-white">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-3">Support</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-red-100">Contact Us</span>
              </li>
              <li>
                <span className="text-sm text-red-100">Shipping Info</span>
              </li>
              <li>
                <span className="text-sm text-red-100">Returns</span>
              </li>
              <li>
                <span className="text-sm text-red-100">FAQ</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-red-100">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-red-100">Terms of Service</span>
              </li>
              <li>
                <span className="text-sm text-red-100">Cookie Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-red-500 text-center">
          <p className="text-sm text-red-200">
            © 2026 PetalShop. Made with 💜 and pastels.
          </p>
        </div>
      </div>
    </footer>
  );
}
