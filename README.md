
# Donation Network Application

A platform for sharing items and fulfilling community needs.

## Prerequisites

- Node.js (v16 or later)
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Create a `.env` file in the root directory based on `.env.example`
4. Run the development server:
```
node scripts/dev.js
```

## Development

- Frontend: React with Vite
- Backend: Express.js with MongoDB
- Authentication: JWT

## Common Issues and Solutions

If you encounter issues with ES modules:
- Make sure all backend files use ES module syntax (import/export) instead of CommonJS (require/module.exports)
- The project is configured with "type": "module" in package.json

If 'vite' is not recognized:
- Run `npm install` to ensure all dependencies are installed
- Use `npx vite` to run the frontend directly

## Available Scripts

- `node scripts/dev.js` - Runs both frontend and backend in development mode
- `npm run build` - Builds the frontend for production
