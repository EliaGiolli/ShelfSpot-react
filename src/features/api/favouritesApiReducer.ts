import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Favourites } from "../../types/book";

export const favouritesApi = createApi({
    reducerPath: 'favouritesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    //This cached data by RTK Query is associated with tags that describe what kind of data it represents
    tagTypes: ['Favourites'],
    endpoints: (builder) =>({
        getFavourites: builder.query<Favourites[], string>({
            query: (userId) => `favourites?userId=${userId}`,
            //This tells RTK Query: “The cached data returned here is associated with the ‘Favourites’ tag.”
            providesTags: ['Favourites']
        }),
        addToFavourites: builder.mutation<Favourites,Partial<Favourites>>({
            query: (newFavourite) =>({
                url:'favourites',
                method: 'POST',
                body: newFavourite
            }),
            invalidatesTags: ['Favourites']
        }),
        removeFromFavourites: builder.mutation<void, string>({
            query: (favouriteId) =>({
                url:`favourites/${favouriteId}`,
                method: 'DELETE',
                body: favouriteId
            }),
            invalidatesTags: ['Favourites']
        })
    })
})