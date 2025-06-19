export interface Loan {
    id: string,
    userId: string,
    userName: string,
    lastName: string,
    bookId: string,
    bookTitle: string,
    borrowDate: Date,
    dueDate: Date,
    loanDate: string,
    returnDate?: Date
    loansId: string
}

// For the component's props
export interface LoansPageProps {
  userId: string; // LoansPage expects a userId string as a prop
}

export interface LoanComponentProps {
  loan: Loan;
  onReturned: () => void; // Callback to notify parent to refresh list
}


// For the data coming from the form (before adding API-specific fields)
export interface BorrowFormData {
    userId: string;
    userName: string;
    lastName: string;
    onSuccess?: () => void; // Optional callback after successful borrow
}

// Define the form input type to match the Zod schema
export interface BorrowBookFormInput {
  bookId: string;
  userEmail: string;
  loanDate: string;
  returnDate?: string;
};