import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InsertCartItem } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function useCart() {
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async (item: Omit<InsertCartItem, "sessionId">) => {
      return apiRequest("POST", "/api/cart", item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const addToCart = (item: Omit<InsertCartItem, "sessionId">) => {
    return addToCartMutation.mutateAsync(item);
  };

  return {
    addToCart,
    isLoading: addToCartMutation.isPending,
  };
}
