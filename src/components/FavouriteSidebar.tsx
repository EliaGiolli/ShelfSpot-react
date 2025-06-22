import { useGetFavouritesQuery } from "../features/api/favouritesApiReducer";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Heart } from "lucide-react";
import { useTheme } from '../custom hooks/useTheme';

function FavouriteSidebar() {
    const theme = useTheme();
    const userId = useSelector((state:RootState) => state.auth.userInfo?.id);
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

    if(isLoading) return <p className={`${bg} text-amber-800 p-3`}>loading...</p>
    if(error) return <p className="bg-red-100 text-red-500 p-3 shadow shadow-gray-500 rounded-md">Error loading favourites</p>

    return (
        <aside className={`
          ${bg} ${text} flex flex-col justify-center items-center text-center 
          w-full md:w-auto min-h-screen fixed bottom-0 left-0 md:static md:col-span-1 z-30 p-5 transition-all shadow shadow-gray-300 rounded-lg`}>
            <h2 className={`text-2xl md:text-3xl ${title} uppercase font-bold underline mb-5`}>Your favourites</h2>
            <ul className="px-4 py-2 text-lg">
                {favourites?.map(fav => (
                    <li key={fav.id} className="flex items-center gap-2 mb-2">
                        <Heart size={30} className="text-amber-900 bg-amber-400 hover:bg-amber-500 rounded-2xl border-2 border-amber-900 p-1" />
                        <span>{fav.bookTitle || fav.bookId || "Untitled"}</span>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default FavouriteSidebar;