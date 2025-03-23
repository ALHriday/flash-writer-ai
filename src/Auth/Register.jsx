import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import axios from "axios";

const Register = () => {
    const { signInWithGoogle, setUser, createAccountWithEmailAndPass } = useAuth();
    const navigate = useNavigate();

    const handleUser = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        const image = form.get("image");
        const userName = form.get("userName");
        const userEmail = form.get("userEmail");
        const password = form.get("password");
        const data = new FormData();
        data.append('image', image);

        const email = form.get("userEmail");

        createAccountWithEmailAndPass(email, password).then(result => {
            if(!result.user?.email){
                return;
            }
        })
        
        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, data).then(data => {
            const image = data.data.data?.display_url;
            const userInfo = {userName, userEmail, image};

            axios.post('https://crack-ai-server-lovat.vercel.app/users', userInfo)
            .then(() => {})
        }
        )
        navigate('/');
    }

    const handleGoogleLogIn = () => {
        signInWithGoogle()
            .then(result => {
                setUser(result.user);
                const userData = result.user;

                const userName = userData?.displayName;
                const userEmail = userData?.email;
                const image = userData?.photoURL;
                const userInfo = { userName, userEmail, image };

                axios.post('https://crack-ai-server-lovat.vercel.app/users', userInfo)
                    .then(() => {})
                navigate('/');

            }).catch(err => err)
    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={(e) => handleUser(e)} className="card-body">
                        <fieldset className="fieldset">
                            <label className="fieldset-label">User Name</label>
                            <input type="text" className="input" placeholder="User Name"
                                name="userName" required/>
                            <label className="fieldset-label">Image</label>
                            <input type="file" className="input overflow-x-auto" name="image" placeholder="image" required/>

                            <label className="fieldset-label">Email</label>
                            <input type="email" className="input" placeholder="Email"
                                name="userEmail" required/>

                            <label className="fieldset-label">Password</label>
                            <input type="password" className="input" placeholder="Password"
                                name="password" required
                            />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Register</button>
                            <div className='divider divider-primary'>OR</div>
                            <div className="w-full">
                                <button onClick={handleGoogleLogIn} className='w-full mt-2 btn btn-secondary'>LogInWithGoogle</button>
                            </div>
                            <div>Already have an account <Link className='underline text-blue-600 font-bold' to='/login'>login</Link> </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;