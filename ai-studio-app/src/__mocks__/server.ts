import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup request interception layer
export const server = setupServer(...handlers);
