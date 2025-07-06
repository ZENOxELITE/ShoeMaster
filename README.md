
# STRIDE - Athletic Footwear E-commerce Platform

## Overview

STRIDE is a modern e-commerce platform specializing in athletic footwear, built with a full-stack TypeScript architecture. The application features a React frontend with shadcn/ui components, an Express.js backend, and uses Drizzle ORM for database operations.

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
- **Database**: MySQL (with fallback to local connection)
- **Session Management**: Express sessions
- **Development**: Hot reload with Vite middleware integration

## Quick Start

### Prerequisites
- Node.js 18+
- MySQL database (local or remote)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create `.env` file with your database configuration:
   ```
   DATABASE_URL=mysql://username:password@host:port/database
   ```
   
   If no DATABASE_URL is provided, the application will use a local MySQL connection.

3. **Database Setup**:
   ```bash
   npm run db:push
   ```

4. **Seed the Database** (optional):
   ```bash
   npx tsx server/seed-products.ts
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Project Structure

```
STRIDE/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components (shadcn/ui + custom)
│   │   ├── pages/          # Route pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                # Express backend
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database configuration
│   └── seed-products.ts   # Database seeding script
├── shared/                # Shared TypeScript schemas
└── package.json          # Dependencies and scripts
```

## Features

### Core Features
- **Product Catalog**: Browse products by category with detailed product pages
- **Shopping Cart**: Session-based cart with add/remove/update functionality
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Search & Filtering**: Product search and category filtering
- **Featured Products**: Highlighted product promotions
- **Real-time Updates**: Optimistic UI updates with React Query

### User Interface
- **Modern Design**: Clean, athletic-focused aesthetic
- **Component Library**: Consistent design system using shadcn/ui
- **Interactive Elements**: Smooth animations and transitions
- **Accessibility**: Built with Radix UI primitives for accessibility

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID
- `GET /api/categories` - Get all categories
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

## Database Schema

### Products Table
- `id` - Primary key
- `name` - Product name
- `description` - Product description
- `price` - Product price (decimal)
- `image` - Product image URL
- `category` - Product category
- `sizes` - Available sizes (JSON array)
- `colors` - Available colors (JSON array)
- `featured` - Boolean for featured products
- `created_at` - Timestamp

### Categories Table
- `id` - Primary key
- `name` - Category name
- `slug` - URL-friendly identifier

### Cart Items Table
- `id` - Primary key
- `session_id` - Session identifier
- `product_id` - Foreign key to products
- `size` - Selected size
- `color` - Selected color
- `quantity` - Item quantity
- `created_at` - Timestamp

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## Environment Variables

```env
DATABASE_URL=mysql://username:password@host:port/database
```

**Note**: If `DATABASE_URL` is not set, the application will attempt to connect to a local MySQL instance.

## Development

### Running the Application
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm run start
```

### Database Operations
```bash
# Push schema changes
npm run db:push

# Seed sample data
npx tsx server/seed-products.ts
```

## Deployment

The application is configured to run on Replit with automatic port forwarding on port 5000. The Express server serves both the API and the built React application in production.

### Production Build Process
1. **Frontend Build**: Vite compiles React app to static assets
2. **Backend Build**: esbuild bundles Express server for production
3. **Database Setup**: Drizzle migrations applied to MySQL
4. **Static Serving**: Express serves built frontend assets

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Troubleshooting

### Common Issues

**Database Connection Issues**:
- Verify DATABASE_URL format and credentials
- Ensure MySQL server is running
- Check firewall settings for database access

**Build Issues**:
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (18+ required)
- Clear node_modules and reinstall if needed

**Port Issues**:
- The application runs on port 5000 by default
- Ensure port 5000 is not being used by another application

## License

MIT License - Feel free to use this project for learning and development.

## Support

For issues and questions:
- Check the troubleshooting section above
- Review the console logs for error messages
- Ensure all environment variables are properly configured

---

**Deployment**: This project is configured to run on Replit with port 5000 forwarding for web access.
