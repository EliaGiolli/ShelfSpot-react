import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// This handler manages GET, POST, and DELETE requests for favourites
export default async function handler(req, res) {
  // Build the path to the db.json file
  const dbPath = join(process.cwd(), 'api', 'db.json');
  // Read and parse the database
  const db = JSON.parse(readFileSync(dbPath, 'utf-8'));

  // For non-GET requests, manually parse the request body (Vercel serverless workaround)
  if (req.method !== 'GET') {
    await new Promise((resolve) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        req.body = body ? JSON.parse(body) : {};
        resolve();
      });
    });
  }

  // Handle GET request: return all favourites or favourites for a specific user
  if (req.method === 'GET') {
    const { userId } = req.query;
    if (userId) {
      // Filter favourites by userId
      const favourites = db.favourites.filter(f => f.userId === userId);
      res.status(200).json(favourites);
    } else {
      // Return all favourites
      res.status(200).json(db.favourites);
    }
  } else if (req.method === 'POST') {
    // Handle POST request: add a new favourite
    const newFavourite = req.body;
    db.favourites.push(newFavourite);
    // Save the updated database
    writeFileSync(dbPath, JSON.stringify(db, null, 2));
    // Respond with the new favourite
    res.status(201).json(newFavourite);
  } else if (req.method === 'DELETE') {
    // Handle DELETE request: remove a favourite by id
    const { id } = req.query;
    db.favourites = db.favourites.filter(f => f.id !== id);
    // Save the updated database
    writeFileSync(dbPath, JSON.stringify(db, null, 2));
    // Respond with no content
    res.status(204).end();
  } else {
    // Method not allowed for this endpoint
    res.status(405).json({ message: 'Method not allowed' });
  }
}
