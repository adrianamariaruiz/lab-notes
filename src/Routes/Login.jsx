import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/UserProvider'

const Login = () => {

    const {user, setUser} = useContext(userContext)
    const navigate = useNavigate()
    
    const handleClickLogin = () => {
        setUser(true)
        navigate('/')
    }

  return (
    <>
    <h1>Login</h1>
    <h2>
        {
            user ? 'onLine' : 'offLine'
        }
    </h2>
    <button onClick={handleClickLogin}>Acceder</button>
    </>
  )
}

export default Login