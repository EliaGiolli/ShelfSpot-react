import { useState, useEffect } from "react";

//EXTERNAL LIBRARIES
import axios from "axios";
//INTERNAL FILES
import { Books } from "../utils/book";


export function useFetch(searchTerm:string | number){

  const [books, setBooks] = useState<Books[]>([]);
  const [error, setError] = useState<string | null>(null);  
  const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
    
      async function fetchData(){
        try {
          const response = await axios.get(`https://openlibrary.org/search.json?q=${searchTerm}`);
          setBooks(response.data.docs);
          console.log(response.data.docs);
        } catch(err:any) {
           setError(err.message)
        }finally{
          setLoading(false);
        }
      }
      fetchData();
    },[searchTerm]);

    return {books, error, loading}
  };