import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// This handler manages GET, POST, and DELETE requests for favourites
export default async function handler(req, res) {
  try {
    const dbPath = join(process.cwd(), 'api', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf-8'));

    // For non-GET requests, manually parse the request body (Vercel serverless workaround)
    if (req.method !== 'GET') {
      await new Promise((resolve) => {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            req.body = body ? JSON.parse(body) : {};
          } catch (e) {
            req.body = {};
          }
          resolve();
        });
      });
    }

    if (req.method === 'GET') {
      const { userId } = req.query;
      if (userId) {
        const favourites = db.favourites.filter(f => f.userId === userId);
        res.status(200).json(favourites);
      } else {
        res.status(200).json(db.favourites);
      }
    } else if (req.method === 'POST') {
      const newFavourite = req.body;
      // Check if newFavourite is valid
      if (!newFavourite || !newFavourite.id) {
        return res.status(400).json({ message: 'Invalid favourite data' });
      }
      db.favourites.push(newFavourite);
      // Try to write (will fail in production, but at least you get a clear error)
      try {
        writeFileSync(dbPath, JSON.stringify(db, null, 2));
      } catch (e) {
        return res.status(500).json({ message: 'Write failed (read-only file system on Vercel)', error: e.message });
      }
      res.status(201).json(newFavourite);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      db.favourites = db.favourites.filter(f => f.id !== id);
      try {
        writeFileSync(dbPath, JSON.stringify(db, null, 2));
      } catch (e) {
        return res.status(500).json({ message: 'Write failed (read-only file system on Vercel)', error: e.message });
      }
      res.status(204).end();
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    // Always return JSON on error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
