import { ButtonProps } from "../types/customProps";
import { useTheme } from '../custom hooks/useTheme';

function Button({children, onClick, className}:ButtonProps) {
  // Theme-based classes
  const theme = useTheme();
  const btn = theme === 'light'
    ? 'bg-amber-400 hover:bg-amber-600 text-white'
    : 'bg-yellow-600 hover:bg-yellow-700 text-white';

  return (
    <button
      className={`p-4 rounded-md shadow shadow-gray-200 ${btn} ${className ?? ''}`}
      onClick={onClick}
    >
      { children }
    </button>
  )
}

export default Button;