import * as Switch from "@radix-ui/react-switch";

import { useAppDispatch } from '../custom hooks/useAppDispatch';
import { toggleTheme } from '../features/theme/themeReducer';
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect } from 'react';

const ThemeSwitch = () => {
    const theme = useSelector((state:RootState) => state.theme.theme);
    const dispatch = useAppDispatch();

    // Remove global dark class logic if not using Tailwind's dark: variants
    // If you want to keep it for future-proofing, that's fine.

    // Theme-based classes for modern palette
    const labelText = theme === 'light' ? 'text-amber-700' : 'text-yellow-300';
    const switchBg = theme === 'light'
        ? 'bg-amber-100 data-[state=checked]:bg-amber-500'
        : 'bg-slate-800 data-[state=checked]:bg-yellow-600';
    const thumbBg = theme === 'light'
        ? 'bg-yellow-300'
        : 'bg-yellow-400';

    return (
        <div className="flex items-center">
            <label
                className={`pr-4 text-base font-medium ${labelText}`}
                htmlFor="theme-switch"
            >
                Theme Switch
            </label>
            <Switch.Root
                className={`
                  relative h-[25px] w-[42px] cursor-pointer rounded-full 
                  shadow-md outline-none focus:shadow-[0_0_0_2px] 
                  ${switchBg} transition-colors
                `}
                id="theme-switch"
                aria-label="toggle light and dark theme"
                onCheckedChange={() => dispatch(toggleTheme())}
                checked={theme === 'light'}
            >
                <Switch.Thumb
                    className={`
                      block h-[21px] w-[21px] translate-x-0.5 rounded-full 
                      shadow-md transition-transform duration-100 will-change-transform 
                      data-[state=checked]:translate-x-[19px] ${thumbBg}
                    `}
                />
            </Switch.Root>
        </div>
    )
}
export default ThemeSwitch;
