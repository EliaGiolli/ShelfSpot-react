import * as Switch from "@radix-ui/react-switch";

import { useAppDispatch } from '../custom hooks/useAppDispatch';
import { toggleTheme } from '../features/theme/themeReducer';
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect } from 'react';



const ThemeSwitch = () => {

    const theme = useSelector((state:RootState) => state.theme.theme);
    const dispatch = useAppDispatch();

  // Apply theme to <html> tag for Tailwind dark mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

	return(
        <>
            <div className="flex items-center">
                <label
                    className="pr-4 text-base font-medium text-white"
                    htmlFor="theme-switch"
                >
                    Theme Switch
                </label>
            <Switch.Root
                className="
                  relative h-[25px] w-[42px] cursor-pointer rounded-full bg-amber-50 dark:bg-amber-500 
                  shadow-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-amber-400 dark:focus:shadow-amber-600 data-[state=checked]:bg-amber-700 dark:data-[state=checked]:bg-amber-800"
                id="theme-switch"
                aria-label="toggle light and dark theme"
                onCheckedChange={() => dispatch(toggleTheme())}
                checked={theme === 'light'}
            >
                <Switch.Thumb
                className="
                  block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-yellow-300 dark:bg-amber-700 
                  shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
                />
            </Switch.Root>
        </div>
        
        </>
    )
}
export default ThemeSwitch;
