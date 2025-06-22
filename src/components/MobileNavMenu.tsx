import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { NavLink } from "react-router-dom";
import { useTheme } from '../custom hooks/useTheme';

export function MobileNavMenu() {

  const theme = useTheme();
  // Theme-based classes
  const menuBg = theme === 'light' ? 'bg-amber-800' : 'bg-amber-950';
  const linkActive = theme === 'light' ? 'text-yellow-300 underline text-xl' : 'text-yellow-200 underline text-xl';
  const link = theme === 'light'
    ? 'text-gray-100 hover:text-yellow-300 transition-colors text-xl'
    : 'text-amber-100 hover:text-yellow-300 transition-colors text-xl';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-full bg-amber-700 p-2 text-white shadow focus:outline-none focus:ring-2 focus:ring-yellow-300"
          aria-label="Toggle navigation menu"
        >
          <HamburgerMenuIcon className="w-6 h-6" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`z-50 min-w-[180px] rounded-md ${menuBg} p-4 shadow-lg flex flex-col gap-4`}
          sideOffset={22}
        >
          <NavLink to="/home" className={({ isActive }) => isActive ? linkActive : link}>Home</NavLink>
          <NavLink to="/books" className={({ isActive }) => isActive ? linkActive : link}>Books</NavLink>
          <NavLink to="/loans" className={({ isActive }) => isActive ? linkActive : link}>Borrow a book</NavLink>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
