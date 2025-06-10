//This custom hook helps me type better the dispatch function
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()