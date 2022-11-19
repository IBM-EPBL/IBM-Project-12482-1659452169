import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase/firebaseConfig.js"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth"

const userAuthContext = createContext()
export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("")
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (user) => {
        if (user.user && user.user.emailVerified === false) {
          sendEmailVerification(user.user)
          console.log("Verification Email Sent")
        }
      }
    )
  }
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signOutGoogle = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <userAuthContext.Provider
      value={{ user, signUp, login, signOut: signOutGoogle }}
    >
      {children}
    </userAuthContext.Provider>
  )
}
export const useUserAuth = () => {
  return useContext(userAuthContext)
}
