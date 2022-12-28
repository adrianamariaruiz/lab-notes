import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const Register = () => {

    const [email, setEmail] = useState('prueba1@prueba.com')
    const [password, setPassword] = useState('123456')

    const { registerUser } = useContext(UserContext)
    const navegate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('probando handlesubmit ', email, password)
        try {
            await registerUser(email, password)
            console.log('usuario creado')
            navegate('/')
        } catch (error) {
            console.log(error.code)
        }
    }

  return (
    <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                placeholder="ingrese el email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="ingrese el password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    </>
  )
}

export default Register