import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import { UserAuthContextProvider } from "./context/UserAuthContext"
import ProtectedRoute from "./components/protected/ProtectedRoute"
import SignUp from "./components/auth/Signup"
import Login from "./components/auth/Login"
import VerifyEmail from "./components/auth/VerifyEmail"
import SignOut from "./components/auth/SignOut"
import Dashboard from "./components/Dashboard"

import "bootstrap/dist/css/bootstrap.min.css"
import "./css/styles.css"
import ServiceRequest from "./components/other/ServiceRequest"
import Requested from "./components/other/Requested"

function App() {
  return (
    <Router>
      <UserAuthContextProvider>
        <SignOut />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/verifyemail" element={<VerifyEmail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route exact path="/service_request" element={<ServiceRequest />} />
            <Route exact path="/requested" element={<Requested />} />
          </Route>
        </Routes>
      </UserAuthContextProvider>
    </Router>
  )
}

export default App
