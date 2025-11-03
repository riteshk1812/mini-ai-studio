import swaggerJDOC from 'swagger-jsdoc';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Studio Api',
      version: '1.0.0',
      description: 'API documentation for AI Studio services',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local dev server',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.ts')],
};

const swaggerSpec = swaggerJDOC(options);

export default swaggerSpec;
