import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// This handler manages PATCH requests for a single loan (returning a book) by loan ID
export default async function handler(req, res) {
  try {
    // Build the path to the db.json file
    const dbPath = join(process.cwd(), 'api', 'db.json');
    // Read and parse the database
    const db = JSON.parse(readFileSync(dbPath, 'utf-8'));
    // Extract the loan ID from the query parameters
    const { id } = req.query;

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

    // Handle PATCH request to update the returnDate of a loan
    if (req.method === 'PATCH') {
      const { returnDate } = req.body;
      // Find the loan with the given ID
      const loan = db.loans.find(l => l.id === id);
      if (loan) {
        // Update the returnDate (use current date if not provided)
        loan.returnDate = returnDate || new Date().toISOString();
        // Try to write (will fail in production, but at least you get a clear error)
        try {
          writeFileSync(dbPath, JSON.stringify(db, null, 2));
        } catch (e) {
          return res.status(500).json({ message: 'Write failed (read-only file system on Vercel)', error: e.message });
        }
        // Respond with the updated loan
        res.status(200).json(loan);
      } else {
        // Loan not found
        res.status(404).json({ message: 'Loan not found' });
      }
    } else {
      // Method not allowed for this endpoint
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    // Always return JSON on error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
} 