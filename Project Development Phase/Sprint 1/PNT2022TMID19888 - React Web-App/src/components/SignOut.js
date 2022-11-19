import { useUserAuth } from "../context/UserAuthContext"
import "./styles.css"

const SignOut = () => {
  const { user, signOut } = useUserAuth()
  return (
    <div className={`signout ${!user && "hidden"}`} onClick={signOut}>
      SignOut
    </div>
  )
}

export default SignOut
