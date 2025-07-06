import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { products, categories, cartItems, type Product, type InsertProduct, type Category, type InsertCategory, type CartItem, type InsertCartItem, type CartItemWithProduct } from "@shared/schema";
import { eq, and } from "drizzle-orm";

let db: ReturnType<typeof drizzle>;

if (process.env.DATABASE_URL) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  db = drizzle(connection);
} else {
  // Fallback to local MySQL connection for development
  console.warn("DATABASE_URL not set, using local MySQL connection");

  const mockConnection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stride_db'
  });

  db = drizzle(mockConnection);
}

export { db, products, categories, cartItems };

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Cart
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
}

export const storage: IStorage = {
  getProducts: async () => {
    try {
      const result = await db.select().from(products);
      return result;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getProduct: async (id: number) => {
    try {
      const result = await db.select().from(products).where(eq(products.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching product:', error);
      return undefined;
    }
  },

  getFeaturedProducts: async () => {
    try {
      const result = await db.select().from(products).where(eq(products.featured, true));
      return result;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  },

  getProductsByCategory: async (category: string) => {
    try {
      const result = await db.select().from(products).where(eq(products.category, category));
      return result;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  createProduct: async (product: InsertProduct) => {
    try {
      const result = await db.insert(products).values(product);
      const newProduct = await db.select().from(products).where(eq(products.id, result[0].insertId));
      return newProduct[0];
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const result = await db.select().from(categories);
      return result;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  getCategory: async (id: number) => {
    try {
      const result = await db.select().from(categories).where(eq(categories.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching category:', error);
      return undefined;
    }
  },

  getCategoryBySlug: async (slug: string) => {
    try {
      const result = await db.select().from(categories).where(eq(categories.slug, slug));
      return result[0];
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      return undefined;
    }
  },

  createCategory: async (category: InsertCategory) => {
    try {
      const result = await db.insert(categories).values(category);
      const newCategory = await db.select().from(categories).where(eq(categories.id, result[0].insertId));
      return newCategory[0];
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  getCartItems: async (sessionId: string) => {
    try {
      const result = await db
        .select({
          id: cartItems.id,
          productId: cartItems.productId,
          size: cartItems.size,
          color: cartItems.color,
          quantity: cartItems.quantity,
          sessionId: cartItems.sessionId,
          product: products
        })
        .from(cartItems)
        .innerJoin(products, eq(cartItems.productId, products.id))
        .where(eq(cartItems.sessionId, sessionId));

      return result;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  },

  addToCart: async (item: InsertCartItem) => {
    try {
      const result = await db.insert(cartItems).values(item);
      const newItem = await db.select().from(cartItems).where(eq(cartItems.id, result[0].insertId));
      return newItem[0];
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  updateCartItem: async (id: number, quantity: number) => {
    try {
      await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, id));
      const result = await db.select().from(cartItems).where(eq(cartItems.id, id));
      return result[0];
    } catch (error) {
      console.error('Error updating cart item:', error);
      return undefined;
    }
  },

  removeFromCart: async (id: number) => {
    try {
      await db.delete(cartItems).where(eq(cartItems.id, id));
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  },

  clearCart: async (sessionId: string) => {
    try {
      await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  }
};