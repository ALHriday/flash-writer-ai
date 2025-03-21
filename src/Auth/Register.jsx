import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Register = () => {
    const { signInWithGoogle, setUser } = useAuth();

    const navigate = useNavigate();

    const handleGoogleLogIn = () => {
        signInWithGoogle()
            .then(result => {
                setUser(result.user);
                navigate('/');
            }).catch(err => err)
    }

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4 p-4 my-12">
                <h1>Register Page</h1>
                <button onClick={handleGoogleLogIn} className='btn btn-secondary'>LogInWithGoogle</button>
            </div>
        </div>
    );
};

export default Register;