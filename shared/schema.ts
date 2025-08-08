import { pgTable, text, numeric, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import {
  pgTable,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  json
} from "drizzle-orm/pg-core";


export const products = pgTable("products", {
  id: integer("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  brand: text("brand").notNull(),
  featured: boolean("featured").default(false),
  badge: text("badge"), // "New", "Popular", etc.
  sizes: json("sizes").notNull(), // Available sizes as JSON
  colors: json("colors").notNull(), // Available colors as JSON
  inStock: boolean("in_stock").default(true),
});

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  slug: text("slug").notNull().unique(),
});

export const cartItems = pgTable("cart_items", {
  id: integer("id").primaryKey().autoincrement(),
  productId: integer("product_id").notNull(),
  size: text("size").notNull(),
  color: text("color").notNull(),
  quantity: integer("quantity").notNull().default(1),
  sessionId: text("session_id").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

// Extended cart item with product details
export type CartItemWithProduct = CartItem & {
  product: Product;
};
