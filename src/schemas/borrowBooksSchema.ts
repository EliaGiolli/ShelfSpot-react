import * as z from 'zod';

export const borrowBookSchema = z.object({
  bookId: z.string().min(1, 'Book ID is required'),
  userEmail: z.string().email('Invalid email address'),
  loanDate: z.string().refine(
    val => !isNaN(Date.parse(val)),
    { message: 'Loan date must be a valid date' }
  ),
  returnDate: z.string().optional().refine(
    val => !val || !isNaN(Date.parse(val)),
    { message: 'Return date must be a valid date' }
  ),
}).refine(
  data => !data.returnDate || new Date(data.returnDate) > new Date(data.loanDate),
  { message: 'Return date must be after loan date', path: ['returnDate'] }
);
