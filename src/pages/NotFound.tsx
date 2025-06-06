import { TbError404Off } from "react-icons/tb";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="bg-orange-100 flex flex-col justify-center items-center text-center min-h-screen w-full">
      <div className="flex justify-between items-center text-center">
        <TbError404Off size={30}/>
        <h1>Page not found</h1>
      </div>
      <p>Click the link below to return to the homepage</p>
      <Link to='/'>To the homepage</Link>
    </div>
  )
}

export default NotFound