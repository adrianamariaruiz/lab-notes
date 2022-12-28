// viene de react router dom

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const RequireAuth = ({children}) => {
  
    const {user, setUser} = useContext(UserContext)
    if(!user){
        return <Navigate to={'/login'}/>
    }

    return (
        children
  )
}

export default RequireAuth