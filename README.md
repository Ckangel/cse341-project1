API Documentation: Swagger UI
This project includes full Swagger documentation for all CRUD operations on the Contacts API, making it easy to explore, test, and understand each endpoint.

🔗 Live Docs
Access the Swagger UI at:

Code
(https://cse341-project1-x6z9.onrender.com/)/api-docs

📘 What’s Documented
All endpoints for the contacts resource are fully annotated using swagger-jsdoc and rendered via swagger-ui-express.

Method	Endpoint	Description
GET	/contacts	Retrieve all contacts
GET	/contacts/{id}	Retrieve a contact by ID
POST	/contacts	Create a new contact
PUT	/contacts/{id}	Update an existing contact
DELETE	/contacts/{id}	Delete a contact by ID
Each endpoint includes:

✅ Summary and description

✅ Request parameters and body schema

✅ Response codes and descriptions

✅ Tags for grouping in Swagger UI

🛠️ Technologies Used
Node.js with Express

MongoDB Atlas for database

swagger-jsdoc for annotations

swagger-ui-express for rendering docs

🧩 How It Works
Swagger annotations are embedded directly in routes/index.js using JSDoc-style comments. These are parsed at runtime and served via /api-docs.

Example annotation:

js
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: List of contacts
 */
🚀 Try It Out
Use the Swagger UI to:

Test endpoints interactively

View request/response formats

Explore the API without writing code
