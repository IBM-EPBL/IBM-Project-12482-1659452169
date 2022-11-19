import React, { useState } from "react"
import { Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../context/UserAuthContext"
import "./styles.css"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [password, setPassword] = useState("")
  const { user, signUp } = useUserAuth()
  const navigate = useNavigate()
  const createUser = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await signUp(email, password)
    } catch (err) {
      setError(err.message)
    }
  }
  const checkUserCreated = () => {
    if (user) navigate("/dashboard")
  }
  return (
    <div className="main" onLoad={checkUserCreated()}>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={createUser}>
        <h3>SignUp Here</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button">Sign Up</button>
        <div className="p-4 box mt-3 text-center">
          Already have an account? <Link to="/">Log In</Link>
        </div>
        {/* <div class="social">
          <div className="go">
            <i cclassNamelass="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div> */}
      </form>
    </div>
  )
}

export default Signup
