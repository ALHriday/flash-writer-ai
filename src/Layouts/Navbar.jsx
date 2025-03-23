import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
    const { user, handleSignOut, currentUserInfo } = useAuth();

    return (
        <div className="navbar bg-black shadow-sm text-white">
            <div className="flex-1">
                <Link to='/' className="text-2xl font-bold"><span className="text-accent ">FlashWriter</span> <span className="text-2xl text-secondary">AI</span></Link>
            </div>
            <div className="flex justify-center items-center gap-2">
                {/* <h1>{currentUserInfo?.userName || currentUserInfo?.userEmail}</h1> */}
                <ul className="menu menu-horizontal px-1 gap-2 justify-center items-center">
                    {user ? <>
                        <div className="w-10 h-10 border-2 rounded-full border-slate-200 overflow-hidden cursor-pointer">
                            <img title={currentUserInfo?.userName || currentUserInfo?.userEmail} className="w-full h-full rounded-full" src={currentUserInfo?.image || "https://img.icons8.com/?size=100&id=kDoeg22e5jUY&format=png&color=000000"} alt="" />
                        </div>
                        <button onClick={handleSignOut} className="btn btn-accent btn-sm" >LogOut</button>

                    </> : <>
                        <Link className="btn btn-accent btn-sm" to='/login'>Login</Link>
                        <Link className="btn btn-accent btn-sm" to='/register'>Register</Link>
                    </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;