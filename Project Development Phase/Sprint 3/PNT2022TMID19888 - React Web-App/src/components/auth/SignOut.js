import { useNavigate } from "react-router-dom"
import { useUserAuth } from "../../context/UserAuthContext"

const SignOut = () => {
  const navigate = useNavigate()
  const { user, signOut } = useUserAuth()
  return (
    <>
      <div className={`signout ${!user && "hidden"}`} onClick={signOut}>
        SignOut
      </div>
      <div
        className={`request ${!user && "hidden"}`}
        onClick={() => navigate("/service_request")}
      >
        Service
      </div>
    </>
  )
}

export default SignOut
