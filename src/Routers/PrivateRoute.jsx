import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <h1 className="text-xl my-6">Loading...</h1>
    }

    if(user){
        return children;
    }

    return <Navigate to='/login'></Navigate>;
};

export default PrivateRoute;