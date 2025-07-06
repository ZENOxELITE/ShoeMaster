
# STRIDE - Athletic Footwear E-commerce Platform

## Overview

STRIDE is a modern e-commerce platform specializing in athletic footwear, built with a full-stack TypeScript architecture. The application features a React frontend with shadcn/ui components, an Express.js backend, and uses Drizzle ORM for database operations with MySQL.

## Technology Stack

### Frontend
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite
- **UI Components**: Comprehensive set of Radix UI primitives via shadcn/ui

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM
- **Database**: MySQL (stride_db)
- **Session Management**: Express sessions with in-memory storage
- **Development**: Hot reload with Vite middleware integration

## Quick Start

### Prerequisites
- Node.js 18+
- MySQL database (XAMPP or local MySQL server)
- Visual Studio Code (recommended)

### Windows Development Setup

1. **Install XAMPP**:
   - Download and install XAMPP for Windows
   - Start Apache and MySQL services in XAMPP Control Panel

2. **Create Database**:
   ```sql
   CREATE DATABASE stride_db;
   ```

3. **Clone and Setup**:
   ```bash
   git clone <repository-url>
   cd ShoeMaster
   npm install
   ```

4. **Environment Configuration**:
   Create `.env` file with:
   ```env
   DATABASE_URL=mysql://root:@localhost:3306/stride_db
   ```

5. **Database Setup**:
   ```bash
   # Push database schema
   npm run db:push
   
   # Seed sample products (optional)
   npx tsx server/seed-products.ts
   ```

6. **Start Development Server**:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages/routes
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions and configurations
├── server/                 # Express.js backend
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database operations
│   └── seed-products.ts   # Database seeding script
├── shared/                # Shared TypeScript types and schemas
└── README.md
```

## Key Features

### E-commerce Functionality
- **Product Catalog**: Browse athletic footwear by categories
- **Product Details**: Detailed product pages with size/color selection
- **Shopping Cart**: Add to cart with variant selection and quantity management
- **Search**: Product search functionality
- **Categories**: Organized product categories (Running, Basketball, Lifestyle, Training)

### Technical Features
- **Full-Stack TypeScript**: End-to-end type safety
- **Responsive Design**: Mobile-first responsive UI
- **Real-time Updates**: Optimistic UI updates with server synchronization
- **Session Management**: Cart persistence across browser sessions
- **Database Integration**: MySQL with Drizzle ORM

## Database Schema

### Products Table
- `id` (Primary Key)
- `name` (Product name)
- `description` (Product description)
- `price` (Decimal price)
- `category` (Product category)
- `image_url` (Product image URL)
- `featured` (Boolean for featured products)
- `stock_quantity` (Available stock)
- `sizes` (Available sizes as JSON)
- `colors` (Available colors as JSON)

### Categories Table
- `id` (Primary Key)
- `name` (Category name)
- `slug` (URL-friendly category identifier)
- `description` (Category description)

### Cart Items Table
- `id` (Primary Key)
- `session_id` (Session identifier)
- `product_id` (Foreign key to products)
- `quantity` (Item quantity)
- `size` (Selected size)
- `color` (Selected color)

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Apply database schema changes

## Development Workflow

1. **Frontend Development**: 
   - Edit React components in `client/src/`
   - Changes are hot-reloaded automatically
   - UI components use shadcn/ui design system

2. **Backend Development**:
   - Edit Express routes in `server/`
   - Database operations in `server/storage.ts`
   - API endpoints automatically restart on changes

3. **Database Changes**:
   - Modify schema in `shared/schema.ts`
   - Run `npm run db:push` to apply changes
   - Use `server/seed-products.ts` for sample data

## Deployment (Replit)

The application is configured for deployment on Replit with the following setup:

- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port**: Application runs on port 5000
- **Database**: Can be configured for Replit's PostgreSQL or external MySQL

### Production Build Process
1. **Frontend Build**: Vite compiles React app to static assets
2. **Backend Build**: esbuild bundles Express server for production
3. **Database Setup**: Drizzle migrations applied to MySQL
4. **Static Serving**: Express serves built frontend assets

## Troubleshooting

### Common Issues

**Database Connection Issues**:
- Ensure XAMPP MySQL service is running
- Verify DATABASE_URL format: `mysql://root:@localhost:3306/stride_db`
- Check that `stride_db` database exists in MySQL

**Build Issues**:
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (18+ required)
- Clear node_modules and reinstall if needed

**Port Issues on Windows**:
- The application runs on port 5000 by default
- If you see `ENOTSUP` errors, the host binding has been configured for Windows compatibility

**Windows-Specific Issues**:
- Use `npx tsx` instead of `tsx` directly for running TypeScript files
- Environment variables are set using cross-env for Windows compatibility

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/categories` - Get all categories
- `GET /api/cart` - Get cart items for session
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

MIT License - Feel free to use this project for learning and development.

## Support

For issues and questions:
- Check the troubleshooting section above
- Review the console logs for error messages
- Ensure XAMPP MySQL service is running
- Verify all environment variables are properly configured
