import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { formatPrice, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `Shop the official ${product.name} from Poker Night in America.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { images: [{ url: product.image }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <>
      <section className="product-detail section">
        <div className="wrap">
          <Link className="back-link" href="/store">← Back to the store</Link>
          <div className="product-detail__grid">
            <div className="product-detail__image">
              <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 800px) 100vw, 55vw" />
            </div>
            <div className="product-detail__copy">
              <span className="eyebrow">Official PNIA gear</span>
              <h1>{product.name}</h1>
              <p className="product-detail__price">{formatPrice(product)}</p>
              <p className="product-detail__lede">
                Bring Poker Night in America to your everyday rotation. This item is part of the official
                collection carried over from the original PokerNight.com store.
              </p>
              {product.colors.length > 0 && (
                <div className="product-options">
                  <strong>Available colors</strong>
                  <div>{product.colors.map((color) => <span key={color}>{color}</span>)}</div>
                </div>
              )}
              {product.sizes.length > 0 && (
                <div className="product-options">
                  <strong>Available sizes</strong>
                  <div>{product.sizes.map((size) => <span key={size}>{size}</span>)}</div>
                </div>
              )}
              <a
                className="btn btn-red product-detail__cta"
                href={`https://pokernight.com/product/${product.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Choose options on current store ↗
              </a>
              <p className="checkout-note">
                During preview, checkout opens the current PokerNight.com store so payments and orders keep
                using the established secure WooCommerce system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="wrap">
          <div className="section-intro"><div><span className="eyebrow">Keep browsing</span><h2>More from the store</h2></div></div>
          <div className="product-grid product-grid--four">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </div>
      </section>
    </>
  );
}
