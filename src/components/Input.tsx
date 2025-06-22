import * as Label from '@radix-ui/react-label';
import { InputProps } from '../types/customProps';
import { useTheme } from '../custom hooks/useTheme';

const LabelDemo = ({ className, handleInputChange, searchTerm }: InputProps) => {
    const theme = useTheme();

    const inputClass =
        theme === 'light'
            ? "inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded bg-gray-50 hover:bg-amber-100 px-2.5 text-[15px] leading-none text-gray-900 shadow shadow-gray-300 outline-amber-500 focus:shadow-gray-400 border-2 border-amber-200"
            : "inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded bg-slate-800 hover:bg-slate-700 px-2.5 text-[15px] leading-none text-yellow-100 shadow shadow-zinc-900 outline-yellow-400 focus:shadow-yellow-900 border-2 border-slate-700";

    const labelClass =
        theme === 'light'
            ? "text-[15px] font-medium leading-[35px] text-gray-400"
            : "text-[15px] font-medium leading-[35px] text-yellow-100";

    return (
        <div className="flex flex-wrap justify-center items-center gap-[15px] px-5">
            <Label.Root
                className={labelClass}
                htmlFor="Book genre"
            >
                Type here the book genre
            </Label.Root>
            <input
                className={inputClass}
                type="text"
                id="Book Genre"
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default LabelDemo;