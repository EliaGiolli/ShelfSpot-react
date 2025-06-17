import { useTheme } from "../custom hooks/useTheme"
import { useGetFavouritesQuery } from "../features/api/favouritesApiReducer";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


function Sidebar() {

    const userId = useSelector((state:RootState) => state.auth.userInfo?.id);
    const { data: favourites, isLoading, error } =useGetFavouritesQuery(userId ?? '');
  
    if(isLoading) return <p className="bg-amber-100 text-amber-800 p-3">loading...</p>
    if(error) return <p className="bg-red-100 text-red-500 p-3">Error loading favourites</p>

  return (
    <aside className="bg-amber-400 dark:bg-amber-700 text-gray-900 dark:text-gray-200 flex flex-col justify-center items-center text-center p-5">
      <h2>{userId}'s favourites</h2>
      <ul>
         {favourites?.map(fav => (
          <li key={fav.id}>{fav.bookTitle || fav.bookId}</li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar