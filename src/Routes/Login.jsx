import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

const Login = () => {

  const [email, setEmail] = useState('prueba1@prueba.com')
  const [password, setPassword] = useState('123456')

  const { loginUser } = useContext(UserContext)
  const navegate = useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault()
      console.log('probando login ', email, password)
      try {
          await loginUser(email, password)
          console.log('login exitoso')
          navegate('/')
      } catch (error) {
          console.log(error.code)
      }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
    <input 
      type='email'
      placeholder='escriba el email'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
    />
    <input 
      type='password'
      placeholder='escriba el password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
    />
    <button type='submit'>Acceder</button>
    </form>
    </>
  )
}

export default Login