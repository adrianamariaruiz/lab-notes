import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ErrorsForm from '../components/ErrorsForm'
import InputForm from '../components/InputForm'
import Title from '../components/Title'
import { UserContext } from '../context/UserProvider'
import { ErroresFirebase } from '../utils/ErroresFirebase'
import { ValidateForm } from '../utils/ValidateForm'

const Login = () => {

  const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm()
  const { loginUser } = useContext(UserContext)
  const navegate = useNavigate()
  const {required, patternEmail, minLength, validateTrim} = ValidateForm()

  const onSubmit = async (data) => {
    console.log(data.email, data.password)
    try {
        await loginUser(data.email, data.password)
        console.log('usuario logeado')
        navegate('/')
    } catch (error) {
        console.log(error.code)
        const {code, message} = ErroresFirebase(error.code)
        setError(code, {message})
    }              
}

  return (
    <>
    <Title text='Inicio de Sesión'/>
    <form onSubmit={handleSubmit(onSubmit)}>
    <InputForm 
        type="email" 
        placeholder="ingrese el email" 
        {...register('email', {
            required,
            pattern: patternEmail
        })}
    />
    <ErrorsForm error={errors.email}/>

    <InputForm 
        type="password" 
        placeholder="ingrese el password" 
        {...register('password', {
            minLength,
            validate: validateTrim
        })}
    />
    <ErrorsForm error={errors.password}/>

    <Button text='Acceder'/>
    </form>
    </>
  )
}

export default Login