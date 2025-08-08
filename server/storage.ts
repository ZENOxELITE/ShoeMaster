import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  products,
  categories,
  cartItems,
  type Product,
  type InsertProduct,
  type Category,
  type InsertCategory,
  type CartItem,
  type InsertCartItem,
  type CartItemWithProduct
} from "@shared/schema";
import { eq } from "drizzle-orm";

const client = postgres(process.env.DATABASE_URL!, {
  ssl: 'require', // Required for Render-hosted PostgreSQL
});
const db = drizzle(client);

export { db, products, categories, cartItems };

export interface IStorage {
  // Product methods...
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Category methods...
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Cart methods...
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
}

export const storage: IStorage = {
  getProducts: async () => {
    return await db.select().from(products);
  },

  getProduct: async (id: number) => {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  },

  getFeaturedProducts: async () => {
    return await db.select().from(products).where(eq(products.featured, true));
  },

  getProductsByCategory: async (category: string) => {
    return await db.select().from(products).where(eq(products.category, category));
  },

  createProduct: async (product: InsertProduct) => {
    const inserted = await db.insert(products).values(product).returning();
    return inserted[0]; // PostgreSQL supports returning inserted rows
  },

  getCategories: async () => {
    return await db.select().from(categories);
  },

  getCategory: async (id: number) => {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  },

  getCategoryBySlug: async (slug: string) => {
    const result = await db.select().from(categories).where(eq(categories.slug, slug));
    return result[0];
  },

  createCategory: async (category: InsertCategory) => {
    const inserted = await db.insert(categories).values(category).returning();
    return inserted[0];
  },

  getCartItems: async (sessionId: string) => {
    const result = await db
      .select({
        id: cartItems.id,
        productId: cartItems.productId,
        size: cartItems.size,
        color: cartItems.color,
        quantity: cartItems.quantity,
        sessionId: cartItems.sessionId,
        product: products,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.sessionId, sessionId));

    return result;
  },

  addToCart: async (item: InsertCartItem) => {
    const inserted = await db.insert(cartItems).values(item).returning();
    return inserted[0];
  },

  updateCartItem: async (id: number, quantity: number) => {
    await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, id));
    const updated = await db.select().from(cartItems).where(eq(cartItems.id, id));
    return updated[0];
  },

  removeFromCart: async (id: number) => {
    await db.delete(cartItems).where(eq(cartItems.id, id));
    return true;
  },

  clearCart: async (sessionId: string) => {
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
    return true;
  },
};
