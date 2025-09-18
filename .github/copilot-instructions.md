# Copilot Instructions for AI Coding Agents

## Project Overview
This is a Node.js/Express REST API project with a simple frontend. It uses MongoDB for data storage and follows a modular route/controller structure. The main entry point is `server.js`.

## Architecture & Data Flow
- **Backend**: Express server (`server.js`) initializes MongoDB connection via `data/database.js` and mounts routes from `routes/`.
- **Routes**: Main router (`routes/index.js`) handles `/` and mounts `/users` via `routes/users.js`.
- **Controllers**: User logic is in `routes/controllers/users.js`, which interacts with MongoDB collections.
- **Database**: Connection managed in `data/database.js` using `MONGODB_URL` from `.env`.
- **Frontend**: Static files in `frontend/` (HTML, JS, CSS) for basic UI.

## Key Files & Directories
- `server.js`: App entry, Express setup, DB init, route mounting.
- `data/database.js`: MongoDB connection/init, exposes `getDatabase()`.
- `routes/index.js`: Main router, mounts `/users`.
- `routes/users.js`: User routes, uses controller.
- `routes/controllers/users.js`: User controller logic (getAll, getSingle).
- `frontend/`: Static assets for UI.

## Developer Workflows
- **Start Server**: Run `node server.js` (no build step required).
- **Environment**: Set `MONGODB_URL` in `.env` for DB connection.
- **Testing**: No automated tests; use manual API calls (e.g., Postman) to verify endpoints.
- **Debugging**: Console logs are used for errors and DB status.

## Patterns & Conventions
- **Routing**: All API routes are mounted via `routes/index.js`. Add new resource routes in `routes/` and mount them in `index.js`.
- **Controllers**: Business logic separated in `routes/controllers/`.
- **Database Access**: Always use `getDatabase()` from `data/database.js`.
- **Error Handling**: Basic, via console logs and HTTP status codes.
- **Frontend**: No build tools; static files only.

## Integration Points
- **MongoDB**: Uses `mongodb` and `mongoose` (though only `mongodb` is used in code).
- **Environment Variables**: Managed via `dotenv`.
- **CORS**: Enabled via `cors` package.

## Example: Adding a New Resource
1. Create a new route file in `routes/` (e.g., `products.js`).
2. Create a controller in `routes/controllers/` (e.g., `products.js`).
3. Mount the route in `routes/index.js`.
4. Access DB via `getDatabase()`.

## Notes
- No test framework or build process is present.
- All code is CommonJS modules.
- Update this file if major architectural changes are made.
