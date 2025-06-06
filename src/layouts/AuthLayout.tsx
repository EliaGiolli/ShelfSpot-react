import { Outlet } from "react-router"

function AuthLayout() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Outlet />
    </div>
  )
}

export default AuthLayout