import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const dbPath = join(process.cwd(), 'api', 'db.json');
  const db = JSON.parse(readFileSync(dbPath, 'utf-8'));

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
    db.favourites.push(newFavourite);
    writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.status(201).json(newFavourite);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    db.favourites = db.favourites.filter(f => f.id !== id);
    writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.status(204).end();
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
