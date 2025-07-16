import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// This handler manages GET, POST, and DELETE requests for loans
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

  // Handle GET request: return all loans or loans for a specific user
  if (req.method === 'GET') {
    const { userId } = req.query;
    if (userId) {
      // Filter loans by userId
      const loans = db.loans.filter(l => l.userId === userId);
      res.status(200).json(loans);
    } else {
      // Return all loans
      res.status(200).json(db.loans);
    }
  } else if (req.method === 'POST') {
    // Handle POST request: add a new loan
    const newLoan = req.body;
    db.loans.push(newLoan);
    // Save the updated database
    writeFileSync(dbPath, JSON.stringify(db, null, 2));
    // Respond with the new loan
    res.status(201).json(newLoan);
  } else if (req.method === 'DELETE') {
    // Handle DELETE request: remove a loan by id
    const { id } = req.query;
    db.loans = db.loans.filter(l => l.id !== id);
    // Save the updated database
    writeFileSync(dbPath, JSON.stringify(db, null, 2));
    // Respond with no content
    res.status(204).end();
  } else {
    // Method not allowed for this endpoint
    res.status(405).json({ message: 'Method not allowed' });
  }
}
