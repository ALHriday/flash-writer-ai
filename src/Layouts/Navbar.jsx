import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">daisyUI</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <Link className="btn btn-accent" to='/login'>Login</Link>
                    <Link className="btn btn-accent" to='/register'>Register</Link>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;