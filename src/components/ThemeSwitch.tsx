import * as Switch from "@radix-ui/react-switch";

const ThemeSwitch = () => (
	 <form>
        <div className="flex items-center">
            <label
                className="pr-4 text-base font-medium text-yellow-300"
                htmlFor="theme-switch"
            >
                Theme Switch
            </label>
        <Switch.Root
            className="relative h-[25px] w-[42px] cursor-pointer rounded-full bg-amber-50 shadow-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-amber-400 data-[state=checked]:bg-amber-700"
            id="theme-switch"
            aria-label="toggle light and dark theme"
        >
            <Switch.Thumb
            className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-yellow-300 shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
            />
        </Switch.Root>
     </div>
  </form>
);

export default ThemeSwitch;
