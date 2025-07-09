import { Product } from "@shared/schema";
import ProductCard from "./product-card";
import { mockProducts } from "@/lib/mock-data";

export default function FeaturedProducts() {
  // Use only mock data - no API calls
  const displayProducts = mockProducts.filter(p => p.featured);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-primary mb-4">Featured Products</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Discover our most popular athletic footwear, designed for peak performance and unmatched style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}