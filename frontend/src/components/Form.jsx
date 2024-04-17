// Importing necessary modules and functions
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

// Defining the Form component
function Form({ route, method }) {
    // Setting up the state for the form fields and loading state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Setting the name of the form based on the method
    const name = method === "login" ? "Login" : "Register";

    // Defining the handleSubmit function
    const handleSubmit = async (e) => {
        // Setting the loading state to true
        setLoading(true);

        // Preventing the default form submission behavior
        e.preventDefault();

        try {
            // Sending a POST request to the API with the form data
            const res = await api.post(route, { username, password })

            // If the method is "login", storing the access and refresh tokens in the localStorage
            // and navigating to the home page
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                // If the method is "register", navigating to the login page
                navigate("/login")
            }
        } catch (error) {
            // If there is an error, showing an alert with the error message
            alert(error)
        } finally {
            // Setting the loading state to false
            setLoading(false)
        }
    };

    // Rendering the form with the input fields, button, and loading indicator
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

// Exporting the Form component as the default export
export default Form