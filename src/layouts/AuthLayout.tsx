import { Outlet } from "react-router";
import { useTheme } from '../custom hooks/useTheme';

function AuthLayout() {
  // Theme-based classes
  const theme = useTheme();
  const bg = theme === 'light' ? 'bg-amber-50' : 'bg-zinc-900';

  return (
    <div className={`min-h-screen ${bg}`}>
      <Outlet />
    </div>
  )
}

export default AuthLayout;