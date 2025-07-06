
import { storage } from "./storage.js";

export async function seedProducts() {
  try {
    console.log("Starting to seed products...");

    // Create categories first
    const categories = [
      {
        name: "Running Shoes",
        slug: "running-shoes",
        description: "High-performance running footwear"
      },
      {
        name: "Basketball Shoes", 
        slug: "basketball-shoes",
        description: "Professional basketball sneakers"
      },
      {
        name: "Lifestyle Shoes",
        slug: "lifestyle-shoes", 
        description: "Casual everyday footwear"
      },
      {
        name: "Training Shoes",
        slug: "training-shoes",
        description: "Cross-training and gym shoes"
      }
    ];

    // Insert categories
    for (const category of categories) {
      try {
        await storage.createCategory(category);
        console.log(`Created category: ${category.name}`);
      } catch (error) {
        console.log(`Category ${category.name} may already exist`);
      }
    }

    // Create sample products
    const products = [
      {
        name: "Nike Air Max 270",
        description: "The Nike Air Max 270 delivers unparalleled all-day comfort with the largest Max Air unit yet.",
        price: 150.00,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        category: "running-shoes",
        featured: true,
        stockQuantity: 50,
        sizes: JSON.stringify(["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"]),
        colors: JSON.stringify(["Black/White", "Blue/Red", "Grey/Orange"])
      },
      {
        name: "Adidas Ultraboost 22",
        description: "Experience incredible energy return with Boost midsole technology.",
        price: 180.00,
        imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9c1c7b3a74?w=400",
        category: "running-shoes", 
        featured: true,
        stockQuantity: 35,
        sizes: JSON.stringify(["7", "8", "9", "10", "11", "12"]),
        colors: JSON.stringify(["Core Black", "Cloud White", "Grey Six"])
      },
      {
        name: "Jordan Air Jordan 1 Mid",
        description: "Inspired by the original AJ1, offering iconic Jordan DNA with a fresh twist.",
        price: 110.00,
        imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400",
        category: "basketball-shoes",
        featured: false,
        stockQuantity: 25,
        sizes: JSON.stringify(["8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5"]),
        colors: JSON.stringify(["Bred", "Royal Blue", "Shadow"])
      },
      {
        name: "Converse Chuck Taylor All Star",
        description: "The classic canvas sneaker that started it all.",
        price: 55.00,
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
        category: "lifestyle-shoes",
        featured: false,
        stockQuantity: 60,
        sizes: JSON.stringify(["6", "7", "8", "9", "10", "11", "12"]),
        colors: JSON.stringify(["Black", "White", "Red", "Navy"])
      },
      {
        name: "Nike Air Force 1",
        description: "The radiance lives on with this hoops icon.",
        price: 90.00,
        imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400",
        category: "lifestyle-shoes",
        featured: true,
        stockQuantity: 40,
        sizes: JSON.stringify(["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"]),
        colors: JSON.stringify(["Triple White", "Triple Black", "White/Black"])
      },
      {
        name: "Reebok Nano X3",
        description: "Built for the toughest workouts with superior durability.",
        price: 130.00,
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        category: "training-shoes",
        featured: false,
        stockQuantity: 30,
        sizes: JSON.stringify(["7", "8", "9", "10", "11", "12"]),
        colors: JSON.stringify(["Black/White", "Grey/Blue", "Red/Black"])
      },
      {
        name: "New Balance Fresh Foam X 1080v12",
        description: "The most Fresh Foam X cushioning for incredible comfort.",
        price: 165.00,
        imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
        category: "running-shoes",
        featured: false,
        stockQuantity: 20,
        sizes: JSON.stringify(["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5"]),
        colors: JSON.stringify(["Black", "White/Blue", "Grey/Green"])
      },
      {
        name: "Puma RS-X",
        description: "Bold design meets comfort in this lifestyle runner.",
        price: 100.00,
        imageUrl: "https://images.unsplash.com/photo-1608667508764-695ad5ff81e6?w=400",
        category: "lifestyle-shoes",
        featured: false,
        stockQuantity: 45,
        sizes: JSON.stringify(["7", "8", "9", "10", "11"]),
        colors: JSON.stringify(["White/Multi", "Black/Red", "Blue/Yellow"])
      }
    ];

    // Insert products
    for (const product of products) {
      try {
        await storage.createProduct(product);
        console.log(`Created product: ${product.name}`);
      } catch (error) {
        console.log(`Product ${product.name} may already exist or error occurred:`, error);
      }
    }

    console.log("Finished seeding products!");
    
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}

// Run the seed function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedProducts().then(() => process.exit(0));
}
