# Overview

This is a modern portfolio website for KodyTechnoLab, built as a full-stack web application. The project replicates and enhances a technology company's website with advanced visual design, interactive animations, and modern UI components. The site features sections for services, portfolio, team, testimonials, and contact information, all designed with a dark theme and purple/violet accent colors.

The application uses a monorepo structure with separate client and server directories, sharing common schema definitions. It's designed as a single-page application with smooth scrolling navigation and rich animations throughout.

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
- **Session Handling**: Express session middleware with PostgreSQL session store (connect-pg-simple)
- **Validation**: Zod schemas for input validation and type safety

## External Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Components**: Radix UI primitives for accessibility and behavior
- **Animation**: Framer Motion for advanced animations and transitions
- **Development Tools**: Replit-specific plugins for development environment integration
- **Build Tools**: Vite for frontend bundling, esbuild for backend bundling
- **Styling**: PostCSS with Autoprefixer for CSS processing

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns, shared type definitions, and a focus on developer experience with hot reloading and fast builds.