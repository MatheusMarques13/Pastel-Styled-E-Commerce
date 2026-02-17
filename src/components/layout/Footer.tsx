import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌸</span>
              <span className="text-xl font-bold text-text-primary">
                Petal<span className="text-primary">Shop</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm">
              Curated pastel lifestyle products for the modern aesthetic.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-text-secondary hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/#new" className="text-sm text-text-secondary hover:text-primary">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-sm text-text-secondary hover:text-primary">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Support</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-text-secondary">Contact Us</span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">Shipping Info</span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">Returns</span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">FAQ</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-text-secondary">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">Terms of Service</span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">Cookie Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-sm text-text-muted">
            © 2026 PetalShop. Made with 💜 and pastels.
          </p>
        </div>
      </div>
    </footer>
  );
}
