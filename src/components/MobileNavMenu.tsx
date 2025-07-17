import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { NavLink } from "react-router-dom";
import { useTheme } from '../custom hooks/useTheme';

export function MobileNavMenu() {
  const theme = useTheme();
  // Theme-based classes
  const menuBg = theme === 'light' ? 'bg-amber-800' : 'bg-slate-900';
  const button = theme === 'light' ? 'bg-amber-400 hover:bg-amber-600 text-white focus:ring-yellow-300' : 'bg-yellow-400 hover:bg-yellow-600 text-white focus:ring-yellow-700';
  const linkActive = theme === 'light' ? 'text-yellow-300 underline text-xl' : 'text-yellow-200 underline text-xl';
  const link = theme === 'light'
    ? 'text-gray-100 hover:text-yellow-300 transition-colors text-xl'
    : 'text-amber-100 hover:text-yellow-300 transition-colors text-xl';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild aria-label="Open mobile navigation menu">
        <button
          className={`${button} md:hidden inline-flex items-center justify-center rounded-full p-2 shadow focus:outline-none focus:ring-2`}
          aria-label="Toggle navigation menu"
        >
          <HamburgerMenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`z-50 min-w-[180px] rounded-md ${menuBg} p-4 shadow-lg flex flex-col gap-4`}
          sideOffset={22}
          aria-label="Mobile navigation menu"
        >
          <NavLink to="/home" className={({ isActive }) => isActive ? linkActive : link} aria-label="Home page">Home</NavLink>
          <NavLink to="/books" className={({ isActive }) => isActive ? linkActive : link} aria-label="Books page">Books</NavLink>
          <NavLink to="/loans" className={({ isActive }) => isActive ? linkActive : link} aria-label="Borrow a book page">Borrow a book</NavLink>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
