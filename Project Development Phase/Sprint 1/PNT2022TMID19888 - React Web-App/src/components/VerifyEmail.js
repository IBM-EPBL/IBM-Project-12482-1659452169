import React, { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { Alert } from "react-bootstrap"
// import GoogleButton from "react-google-button"
import { useUserAuth } from "../context/UserAuthContext"
import "./styles.css"

const VerifyEmail = () => {
  const navigate = useNavigate()
  const { user } = useUserAuth()
  const checkEmailVerified = () => {
    if (!user) navigate("/")
    if (user && user.emailVerified) {
      navigate("/dashboard")
    }
  }
  return (
    <div className="main" onLoad={checkEmailVerified()}>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <div
          style={{
            textAlign: "center",
            height: "100vh",
            veritcalAlign: "center",
            paddingTop: "50%",
            color: "white",
            fontWeight: "900",
            fontSize: "2rem",
          }}
        >
          <p>
            Verify Your Email
            <br />
            Check Your Inbox!
            <br />
            Check Spam Too!
          </p>
          <div className="button" onClick={checkEmailVerified}>
            Refresh
          </div>
        </div>
      </form>
    </div>
  )
}

export default VerifyEmail
