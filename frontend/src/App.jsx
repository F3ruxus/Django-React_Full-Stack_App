// Importing necessary modules and components
import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

// Defining the Logout component
function Logout() {
  // Clearing the localStorage and redirecting to the login page
  localStorage.clear()
  return <Navigate to="/login" />
}

// Defining the RegisterAndLogout component
function RegisterAndLogout() {
  // Clearing the localStorage and rendering the Register component
  localStorage.clear()
  return <Register />
}

// Defining the App component
function App() {
  // Rendering the Routes component with a BrowserRouter
  return (
    <BrowserRouter>
      {/* Rendering the Routes component with a Routes component */}
      <Routes>
        {/* Defining a Route component with a path of "/" and an element of a ProtectedRoute component with a Home component */}
        <Route
          path="/"
          element={
            // You can't access home unless you have an access token, that's the point of ProtectedRoute
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Defining a Route component with a path of "/login" and an element of a Login component */}
        <Route path="/login" element={<Login />} />
        {/* Defining a Route component with a path of "/logout" and an element of a Logout component */}
        <Route path="/logout" element={<Logout />} />
        {/* Defining a Route component with a path of "/register" and an element of a RegisterAndLogout component */}
        <Route path="/register" element={<RegisterAndLogout />} />
        {/* Any other path will send you to the 404 notfound page */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

// Exporting the App component as the default export
export default App