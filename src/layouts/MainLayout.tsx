import Navbar from "../components/Navbar"
import { Outlet } from "react-router"
import Footer from "../components/Footer"

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-amber-50 min-h-screen flex flex-col">
       <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout