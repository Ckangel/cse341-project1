const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "API documentation for your contacts project",
    },
  },
  apis: ["./routes/*.js"], // Adjust path if needed
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUI, specs };
