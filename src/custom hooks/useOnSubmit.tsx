import { useCallback } from "react";

export function useOnSubmit({ borrowBook, userId, userName, lastName, bookId, bookTitle, reset, onSuccess }: any) {
  return useCallback(
    async (data: { bookId: string }) => {
      try {
        await borrowBook({
          userId,
          userName,
          lastName,
          bookId: data.bookId,
          bookTitle: bookTitle || "Unknown Title",
          loanDate: new Date().toISOString(),
        }).unwrap();
        reset();
        if (onSuccess) onSuccess();
      } catch (err) {
        // handle error
      }
    },
    [borrowBook, userId, userName, lastName, bookTitle, reset, onSuccess]
  );
}