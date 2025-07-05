import { products, categories, cartItems, type Product, type InsertProduct, type Category, type InsertCategory, type CartItem, type InsertCartItem, type CartItemWithProduct } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private cartItems: Map<number, CartItem>;
  private currentProductId: number;
  private currentCategoryId: number;
  private currentCartItemId: number;

  constructor() {
    this.products = new Map();
    this.categories = new Map();
    this.cartItems = new Map();
    this.currentProductId = 1;
    this.currentCategoryId = 1;
    this.currentCartItemId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoriesData: InsertCategory[] = [
      {
        name: "Running Shoes",
        description: "Performance-driven footwear for runners",
        imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=450",
        slug: "running"
      },
      {
        name: "Lifestyle Sneakers",
        description: "Casual comfort meets street style",
        imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=450",
        slug: "lifestyle"
      },
      {
        name: "Training Shoes",
        description: "Built for intense workouts and fitness",
        imageUrl: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=450",
        slug: "training"
      }
    ];

    categoriesData.forEach(category => {
      const id = this.currentCategoryId++;
      this.categories.set(id, { ...category, id });
    });

    // Initialize products
    const productsData: InsertProduct[] = [
      {
        name: "Air Max Runner Pro",
        description: "Ultimate comfort meets cutting-edge design",
        price: "159.99",
        imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "running",
        brand: "STRIDE",
        featured: true,
        badge: "New",
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["Black", "White", "Blue"],
        inStock: true
      },
      {
        name: "Court Elite X",
        description: "Dominate the court with superior grip",
        price: "189.99",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "training",
        brand: "STRIDE",
        featured: true,
        badge: "Popular",
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["Black", "Red", "White"],
        inStock: true
      },
      {
        name: "Urban Style Classic",
        description: "Timeless design for everyday wear",
        price: "129.99",
        imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "lifestyle",
        brand: "STRIDE",
        featured: true,
        badge: null,
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["White", "Black", "Gray"],
        inStock: true
      },
      {
        name: "Flex Trainer Pro",
        description: "Maximum flexibility for intense workouts",
        price: "149.99",
        imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "training",
        brand: "STRIDE",
        featured: true,
        badge: null,
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["Black", "Blue", "Orange"],
        inStock: true
      },
      {
        name: "Sprint Elite",
        description: "Built for speed and performance",
        price: "179.99",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "running",
        brand: "STRIDE",
        featured: false,
        badge: null,
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["Blue", "Black", "White"],
        inStock: true
      },
      {
        name: "Street Walker",
        description: "Comfortable walking shoe for daily use",
        price: "99.99",
        imageUrl: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "lifestyle",
        brand: "STRIDE",
        featured: false,
        badge: null,
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["Brown", "Black", "White"],
        inStock: true
      }
    ];

    productsData.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.featured);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(c => c.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    const itemsWithProducts: CartItemWithProduct[] = [];
    
    for (const item of items) {
      const product = this.products.get(item.productId);
      if (product) {
        itemsWithProducts.push({ ...item, product });
      }
    }
    
    return itemsWithProducts;
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item with same product, size, color already exists
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.sessionId === insertItem.sessionId &&
               item.productId === insertItem.productId &&
               item.size === insertItem.size &&
               item.color === insertItem.color
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += insertItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    } else {
      // Create new item
      const id = this.currentCartItemId++;
      const item: CartItem = { ...insertItem, id };
      this.cartItems.set(id, item);
      return item;
    }
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToDelete = Array.from(this.cartItems.values())
      .filter(item => item.sessionId === sessionId)
      .map(item => item.id);
    
    itemsToDelete.forEach(id => this.cartItems.delete(id));
    return true;
  }
}

export const storage = new MemStorage();
