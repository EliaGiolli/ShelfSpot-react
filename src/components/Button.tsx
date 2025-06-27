import { ButtonProps } from "../types/customProps";
import { useTheme } from '../custom hooks/useTheme';

function Button({children, onClick, className}:ButtonProps) {
  // Theme-based classes
  const theme = useTheme();
  const btn = theme === 'light'
    ? 'bg-amber-400 hover:bg-amber-600 text-gray-200'
    : 'bg-yellow-400 hover:bg-yellow-600 text-gray-200';

  return (
    <button
      className={`p-2 rounded-md shadow shadow-gray-200 ${btn} ${className ?? ''}`}
      onClick={onClick}
    >
      { children }
    </button>
  )
}

export default Button;