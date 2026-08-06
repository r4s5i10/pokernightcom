import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Official Store",
  description: "Shop official Poker Night in America apparel, hats, drinkware, and table-side gear.",
  alternates: { canonical: "/store" },
};

export default function StorePage() {
  return (
    <>
      <section className="page-hero page-hero--store">
        <div className="wrap page-hero__content">
          <span className="eyebrow eyebrow--light">Official Poker Night in America</span>
          <h1>Wear the game.</h1>
          <p>Table-ready layers, everyday tees, and PNIA gear made for the rail and beyond.</p>
        </div>
      </section>

      <section className="section store-section">
        <div className="wrap">
          <div className="section-intro">
            <div>
              <span className="eyebrow">The collection</span>
              <h2>Official PNIA gear</h2>
            </div>
            <p>{products.length} products migrated from the original PokerNight.com store.</p>
          </div>

          <div className="product-grid">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>

          <div className="store-note">
            <div>
              <span className="eyebrow eyebrow--light">Store preview</span>
              <h2>The new storefront is ready for review.</h2>
            </div>
            <p>
              Checkout remains securely handled by the current WooCommerce store during this preview phase.
              Orders, payments, and customer records are not being moved until the commerce cutover is approved.
            </p>
            <Link className="text-link text-link--light" href="/privacy-policy">Privacy details →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
