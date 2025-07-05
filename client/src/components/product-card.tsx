import { useLocation } from "wouter";
import { Product } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      await addToCart({
        productId: product.id,
        size: product.sizes[0], // Default to first available size
        color: product.colors[0], // Default to first available color
        quantity: 1,
      });
      
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div 
      className="product-card group cursor-pointer"
      onClick={() => setLocation(`/products/${product.id}`)}
    >
      <div className="relative overflow-hidden rounded-2xl card-shadow bg-white">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="product-image w-full h-full object-cover transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-primary mb-2">{product.name}</h3>
          <p className="text-neutral-600 mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-primary">${product.price}</span>
            <Button 
              onClick={handleAddToCart}
              className="bg-secondary hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Add to Cart
            </Button>
          </div>
        </div>
        {product.badge && (
          <Badge 
            className={`absolute top-4 right-4 ${
              product.badge === "New" ? "bg-success" : 
              product.badge === "Popular" ? "bg-accent" : 
              "bg-secondary"
            } text-white`}
          >
            {product.badge}
          </Badge>
        )}
      </div>
    </div>
  );
}
