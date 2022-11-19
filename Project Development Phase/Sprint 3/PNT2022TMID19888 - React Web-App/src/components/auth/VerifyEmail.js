import { useNavigate } from "react-router-dom"
// import GoogleButton from "react-google-button"
import { useUserAuth } from "../../context/UserAuthContext"

const VerifyEmail = () => {
  const navigate = useNavigate()
  const { user, sendVerificationEmail } = useUserAuth()

  const checkEmailVerified = () => {
    if (!user) navigate("/")
    if (user && user.emailVerified) {
      navigate("/dashboard")
    }
  }
  const refresh = () => {
    window.location.reload(false)
  }
  return (
    <div className="main" onLoad={checkEmailVerified()}>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="form ">
        <div
          style={{
            textAlign: "center",
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
          <div className="button" onClick={refresh}>
            Refresh
          </div>
          <div className="button" onClick={() => sendVerificationEmail()}>
            Resend Verification Email
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
