// Importing necessary modules and functions
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

// Defining the ProtectedRoute component
function ProtectedRoute({ children }) {
    // Setting up the state for authorization
    const [isAuthorized, setIsAuthorized] = useState(null);

    // Running the auth function on component mount
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, []);

    // Defining the refreshToken function
    // We get the refresh token, we send it to the backend, 
    // If the response status is 200, a new accesstoken is aquired
    // Otherwise, setIsAuthorized is false due to an error in aquiring a new access token
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    // Defining the auth function
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            // If the token has expired, refresh it
            await refreshToken();
        } else {
            // If the token is still valid, set the authorization state to true
            setIsAuthorized(true);
        }
    };

    // Rendering the component based on the authorization state
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

// Exporting the ProtectedRoute component as the default export
export default ProtectedRoute;