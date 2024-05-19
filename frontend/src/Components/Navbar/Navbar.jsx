
import { FcNfcSign } from "react-icons/fc";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div className="flex justify-between items-center px-4 py-2">
            <div className="flex justify-center items-center gap-3">
                <Link to='/'><FcNfcSign className='text-[#65A648] text-2xl'/></Link> 
                <h1 className='text-xl text-[#65A648] font-medium'>Chat Ai</h1>
            </div>
            <div className="flex justify-center items-center">
                <button className="px-2 py-1 bg-[#65A648] text-white rounded-md">Login</button>
                
            </div>
        </div>
    )
}

export default Navbar
