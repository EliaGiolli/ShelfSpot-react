import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authReducer'
import themeReducer from '../features/theme/themeReducer'
import { openLibraryApi } from "../features/api/apiReducer";
import { favouritesApi } from "../features/api/favouritesApiReducer";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        //openLibraryApi.reducerPath is a string key that RTK Query generates for the API slice reducer.
        //openLibraryApi.reducer is the reducer function that RTK Query provides to handle the API cache state.
        [openLibraryApi.reducerPath]: openLibraryApi.reducer,
        [favouritesApi.reducerPath]: favouritesApi.reducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            openLibraryApi.middleware,
            favouritesApi.middleware
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch