import fs from 'fs';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { Collection, Request, Item } from 'postman-collection';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Studio API',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: [path.join(__dirname, '../routes/*.ts')],
};

const swaggerSpec = swaggerJSDoc(options) as any;

// Convert swagger paths to Postman items

const items: Item[] = [];

if (swaggerSpec.paths) {
  for (const [route, methods] of Object.entries(swaggerSpec.paths)) {
    for (const [method, details] of Object.entries(methods as Record<string, any>)) {
      const req = new Request({
        url: `{{baseUrl}}${route}`,
        method: method.toUpperCase(),
        description: (details as any).summary || '',
        header: [],
      });
      items.push(new Item({ name: `${method.toUpperCase()} ${route}`, request: req }));
    }
  }
} else {
  console.warn('⚠️ No paths found in Swagger spec. Did you document your routes?');
}

const collection = new Collection({
  info: {
    name: 'AI Studio API Collection',
    description: {
      content: 'Generated automatically from Swagger spec',
      type: 'text/plain',
    },
  },
  item: items,
});

// Write to file
fs.writeFileSync(
  'ai_studio_services_v1_postman_collection.json',
  JSON.stringify(collection.toJSON(), null, 2),
);
console.log('✅ Postman collection generated: ai_studio_services_v1_postman_collection.json');
