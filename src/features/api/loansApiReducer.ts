import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Loan } from '../../types/loans';

export const loansApi = createApi({
  reducerPath: 'loansApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  //it declares a tag called 'Loans' for cache management. 
  //RTK wants to know which cached data should be invalidated or refetched after mutations
  tagTypes: ['Loans'], 
  endpoints: (builder) => ({
    getLoans: builder.query<Loan[], string>({
      query: (userId) => `loans?userId=${userId}`,
      //when a mutation affecting this user's loans happens, RTK Query knows exactly which cached data to invalidate and refetch
      providesTags: (result, error, userId) => [{ type: 'Loans', id: userId }], 
    }),
    //A mutation is an API call that modifies the data on the server(POST, PATCH, DELETE, ecc)
    //This mutation creates a Loans object describing the HTTP request on success
    borrowBook: builder.mutation<Loan, Partial<Loan>>({
      query: (newLoan) => ({
        url: 'loans',
        method: 'POST',
        body: newLoan,
      }),
      //This triggers an automatic refetch of the user's loans, so the UI updates with the new loan.
      invalidatesTags: (result, error, { userId }) => [{ type: 'Loans', id: userId }], 
    }),
    //It takes loadId as input and then updates an existing loans to mark it as returned with the UI
    //it also creates a Loans object that describes the HTTP request 
    returnBook: builder.mutation<Loan, string>({
      query: (loanId) => ({
        url: `loans/${loanId}`,
        method: 'PATCH',
        body: { returnDate: new Date().toISOString() },
      }),
      //Ensures that any list of loans (for any user) is refetched, so the UI reflects the returned book.
      invalidatesTags: ['Loans'], 
    }),
  }),
});
//RTK Query automatically generates React hooks for each endpoint
export const {
  useGetLoansQuery,
  useBorrowBookMutation,
  useReturnBookMutation,
} = loansApi;
