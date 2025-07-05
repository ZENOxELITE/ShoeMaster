import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Product } from "@shared/schema";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Heart, Share2, ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products/" + id],
  });

  const handleAddToCart = async () => {
    if (!product || !selectedSize || !selectedColor) {
      toast({
        title: "Please select size and color",
        description: "Choose your preferred size and color before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addToCart({
        productId: product.id,
        size: selectedSize,
        color: selectedColor,
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-2xl"></div>
              <div>
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-6"></div>
                <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
                <div className="space-y-4">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">Product not found</h2>
              <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
              <Button onClick={() => setLocation("/products")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/products")}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl card-shadow bg-white">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
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

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <h1 className="text-4xl font-black text-primary mb-2">{product.name}</h1>
              <p className="text-xl text-neutral-600 mb-4">{product.description}</p>
              <div className="text-3xl font-black text-primary">${product.price}</div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-primary mb-2">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      US {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-primary mb-2">Color</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-secondary hover:bg-orange-600 text-white py-6 text-lg font-semibold"
                disabled={!selectedSize || !selectedColor || !product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-semibold text-primary mb-2">Product Details</h3>
                <div className="text-sm text-neutral-600 space-y-1">
                  <p><strong>Brand:</strong> {product.brand}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Available Sizes:</strong> {product.sizes.join(", ")}</p>
                  <p><strong>Available Colors:</strong> {product.colors.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
