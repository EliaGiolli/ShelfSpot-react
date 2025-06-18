import { useGetFavouritesQuery } from "../features/api/favouritesApiReducer";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Heart } from "lucide-react";

function FavouriteSidebar() {

    const userId = useSelector((state:RootState) => state.auth.userInfo?.id);
    const { data: favourites, isLoading, error } =useGetFavouritesQuery(userId ?? '');
  
    if(isLoading) return <p className="bg-amber-100 text-amber-800 p-3">loading...</p>
    if(error) return <p className="bg-red-100 text-red-500 p-3 shadow shadow-gray-500 rounded-md">Error loading favourites</p>

  return (
    <aside className="
    bg-amber-200 dark:bg-amber-500 text-gray-900 dark:text-gray-200 
      flex flex-col justify-center items-center text-center 
      w-full md:w-auto min-h-screen fixed bottom-0 left-0 md:static md:col-span-1 z-50 p-5 transition-all shadow shadow-gray-300
      ">
      <h2 className="text-2xl md:text-3xl text-amber-500 dark:text-amber-700 mb-5">{userId}'s favourites</h2>
      <ul className="px-4 py-2 text-lg">
         {favourites?.map(fav => (
          <li key={fav.id}><Heart size={35}/>{fav.bookTitle || fav.bookId}</li>
        ))}
      </ul>
    </aside>
  )
}

export default FavouriteSidebar