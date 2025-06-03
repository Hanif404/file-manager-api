# File Manager API

A RESTful API for managing files and folders built with Elysia.js and Bun runtime.

## Project Overview

This API provides endpoints to create, read, update, and delete files and folders in a hierarchical structure. It uses a clean architecture approach with domain-driven design principles.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Elysia.js](https://elysiajs.com/)
- **Database**: MySQL with [Prisma ORM](https://www.prisma.io/)

## Getting Started

### Prerequisites

- Bun runtime
- MySQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up your environment variables in `.env` file:
   ```
   DATABASE_URL="mysql://user:password@localhost:3306/file_manager"
   ```
4. Run database migrations:
   ```bash
   bunx prisma migrate dev
   ```

## Development

To start the development server:
```bash
bun run dev
```

The server will be running at http://localhost:3000/

## API Endpoints

### Folders
- `GET /folders` - List all folders
- `GET /folders/:id` - Get folder details
- `POST /folders` - Create a new folder
- `DELETE /folders/:id` - Delete a folder

### Files
- `GET /files` - List all files
- `POST /files` - Upload a file
- `DELETE /files/:id` - Delete a file

## Project Structure

```
file-manager-api/
├── prisma/              # Database schema and migrations
├── src/
│   ├── config/          # Application configuration
│   ├── domain/          # Business logic and entities
│   ├── interfaces/      # API controllers and routes
│   ├── usecases/        # Application use cases
│   └── utils/           # Utility functions
└── assets/              # Stored files
```

## License

[MIT](LICENSE)
