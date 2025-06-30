import { ButtonProps } from "../types/customProps";
import { useTheme } from '../custom hooks/useTheme';

function Button({children, onClick, className, type, disabled}:ButtonProps) {
  // Theme-based classes
  const theme = useTheme();
  const btn = theme === 'light'
    ? 'bg-amber-400 hover:bg-amber-600 text-gray-200 shadow-gray-200'
    : 'bg-yellow-400 hover:bg-yellow-600 text-zinc-900 shadow-zinc-900';

  return (
    <button
      className={`p-2 rounded-md shadow ${btn} ${className ?? ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      { children }
    </button>
  )
}

export default Button;