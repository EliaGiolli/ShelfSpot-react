// api/users.js
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const dbPath = join(process.cwd(), 'api', 'db.json');
  const db = JSON.parse(readFileSync(dbPath, 'utf-8'));
  const { email } = req.query;

  if (req.method === 'GET') {
    if (email) {
      const users = db.users.filter(u => u.email === email);
      res.status(200).json(users);
    } else {
      res.status(200).json(db.users);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
