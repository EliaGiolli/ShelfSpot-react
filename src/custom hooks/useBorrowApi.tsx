import { useState } from "react";
import { useSearchBooksQuery } from "../features/api/apiReducer";
import { useBorrowBookMutation } from "../features/api/loansApiReducer";

export function useBorrowApi() {
  const [bookId, setBookId] = useState("");
  const { data: books, isLoading: isBookLoading } = useSearchBooksQuery(bookId, { skip: !bookId });
  const [borrowBook, { error, isLoading: isBorrowing }] = useBorrowBookMutation();

  const bookTitle = books && books.length > 0 ? books[0].title : "";

  return {
    bookId,
    setBookId,
    bookTitle,
    isBookLoading,
    borrowBook,
    isBorrowing,
    error,
  };
}