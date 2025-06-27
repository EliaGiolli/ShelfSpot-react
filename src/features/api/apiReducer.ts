import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from '../../types/book';

export const openLibraryApi = createApi({
    
  reducerPath: 'openLibraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://openlibrary.org/' }),
  endpoints: (builder) => ({
    searchBooks: builder.query<Book[], string>({
      query: (searchTerm) => `search.json?q=${searchTerm}`,
      transformResponse: (response: { docs: Book[] }) => response.docs,
    }),
  }),
});


export const { useSearchBooksQuery } = openLibraryApi;