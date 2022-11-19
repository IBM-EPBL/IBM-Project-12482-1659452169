import { Outlet, Navigate } from "react-router-dom"
import { useUserAuth } from "../../context/UserAuthContext"

const ProtectedRoute = () => {
  const { user } = useUserAuth()
  return user ? (
    user?.emailVerified ? (
      <Outlet />
    ) : (
      <Navigate to="./verifyemail" />
    )
  ) : (
    <Navigate to="./" />
  )
}

export default ProtectedRoute
