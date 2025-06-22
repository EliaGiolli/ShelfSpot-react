import Navbar from "../components/Navbar"
import { Outlet } from "react-router"
import Footer from "../components/Footer"
import { useTheme } from "../custom hooks/useTheme"

function MainLayout() {

  const theme = useTheme();

  return (
    <>
      <Navbar />
      <main className={`${theme === 'light' ? 'bg-amber-50' : 'bg-zinc-900'} min-h-screen flex flex-col`}>
       <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout