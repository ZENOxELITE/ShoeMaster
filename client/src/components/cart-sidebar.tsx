import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItemWithProduct } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { X, Plus, Minus, Trash2 } from "lucide-react";

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: cartItems = [] } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      return apiRequest("PUT", `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update item quantity.",
        variant: "destructive",
      });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("DELETE", "/api/cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear cart.",
        variant: "destructive",
      });
    },
  });

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    updateQuantityMutation.mutate({ id, quantity });
  };

  const removeItem = (id: number) => {
    removeItemMutation.mutate(id);
  };

  const clearCart = () => {
    clearCartMutation.mutate();
  };

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-96 p-0">
        <SheetHeader className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold text-primary">Shopping Cart</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        {cartItems.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Button onClick={() => onOpenChange(false)} className="bg-secondary hover:bg-orange-600">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 max-h-[calc(100vh-200px)]">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">Size: {item.size} | {item.color}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-secondary">${item.product.price}</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={updateQuantityMutation.isPending}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={updateQuantityMutation.isPending}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                            disabled={removeItemMutation.isPending}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cart Footer */}
            <div className="p-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-primary">Total:</span>
                <span className="text-2xl font-bold text-secondary">${total.toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full bg-secondary hover:bg-orange-600 text-white py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 mb-3"
                onClick={() => {
                  toast({
                    title: "Checkout",
                    description: "Checkout functionality would be implemented here.",
                  });
                }}
              >
                Checkout
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  className="flex-1 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white py-4 rounded-full font-semibold text-lg transition-all duration-300"
                  onClick={() => onOpenChange(false)}
                >
                  Continue Shopping
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={clearCart}
                  disabled={clearCartMutation.isPending}
                  className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
