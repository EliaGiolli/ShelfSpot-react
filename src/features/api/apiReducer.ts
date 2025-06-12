import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Books } from '../../types/book';

export const openLibraryApi = createApi({
    
  reducerPath: 'openLibraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://openlibrary.org/' }),
  endpoints: (builder) => ({
    searchBooks: builder.query<Books[], string>({
      query: (searchTerm) => `search.json?q=${searchTerm}`,
      transformResponse: (response: { docs: Books[] }) => response.docs,
    }),
  }),
});


export const { useSearchBooksQuery } = openLibraryApi;