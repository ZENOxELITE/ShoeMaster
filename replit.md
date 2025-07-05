# STRIDE - Athletic Footwear E-commerce Platform

## Overview

STRIDE is a modern e-commerce platform specializing in athletic footwear, built with a full-stack TypeScript architecture. The application features a React frontend with shadcn/ui components, an Express.js backend, and uses Drizzle ORM for database operations with PostgreSQL.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite
- **UI Components**: Comprehensive set of Radix UI primitives via shadcn/ui

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM
- **Session Management**: Connect-pg-simple for PostgreSQL sessions
- **Development**: Hot reload with Vite middleware integration

### Database Strategy
- **Primary Database**: PostgreSQL (configured via Drizzle)
- **Development Fallback**: In-memory storage for rapid development
- **Connection**: Neon Database serverless driver

## Key Components

### Product Management
- **Product Schema**: Comprehensive product model with name, description, price, images, categories, sizes, colors, and stock status
- **Category System**: Hierarchical categorization with slugs for SEO-friendly URLs
- **Featured Products**: Special promotion and highlighting system
- **Inventory Tracking**: Size and color variant management

### Shopping Cart System
- **Session-based Cart**: Cart items tied to session IDs for guest users
- **Cart Items**: Detailed tracking of product variants (size, color, quantity)
- **Real-time Updates**: Optimistic updates with React Query

### User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Consistent design system using shadcn/ui
- **Shopping Experience**: Product browsing, filtering, search, and detailed product views
- **Cart Management**: Sidebar cart with quantity updates and item removal

### API Structure
- **RESTful Endpoints**: Standard CRUD operations for products, categories, and cart
- **Error Handling**: Centralized error middleware with proper status codes
- **Request Logging**: Development-friendly request/response logging
- **Data Validation**: Zod schemas for type-safe API contracts

## Data Flow

1. **Product Browsing**: Users can view products by category, search, or browse featured items
2. **Product Selection**: Detailed product pages with size/color selection
3. **Cart Management**: Add to cart with variant selection, update quantities, remove items
4. **Session Persistence**: Cart state maintained across browser sessions
5. **Real-time Updates**: UI updates optimistically with server synchronization

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL connection for production
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets
2. **Backend Build**: esbuild bundles Express server for production
3. **Database Setup**: Drizzle migrations applied to PostgreSQL
4. **Static Serving**: Express serves built frontend assets

### Environment Configuration
- **Development**: Hot reload with Vite middleware
- **Production**: Static file serving with optimized builds
- **Database**: Environment-based connection string configuration

### Deployment Architecture
- **Frontend**: Static assets served by Express
- **Backend**: Node.js Express server
- **Database**: PostgreSQL (Neon Database in production)
- **Sessions**: PostgreSQL-backed session storage

## Changelog
- July 05, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.