import { TbError404Off } from "react-icons/tb";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="bg-orange-100 min-h-screen w-full flex justify-center items-center">
      <div className="bg-white flex flex-col justify-center items-center text-center w-1/2 max-h-[400px] p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-center text-center mb-4">
          <TbError404Off size={45} className="text-red-600"/>
          <h1 className="text-4xl text-red-600 uppercase">Page not found</h1>
        </div>
        <p className="text-2xl mb-4">Click the link below to return to the homepage</p>
        <Link to='/' className="text-lg text-red-600">To the homepage</Link>
      </div>
    </div>
  )
}

export default NotFound