import { createContext, useContext, useEffect, useState } from "react"
import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
  db,
} from "../firebase/firebaseConfig"

import { ref, child, get, set } from "firebase/database"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth"

const userAuthContext = createContext()
export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("")

  const addUser = async (userDetails) => {
    // Add User
    const key = userDetails.email.replaceAll(".", "_")
    get(child(ref(db, "users"), key)).then((snapshot) => {
      if (snapshot.exists()) {
        alert("User Exists")
      } else {
        const nodeRef = child(ref(db, "users"), key)
        set(nodeRef, { ...userDetails })
        setCurrentUser(userDetails.email)
      }
    })
  }
  const setCurrentUser = async (email) => {
    const key = email.replaceAll(".", "_")
    get(child(ref(db, "users"), key)).then((snapshot) => {
      if (!snapshot.exists()) {
        alert("User Not Exists")
      } else {
        const nodeRef = ref(db, "currentUser")
        const phone = snapshot.val().mobile
        set(nodeRef, { phone })
      }
    })
  }

  const signUp = (email, password, mobile) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (user) => {
        if (user.user && user.user.emailVerified === false) {
          sendEmailVerification(user.user)
          console.log("Verification Email Sent")
        }
        addUser({ email, mobile })
      }
    )
  }

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
  }

  const signInWithFacebook = async () => {
    await signInWithPopup(auth, facebookAuthProvider).then((user) => {
      if (user.user && user.user.emailVerified === false) {
        sendEmailVerification(user.user)
        console.log("Verification Email Sent")
      }
    })
  }

  const login = (email, password) => {
    setCurrentUser(email)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signOutGoogle = async () => {
    await signOut(auth)
  }

  const sendVerificationEmail = () => {
    if (user && user.emailVerified === false) {
      sendEmailVerification(user)
      console.log("Verification Email Sent")
    }
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
      value={{
        user,
        signUp,
        login,
        signOut: signOutGoogle,
        signInWithGoogle,
        signInWithFacebook,
        sendVerificationEmail,
      }}
    >
      {children}
    </userAuthContext.Provider>
  )
}
export const useUserAuth = () => {
  return useContext(userAuthContext)
}
