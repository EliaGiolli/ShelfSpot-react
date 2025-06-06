import Navbar from "../components/Navbar"
import { Outlet } from "react-router"

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-orange-100 min-h-screen flex flex-col">
       <Outlet />
      </main>
    </>
  )
}

export default MainLayout