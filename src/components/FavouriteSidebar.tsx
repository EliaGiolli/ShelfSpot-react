import { useState } from "react";

import { useGetFavouritesQuery } from "../features/api/favouritesApiReducer";
import { RootState } from "../store/store"
import { useTheme } from '../custom hooks/useTheme';
import { useSelector } from "react-redux";
;
import { Heart } from "lucide-react";

import Button from "./Button";

function FavouriteSidebar() {

    const theme = useTheme();
    const userId = useSelector((state:RootState) => state.auth.userInfo?.id);
    const [open, setOpen] = useState(false);

    // Theme based classes
    const bg = theme === 'light' ? 'bg-amber-100' : 'bg-slate-900';
    const text = theme === 'light' ? 'text-gray-900' : 'text-yellow-100';
    const title = theme === 'light' ? 'text-amber-500' : 'text-yellow-300';

    if (!userId) {
        return (
            <aside className={`${bg} p-5`}>
                <p className={text}>Please log in to see your favourites.</p>
            </aside>
        );
    }

    const { data: favourites, isLoading, error } = useGetFavouritesQuery(userId);

    
    return (
        <>
            {/* Sidebar for md+ screens, modal for mobile */}
            <aside
                className={`
                    ${bg} ${text} flex flex-col justify-center items-center text-center
                    w-[300px] md:w-auto md:min-h-screen md:static md:col-span-1 z-30 p-5
                    transition-all shadow shadow-gray-300 rounded-lg
                    ${open ? 'fixed bottom-0 left-0 right-0 top-0 md:static' : 'hidden'}
                    md:flex
                `}
                style={{
                    ...(open && { position: "fixed", zIndex: 50 }),
                }}
            >
                <Button
                    className="md:hidden absolute top-4 right-4 text-2xl"
                    onClick={() => setOpen(false)}
                    aria-label="Close favourites"
                >
                    ✕
                </Button>
                <h2 className={`text-2xl md:text-3xl ${title} uppercase font-bold underline mb-5`}>Your favourites</h2>
                <ul className="md:px-4 py-2 text-lg flex flex-col gap-3">
                    {favourites?.map(fav => (
                        <li key={fav.id} className="flex items-center gap-2 md:mb-2">
                            <Heart size={30} className="text-amber-900 bg-amber-400 hover:bg-amber-500 rounded-2xl border-2 border-amber-900 p-1" />
                            <span>{fav.bookTitle || fav.bookId || "Untitled"}</span>
                        </li>
                    ))}
                </ul>
            </aside>

            {isLoading ? <p className={`${bg} text-amber-800 p-3`}>loading...</p> : null}
            {error ? <p className="bg-red-100 text-red-500 p-3 shadow shadow-gray-500 rounded-md">Error loading favourites</p> : null}

            {/* FAB for mobile */}
            <Button
                className="fixed md:hidden bottom-6 right-6 z-40 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-4 shadow-lg transition"
                onClick={() => setOpen(true)}
                aria-label="Show favourites"
            >
                <Heart size={28} />
            </Button>
        </>
    );
}

export default FavouriteSidebar;