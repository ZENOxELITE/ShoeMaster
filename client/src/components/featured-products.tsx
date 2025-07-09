import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "./product-card";
import mockProducts from "../../../mock-data.json";

export default function FeaturedProducts() {
  const { data: featuredProducts, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  // Use mock data as fallback when API is not available
  const displayProducts = featuredProducts || mockProducts.filter(p => p.featured);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-primary mb-4">Featured Products</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Discover our most popular athletic footwear, designed for peak performance and unmatched style.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl card-shadow animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-gray-500">
            <p>Using demo data - API not available</p>
          </div>
        )}
      </div>
    </section>
  );
}