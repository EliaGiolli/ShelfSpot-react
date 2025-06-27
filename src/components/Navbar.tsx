import { Link, NavLink } from 'react-router-dom'
import { MobileNavMenu } from './MobileNavMenu';
import Button from './Button';
import ThemeSwitch from './ThemeSwitch'

import { useTheme } from '../custom hooks/useTheme';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authReducer';

import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function Navbar() {

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Theme-based classes
  const navBg = theme === 'light' ? 'bg-amber-700 border-b-yellow-300' : 'bg-slate-900 border-b-yellow-200';
  const linkText = theme === 'light' ? 'text-yellow-300' : 'text-yellow-200';
  const navLink = (isActive: boolean) =>
    isActive
      ? `${linkText} underline`
      : `text-yellow-100 hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded`;

  //Log-out logic
  const handleLogout = () =>{
    console.log('logout checked')
    dispatch(logout());
    localStorage.removeItem('userInfo');
    navigate('/login');
  }

  return (
    <nav
      className={`${navBg} flex justify-around items-center w-full max-h-20 border-b-2 sticky top-0 z-50 px-4 py-6`}
      aria-label='primary-navigation'
    >
      {/* Desktop menu */}
      <Link to='/home' className={`font-bold text-3xl ${linkText} hidden md:block`}>
        ShelfSpot
      </Link>
      <ul className='hidden md:flex items-center text-center text-2xl gap-x-8'>
        <li>
          <NavLink to='/home' className={({ isActive }) => navLink(isActive)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/books' className={({ isActive }) => navLink(isActive)}>
            Books
          </NavLink>
        </li>
        <li>
          <NavLink to='/loans' className={({ isActive }) => navLink(isActive)}>
            Borrow a book
          </NavLink>
        </li>
      </ul>
      <section className='flex justify-center items-center text-center gap-8 '>
        {/* Mobile menu */}
        <MobileNavMenu />
        {/* Theme toggler button */}
        <ThemeSwitch />
          {/* Logout button */}
        <Button onClick={handleLogout}>
           <LogOut />   
        </ Button>
      </section>
    </nav>
  );
}

export default Navbar;