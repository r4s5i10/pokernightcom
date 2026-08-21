import productsData from "@/data/products.json";

export interface Product {
  id: number;
  name: string;
  slug: string;
  minPrice: number;
  maxPrice: number;
  image: string;
  sizes: string[];
  colors: string[];
}

export const products = productsData as Product[];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(product: Product): string {
  const low = `$${product.minPrice.toFixed(2)}`;
  return product.minPrice === product.maxPrice
    ? low
    : `${low} – $${product.maxPrice.toFixed(2)}`;
}
