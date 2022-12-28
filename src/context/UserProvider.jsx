import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase"

export const UserContext = createContext()

const UserProvider = (props) => {

    const [user, setUser] = useState(false)

    // el onAuthStateChanged es de firebase y me muestra un objeto con la informacion del usuario, va a estar pendiente si el usuario esta o no autenticado
    useEffect(()=>{
      const unsuscribe = onAuthStateChanged(auth, (user) =>{
        console.log(user)
        if(user){
          const {email, photoURL, displayName, uid} = user;
          setUser({email, photoURL, displayName, uid});
        } else {
          setUser(null)
        }
      })
      return () => unsuscribe()
    }, [])

    const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const signOutUser = () => signOut(auth)
  
  return (
   <UserContext.Provider value={{user, setUser, registerUser, loginUser, signOutUser}}>
    {props.children}
   </UserContext.Provider>
  )
}

export default UserProvider