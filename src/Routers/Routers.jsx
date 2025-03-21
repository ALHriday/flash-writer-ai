import { Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "../Layouts/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const Routers = () => {
    return (
        <div>
            <Routes>
                <Route element={<App />}>
                    <Route index path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </div>
    );
};

export default Routers;