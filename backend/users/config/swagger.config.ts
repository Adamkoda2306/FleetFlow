import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "FleetFlow - USET API Documentation",
      version: "1.0.0",
      description: "API documentation for FleetFlow USER Backend",
    },

    servers: [
      {
        url: isProduction
          ? process.env.API_BASE_URL || "https://api.fleetflow.com"
          : "http://localhost:3000",

        description: isProduction
          ? "Production"
          : "Local development",
      },
    ],

    tags: [
      {
        name: "Health",
        description: "Health check endpoints",
      },
      {
        name: "Users",
        description: "User management endpoints",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: isProduction
    ? [
        path.join(__dirname, "../routes/**/*.js"),
        path.join(__dirname, "../controllers/**/*.js"),
      ]
    : [
        path.join(__dirname, "../routes/**/*.ts"),
        path.join(__dirname, "../controllers/**/*.ts"),
      ],
};

export const swaggerSpec = swaggerJSDoc(options);