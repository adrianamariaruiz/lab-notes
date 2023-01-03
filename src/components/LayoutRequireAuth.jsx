// viene de react router dom

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const LayoutRequireAuth = ({children}) => {
  
    const {user, setUser} = useContext(UserContext)
    if(!user){
        return <Navigate to={'/login'}/>
    }

    return (
        <div className="container mx-auto">
            {children}
        </div>
  )
}

export default LayoutRequireAuth