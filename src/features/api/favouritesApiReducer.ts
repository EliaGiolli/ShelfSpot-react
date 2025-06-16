import { createApi, CreateApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Favourites } from "../../types/book";

export const favoritesApi = createApi({
    reducerPath: 'favouritesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    endpoints: (builder) =>({
        getFavourites: builder.query<Favourites[], string>({
            query: (userId) => `favourites?userId=${userId}`,
        }),
        addToFavourites: builder.mutation<Favourites,Partial<Favourites>>({
            query: (newFavourite) =>({
                url:'favourites',
                method: 'POST',
                body: newFavourite
            })
        })
    })
})