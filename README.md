
# STRIDE - Athletic Footwear E-commerce Platform

## Overview

STRIDE is a modern e-commerce platform specializing in athletic footwear. The project includes both a full-stack TypeScript application and a PHP implementation for flexibility in deployment.

## Project Versions

### 1. Node.js/TypeScript Version (Original)
- **Frontend**: React with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build Tool**: Vite

### 2. PHP Version (Alternative)
- **Frontend**: HTML with Bootstrap styling
- **Backend**: PHP with MySQL
- **Database**: MySQL (XAMPP compatible)

## Quick Start

### Option A: PHP Version (Recommended for XAMPP users)

1. **Prerequisites**:
   - XAMPP with MySQL running
   - PHP 7.4 or higher

2. **Setup**:
   - Create a MySQL database named `stride_db`
   - Update database credentials in `database_config.php`
   - Click the Run button in Replit

3. **Access**: Visit the preview URL to see your website

### Option B: Node.js Version

1. **Prerequisites**:
   - Node.js 18+
   - PostgreSQL database

2. **Installation**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create `.env` file:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

4. **Database Setup**:
   ```bash
   npm run db:push
   ```

5. **Development**:
   ```bash
   npm run dev
   ```

## File Structure

```
STRIDE/
├── client/                 # React frontend (Node.js version)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   └── lib/           # Utilities
├── server/                # Express backend (Node.js version)
├── shared/                # Shared TypeScript schemas
├── *.php                  # PHP implementation files
├── database_config.php    # PHP database configuration
└── package.json          # Node.js dependencies
```

## Features

### Core Features
- Product catalog with categories
- Shopping cart functionality
- Responsive design
- Search and filtering
- Featured products section

### PHP Implementation Features
- Database connection testing
- REST API endpoints (`api.php`)
- Session-based cart management
- Bootstrap UI styling

### Node.js Implementation Features
- Real-time updates with React Query
- Type-safe development with TypeScript
- Component library with shadcn/ui
- Hot reload development

## API Endpoints (PHP Version)

- `GET /api.php?action=products` - Get all products
- `GET /api.php?action=categories` - Get categories
- `POST /api.php?action=add_to_cart` - Add item to cart
- `GET /api.php?action=get_cart` - Get cart items

## Database Schema

### Products Table
- `id` - Primary key
- `name` - Product name
- `description` - Product description
- `price` - Product price
- `image` - Product image URL
- `category` - Product category
- `sizes` - Available sizes (JSON)
- `colors` - Available colors (JSON)
- `featured` - Boolean for featured products

### Categories Table
- `id` - Primary key
- `name` - Category name
- `slug` - URL-friendly name

## Development

### Running PHP Version
```bash
php -S 0.0.0.0:5000
```

### Running Node.js Version
```bash
npm run dev
```

### Building for Production (Node.js)
```bash
npm run build
npm run start
```

## Environment Variables

### Node.js Version
```
DATABASE_URL=your_postgresql_connection_string
```

### PHP Version
Configure in `database_config.php`:
- Database host
- Database name
- Username
- Password

## Troubleshooting

### PHP Issues
- Ensure XAMPP MySQL is running
- Check database credentials in `database_config.php`
- Verify PHP version compatibility

### Node.js Issues
- Check Node.js version (18+ required)
- Verify database connection string
- Run `npm install` to ensure dependencies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - Feel free to use this project for learning and development.

## Support

For issues and questions:
- Check the troubleshooting section
- Review the code comments
- Test database connections using the built-in tools

---

**Note**: This project is configured to run on Replit with automatic port forwarding on port 5000.
