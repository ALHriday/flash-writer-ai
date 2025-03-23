import React from 'react';
import useAuth from '../Hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {signInWithEmailAndPass, signInWithGoogle, setUser} = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogIn = () => {
        signInWithGoogle()
            .then(result => {
                setUser(result.user);
                const userData = result.user;

                const userName = userData?.displayName;
                const userEmail = userData?.email;
                const image = userData?.photoURL;
                const userInfo = { userName, userEmail, image };

                axios.post('http://localhost:3100/users', userInfo)
                    .then(() => {})
                navigate('/');

            }).catch(err => err)
    }

    const handleUserLogin = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const email = form.get('userEmail');
        const password = form.get('password');

        signInWithEmailAndPass(email, password)
        .then(() => {
            e.target.userEmail.value = '';
            e.target.password.value = '';
        }
        )
        
    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={(e) => handleUserLogin(e)} className="card-body">
                        <fieldset className="fieldset">

                            <label className="fieldset-label">Email</label>
                            <input type="email" className="input" placeholder="Email"
                                name="userEmail" required/>

                            <label className="fieldset-label">Password</label>
                            <input type="password" className="input" placeholder="Password"
                                name="password" required
                            />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                            <div className="w-full">
                                <button onClick={handleGoogleLogIn} className='w-full mt-2 btn btn-secondary'>LogInWithGoogle</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;