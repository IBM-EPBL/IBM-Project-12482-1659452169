import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import Login from "./components/Login"
import SignUp from "./components/Signup"
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import "bootstrap/dist/css/bootstrap.min.css"
import { UserAuthContextProvider } from "./context/UserAuthContext"
import VerifyEmail from "./components/VerifyEmail"
import SignOut from "./components/SignOut"
function App() {
  return (
    <Router>
      <UserAuthContextProvider>
        <SignOut />
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/verifyemail" element={<VerifyEmail />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </UserAuthContextProvider>
    </Router>
  )
}

export default App
