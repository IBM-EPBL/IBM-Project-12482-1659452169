import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Alert } from "react-bootstrap"
import GoogleButton from "react-google-button"
import { useUserAuth } from "../../context/UserAuthContext"

import facebookIcon from "../../images/facebook.png"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const { user, signUp, signInWithGoogle, signInWithFacebook } = useUserAuth()
  const navigate = useNavigate()
  const createUser = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await signUp(email, password, mobile)
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
      <form className="form" onSubmit={createUser}>
        <h3>SignUp Here</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="phone">Mobile Number</label>
        <input
          type="tel"
          placeholder="Enter 10 digit Mobile Number"
          id="phone"
          pattern="[0-9]{10}"
          required
          onChange={(e) => setMobile(e.target.value)}
        />

        <button className="button">Sign Up</button>
        <GoogleButton className="m-auto my-3" onClick={signInWithGoogle} />
        <button
          className="m-auto my-3 social-button"
          type="button"
          onClick={signInWithFacebook}
        >
          <div className="social-button-svg">
            <img src={facebookIcon} width="48px" />
          </div>
          <span>Sign in with Facebook</span>
        </button>
        <div className="text-center p-1 m-auto m-1 ">
          Already have an account? <Link to="/">Log In</Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
