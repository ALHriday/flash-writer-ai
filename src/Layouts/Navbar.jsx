import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
    const { user, handleSignOut } = useAuth();

    return (
        <div className="navbar bg-black shadow-sm text-white">
            <div className="flex-1">
                <Link to='/' className="text-2xl font-bold"><span className="text-accent ">FlashWriter</span> <span className="text-2xl text-secondary">AI</span></Link>
            </div>
            <div className="flex justify-center items-center gap-2">
                <h1>{user?.displayName}</h1>
                <ul className="menu menu-horizontal px-1 gap-2">
                    {!user ? <>
                        <Link className="btn btn-accent" to='/login'>Login</Link>
                        <Link className="btn btn-accent" to='/register'>Register</Link>
                    </> :
                        <>
                            <button onClick={handleSignOut} className="btn btn-accent" >LogOut</button>
                        </>}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;