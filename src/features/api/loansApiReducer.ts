import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Loan } from '../../types/loans';

export const loansApi = createApi({
  reducerPath: 'loansApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getLoans: builder.query<Loan[], string>({
      query: (userId) => `loans?userId=${userId}`,
    }),
    //A mutation is an API call that modifies the data on the server(POST, PATCH, DELETE, ecc)
    //This mutation creates a Loans object describing the HTTP request on success
    borrowBook: builder.mutation<Loan, Partial<Loan>>({
      query: (newLoan) => ({
        url: 'loans',
        method: 'POST',
        body: newLoan,
      }),
    }),
    //It takes loadId as input and then updates an existing loans to mark it as returned with the UI
    //it also creates a Loans object that describes the HTTP request 
    returnBook: builder.mutation<Loan, string>({
      query: (loanId) => ({
        url: `loans/${loanId}`,
        method: 'PATCH',
        body: { returnDate: new Date().toISOString() },
      }),
    }),
  }),
});
//RTK Query automatically generates React hooks for each endpoint
export const {
  useGetLoansQuery,
  useBorrowBookMutation,
  useReturnBookMutation,
} = loansApi;
