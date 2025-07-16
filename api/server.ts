// Use .js with "type":"module" in package.json, or rename to .mjs
import jsonServer from 'json-server';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Convert __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load JSON data (do NOT use "import" for JSON unless you use Node v18+ with import attributes)
const db = JSON.parse(readFileSync(join(__dirname, 'db.json'), 'utf-8'));

// Create the server instance (json-server internally uses express)
const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export default server; // export as ES module
export const config = {
  api: {
    bodyParser: false,
  },
};
