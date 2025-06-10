import { Database } from 'json-server';

declare global {
  namespace Express {
    interface Application {
      db: Database;
    }
  }
} 