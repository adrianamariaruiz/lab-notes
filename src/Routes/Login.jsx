import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ErrorsForm from '../components/ErrorsForm'
import InputForm from '../components/InputForm'
import Title from '../components/Title'
import { UserContext } from '../context/UserProvider'
import { ErroresFirebase } from '../utils/ErroresFirebase'
import { ValidateForm } from '../utils/ValidateForm'
import LoadingSvg from '../components/LoadingSvg'

const Login = () => {

  const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm()
  const { loginUser } = useContext(UserContext)
  const navegate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {required, patternEmail, minLength, validateTrim} = ValidateForm()

  const onSubmit = async (data) => {
    console.log(data.email, data.password)
    try {
        await loginUser(data.email, data.password)
        console.log('usuario logeado')
        setLoading(true)
        navegate('/')
    } catch (error) {
        console.log(error.code)
        const {code, message} = ErroresFirebase(error.code)
        setError(code, {message})
    } finally {
        setLoading(false)
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
        label="Ingreser el email"
        error={errors.email}
    />
    <ErrorsForm error={errors.email}/>

    <InputForm 
        type="password" 
        placeholder="ingrese el password" 
        {...register('password', {
            minLength,
            validate: validateTrim
        })}
        label="Ingreser la contraseña"
        error={errors.password}
    />
    <ErrorsForm error={errors.password}/>

    <Button text='Acceder' type='submit'/>
    
    {
        loading && <LoadingSvg/>
    }
    
    </form>
    </>
  )
}

export default Login