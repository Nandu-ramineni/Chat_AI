

import { FcNfcSign } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center px-4 py-2">
            <div className="flex justify-center items-center gap-3">
                <Link to='/'><FcNfcSign className='text-[#65A648] text-2xl' /></Link>
                <h1 className='text-xl text-[#65A648] font-medium'>Chat Ai</h1>
            </div>
            <div>
                <button
                    className="select-none rounded-lg bg-[#65A648] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={()=>navigate('/login')}
                >
                    Sign In
                </button>
                
            </div>
        </div>

    )
}

export default Navbar
