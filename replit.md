# Overview

This is a modern portfolio website for KodyTechnoLab (branded as "Neural Coder AI"), built as a full-stack web application. The project replicates and enhances a technology company's website with advanced visual design, interactive animations, and modern UI components. The site features sections for services, portfolio, team, testimonials, blog, and contact information, all designed with a dark theme and purple/violet accent colors.

The application uses a monorepo structure with separate client and server directories, sharing common schema definitions. It's designed as a single-page application with smooth scrolling navigation and rich animations throughout.

## Recent Changes (October 8, 2025)
- **Admin CRM System**: Complete admin panel for lead management and analytics
  - Admin authentication system with bcrypt password hashing
  - Leads management with full CRUD operations
  - Lead status tracking (new, contacted, qualified, converted, closed, rejected)
  - Analytics dashboard with interactive charts (recharts)
  - Blog management integrated into admin panel
  - Contact form now automatically saves leads to database
  - Admin routes protected with authentication middleware
  - Access admin panel at `/admin/login`

- **Database Schema Updates**: 
  - Added `leads` table for contact form submissions
  - Added `adminUsers` table for admin authentication
  - Enhanced blog system with categories and media support

- **Replit Environment Setup** (October 2, 2025):
  - Fixed dev script from Windows to Unix-compatible
  - Configured workflow to run on port 5000 with webview output
  - Server properly configured to bind to `0.0.0.0:5000`
  - Application successfully running and serving the frontend

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting dark mode and glassmorphism effects
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Animations**: Framer Motion for complex animations, transitions, and scroll-triggered effects
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Icons**: React Icons library for consistent iconography

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for the API server
- **Development**: tsx for TypeScript execution in development mode
- **Database Integration**: Drizzle ORM configured for PostgreSQL with Neon Database serverless driver
- **Session Management**: Built-in storage interface with in-memory implementation for development
- **Build Process**: esbuild for fast server bundling in production

## Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **ORM**: Drizzle ORM with Zod schema validation for type-safe database operations
- **Migrations**: Drizzle Kit for database schema management and migrations
- **Development Storage**: In-memory storage implementation for development and testing

## Authentication and Authorization
- **User Management**: Basic user schema with username/password fields
- **Admin System**: Separate admin user authentication with role-based access
  - Password hashing with bcrypt
  - Admin-only routes protected by middleware
  - Role support (admin, superadmin)
- **Session Handling**: Express session middleware with PostgreSQL session store (connect-pg-simple)
- **Validation**: Zod schemas for input validation and type safety

## Admin CRM Features
- **Lead Management**: 
  - Automatic lead capture from contact form
  - Full CRUD operations on leads
  - Status tracking and updates
  - Lead assignment capability
  - Notes and follow-up tracking
  
- **Analytics Dashboard**:
  - Visual statistics cards for lead metrics
  - Bar charts for lead distribution by status
  - Pie charts for conversion funnel
  - Real-time lead stats API
  
- **Blog Management**:
  - Create, edit, and delete blog posts
  - Category management with color coding
  - SEO fields (meta title, description, social images)
  - Published/Draft status toggle
  - Featured posts support
  - Tag system for posts
  
- **Access**: Admin panel accessible at `/admin/login`
- **Setup**: Run `npm run setup-admin` to create first admin user

## External Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Components**: Radix UI primitives for accessibility and behavior
- **Animation**: Framer Motion for advanced animations and transitions
- **Development Tools**: Replit-specific plugins for development environment integration
- **Build Tools**: Vite for frontend bundling, esbuild for backend bundling
- **Styling**: PostCSS with Autoprefixer for CSS processing

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns, shared type definitions, and a focus on developer experience with hot reloading and fast builds.