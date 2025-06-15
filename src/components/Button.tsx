import { ButtonProps } from "../types/customProps"

function Button({children, onClick, className}:ButtonProps) {
  return (
    <button className="bg-amber-400 hover:bg-amber-600 text-gray-200 p-4 rounded-md shadow shadow-gray-200" onClick={onClick}>
      { children }
    </button>
  )
}

export default Button