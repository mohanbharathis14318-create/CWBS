// Import Modules
import { Routes, Route } from "react-router-dom";

// Import Components
import Auth_btn from "../components/Auth_btn.jsx";

// Import Routes
import Register from "./Auth/Register.jsx";
import Login from "./Auth/Login.jsx";

const Home = () => {
    return (
        <div className="grid justify-center items-center">
            <Auth_btn />
            <Routes>
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default Home;