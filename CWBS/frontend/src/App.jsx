// Import Modules
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Routes, Route, useNavigate } from "react-router-dom";

// Import Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Loading_Screen from "./components/Loading_Screen.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

// Import Hooks
import { useUser } from "./Hooks/useUser.js";

// Import Routes
import Home from "./Routes/Home.jsx";
import Login from "./Routes/Auth/Login.jsx";
import Register from "./Routes/Auth/Register.jsx";

// Import Routes For app area
import AppArea from "./Routes/App/App_Area.jsx";


function App() {

    const { checkAuth, checkingAuth } = useUser();

    const navigate = useNavigate();

    useEffect(() => {

        // document.title = "CoreBuild App | Namma Contruction";

        try {

            checkAuth();

        } catch (err) {

            if (err.response?.status === 401) {

                toast.error("Session expired. Redirecting to login...");

                setTimeout(() => {
                    navigate("/auth/login");
                }, 2000);

            }

        }


    }, [checkAuth, navigate])

    if (checkingAuth) {
        return <Loading_Screen />
    }

  return (
    <>
        <section className="tracking-widest">
           <Navbar />
            <Routes>
                <Route path="*"
                       element={ <Home /> } />
                <Route path="/auth/login"
                       element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                       } />
                <Route path="/auth/register"
                       element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                       } />
                <Route path="/app-area/*"
                       element={
                            <ProtectedRoute>
                                <AppArea />
                            </ProtectedRoute>
                       } />
            </Routes>
            <Footer />
        </section>
        <Toaster position="bottom-right" />
    </>
  )
}

export default App
