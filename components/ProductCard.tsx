import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link className="product-card" href={`/product/${product.slug}`}>
      <span className="product-card__image">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 25vw"
        />
        <span className="product-card__view">View item</span>
      </span>
      <span className="product-card__body">
        <span className="eyebrow">Official PNIA gear</span>
        <span className="product-card__name">{product.name}</span>
        <span className="product-card__price">{formatPrice(product)}</span>
      </span>
    </Link>
  );
}
