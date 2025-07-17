// api/users.js
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// This handler manages GET, POST, and DELETE requests for users
export default async function handler(req, res) {
  try {
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
          try {
            req.body = body ? JSON.parse(body) : {};
          } catch (e) {
            req.body = {};
          }
          resolve();
        });
      });
    }

    // Handle GET request: return all users or users filtered by email
    if (req.method === 'GET') {
      const { email } = req.query;
      if (email) {
        // Filter users by email
        const users = db.users.filter(u => u.email === email);
        res.status(200).json(users);
      } else {
        // Return all users
        res.status(200).json(db.users);
      }
    } else if (req.method === 'POST') {
      // Handle POST request: add a new user
      const newUser = req.body;
      // Check if newUser is valid
      if (!newUser || !newUser.id || !newUser.email) {
        return res.status(400).json({ message: 'Invalid user data' });
      }
      db.users.push(newUser);
      // Try to write (will fail in production, but at least you get a clear error)
      try {
        writeFileSync(dbPath, JSON.stringify(db, null, 2));
      } catch (e) {
        return res.status(500).json({ message: 'Write failed (read-only file system on Vercel)', error: e.message });
      }
      res.status(201).json(newUser);
    } else if (req.method === 'DELETE') {
      // Handle DELETE request: remove a user by id
      const { id } = req.query;
      db.users = db.users.filter(u => u.id !== id);
      try {
        writeFileSync(dbPath, JSON.stringify(db, null, 2));
      } catch (e) {
        return res.status(500).json({ message: 'Write failed (read-only file system on Vercel)', error: e.message });
      }
      res.status(204).end();
    } else {
      // Method not allowed for this endpoint
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    // Always return JSON on error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
