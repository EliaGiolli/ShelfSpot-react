import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const dbPath = join(process.cwd(), 'api', 'db.json');
  const db = JSON.parse(readFileSync(dbPath, 'utf-8'));

  if (req.method === 'GET') {
    const { userId } = req.query;
    if (userId) {
      const loans = db.loans.filter(l => l.userId === userId);
      res.status(200).json(loans);
    } else {
      res.status(200).json(db.loans);
    }
  } else if (req.method === 'POST') {
    const newLoan = req.body;
    db.loans.push(newLoan);
    writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.status(201).json(newLoan);
  } else if (req.method === 'PATCH') {
    const { id } = req.query;
    const { returnDate } = req.body;
    const loan = db.loans.find(l => l.id === id);
    if (loan) {
      loan.returnDate = returnDate;
      writeFileSync(dbPath, JSON.stringify(db, null, 2));
      res.status(200).json(loan);
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
