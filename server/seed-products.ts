
import { storage } from "./storage";

const sampleCategories = [
  {
    name: "Running Shoes",
    description: "Performance footwear for runners",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    slug: "running-shoes"
  },
  {
    name: "Lifestyle Sneakers", 
    description: "Casual comfort meets street style",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    slug: "lifestyle-sneakers"
  },
  {
    name: "Training Shoes",
    description: "Built for intense workouts and fitness",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    slug: "training-shoes"
  }
];

const sampleProducts = [
  {
    name: "Nike Air Max 270",
    description: "The Nike Air Max 270 delivers visible cushioning under every step.",
    price: "150.00",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    category: "Running Shoes",
    brand: "Nike",
    featured: true,
    badge: "Popular",
    sizes: JSON.stringify(["7", "8", "9", "10", "11", "12"]),
    colors: JSON.stringify(["Black", "White", "Red"]),
    inStock: true
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Our most responsive running shoe, with incredible energy return.",
    price: "180.00",
    imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop",
    category: "Running Shoes", 
    brand: "Adidas",
    featured: true,
    badge: "New",
    sizes: JSON.stringify(["7", "8", "9", "10", "11", "12"]),
    colors: JSON.stringify(["Black", "White", "Gray"]),
    inStock: true
  },
  {
    name: "Jordan 1 Retro High",
    description: "The iconic silhouette that started it all.",
    price: "170.00",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    category: "Lifestyle Sneakers",
    brand: "Nike",
    featured: true,
    badge: null,
    sizes: JSON.stringify(["7", "8", "9", "10", "11", "12"]),
    colors: JSON.stringify(["Black", "White", "Red"]),
    inStock: true
  },
  {
    name: "Converse Chuck Taylor All Star",
    description: "The classic canvas sneaker that never goes out of style.",
    price: "65.00",
    imageUrl: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop",
    category: "Lifestyle Sneakers",
    brand: "Converse",
    featured: false,
    badge: null,
    sizes: JSON.stringify(["7", "8", "9", "10", "11", "12"]),
    colors: JSON.stringify(["Black", "White", "Red", "Blue"]),
    inStock: true
  },
  {
    name: "Nike Metcon 8",
    description: "Built for your toughest workouts, the Metcon 8 is more durable.",
    price: "130.00",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
    category: "Training Shoes",
    brand: "Nike",
    featured: true,
    badge: "Popular",
    sizes: JSON.stringify(["7", "8", "9", "10", "11", "12"]),
    colors: JSON.stringify(["Black", "Gray", "Orange"]),
    inStock: true
  },
  {
    name: "Reebok Nano X2",
    description: "Engineered for the versatility your training demands.",
    price: "120.00",
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop",
    category: "Training Shoes",
    brand: "Reebok",
    featured: false,
    badge: null,
    sizes: JSON.stringify(["7", "8", "9", "10", "11", "12"]),
    colors: JSON.stringify(["Black", "White", "Gray"]),
    inStock: true
  },
  {
    name: "Vans Old Skool",
    description: "The classic skate shoe with iconic side stripe.",
    price: "65.00",
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop",
    category: "Lifestyle Sneakers",
    brand: "Vans",
    featured: false,
    badge: null,
    sizes: JSON.stringify(["7", "8", "9", "10", "11", "12"]),
    colors: JSON.stringify(["Black", "White", "Brown"]),
    inStock: true
  },
  {
    name: "New Balance 990v5",
    description: "Made in USA heritage running shoe with premium materials.",
    price: "185.00",
    imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop",
    category: "Running Shoes",
    brand: "New Balance",
    featured: false,
    badge: "New",
    sizes: JSON.stringify(["7", "8", "9", "10", "11", "12"]),
    colors: JSON.stringify(["Gray", "Black", "White"]),
    inStock: true
  }
];

export async function seedDatabase() {
  try {
    console.log("Starting database seeding...");
    
    // Seed categories first
    console.log("Seeding categories...");
    for (const category of sampleCategories) {
      try {
        await storage.createCategory(category);
        console.log(`Created category: ${category.name}`);
      } catch (error) {
        console.log(`Category ${category.name} might already exist, skipping...`);
      }
    }
    
    // Seed products
    console.log("Seeding products...");
    for (const product of sampleProducts) {
      try {
        await storage.createProduct(product);
        console.log(`Created product: ${product.name}`);
      } catch (error) {
        console.log(`Product ${product.name} might already exist, skipping...`);
      }
    }
    
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => {
    console.log("Seeding finished.");
    process.exit(0);
  });
}
