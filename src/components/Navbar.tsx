import { Link, NavLink } from 'react-router-dom'
import { MobileNavMenu } from './MobileNavMenu';
import ThemeSwitch from './ThemeSwitch'

function Navbar() {

  return (
    <nav className='bg-amber-700 flex justify-around items-center w-full max-h-20 border-b-2 border-b-yellow-300 sticky top-0 z-50 px-4 py-6'
      aria-label='primary-navigation'
    >
      {/* Desktop menu */}
      <Link to='/home' className="font-bold text-3xl text-yellow-300 hidden md:block">ShelfSpot</Link>
      <ul className='hidden md:flex items-center text-center text-2xl gap-x-8'>
        <li>
          <NavLink 
            to='/home'
            className={({isActive})=> isActive ? 'text-yellow-300 underline' : 'text-gray-200 hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded'}
            >
              Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to='/books'
            className={({isActive})=> isActive ? 'text-yellow-300 underline' : 'text-gray-200 hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded'}
            >
              Books
          </NavLink>
        </li>
        <li>
          <NavLink 
            to='/loans'
            className={({isActive})=> isActive ? 'text-yellow-300 underline' : 'text-gray-200 hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded'}
            >
              Borrow a book
          </NavLink>
        </li>
      </ul>
      {/* Mobile menu */}
      <MobileNavMenu />
      {/* Theme toggler button */}
      <ThemeSwitch />
    </nav>
  )
}

export default Navbar