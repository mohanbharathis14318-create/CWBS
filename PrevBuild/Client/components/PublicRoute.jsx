// Import Modules
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import Hooks
import { useUser } from "../Hooks/useUser.js";

// Import components
import Loading_Screen from "./Loading_Screen.jsx";

const PublicRoute = ({ children }) => {

    const { isLoggedIn, checkingAuth } = useUser();

    const navigate = useNavigate();

    useEffect(() => {

        if (!checkingAuth && isLoggedIn) {

            navigate('/app-area', { replace: true });

            navigate(0);

        }

    }, [checkingAuth, isLoggedIn, navigate]);

    if (checkingAuth) return <Loading_Screen />

    return !isLoggedIn ? children : null;

};

export default PublicRoute;