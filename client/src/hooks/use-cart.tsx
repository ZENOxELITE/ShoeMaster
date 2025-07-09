
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '@shared/schema';
import { mockProducts } from '@/lib/mock-data';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'sessionId'>) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = async (item: Omit<CartItem, 'id' | 'sessionId'>) => {
    const existingItem = items.find(
      (cartItem) => 
        cartItem.productId === item.productId && 
        cartItem.size === item.size && 
        cartItem.color === item.color
    );

    if (existingItem) {
      setItems(items.map(cartItem => 
        cartItem.id === existingItem.id 
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      ));
    } else {
      const newItem: CartItem = {
        id: Date.now(), // Simple ID generation
        sessionId: 'local-session',
        productId: item.productId,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      };
      setItems([...items, newItem]);
    }
  };

  const removeFromCart = async (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = async () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const product = mockProducts.find(p => p.id === item.productId);
      return total + (product ? parseFloat(product.price) * item.quantity : 0);
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
