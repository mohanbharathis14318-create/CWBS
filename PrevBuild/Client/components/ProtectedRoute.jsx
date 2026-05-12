// Import Modules
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import Hooks
import { useUser } from "../Hooks/useUser.js";

// Import components
import Loading_Screen from "./Loading_Screen.jsx";

const ProtectedRoute = ({ children }) => {

    const { checkingAuth, isLoggedIn } = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        if (!checkingAuth && !isLoggedIn) {

            return navigate('/auth/login', { replace: true });

        }
    }, [checkingAuth, isLoggedIn, navigate]);

    if (checkingAuth) return <Loading_Screen />

    return isLoggedIn ? children : null;

};

export default ProtectedRoute;