import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import {ErroresFirebase} from "../utils/ErroresFirebase"
import {ValidateForm} from "../utils/ValidateForm"
import ErrorsForm from "../components/ErrorsForm"
import InputForm from "../components/InputForm"
import Title from "../components/Title"
import Button from "../components/Button"
import LoadingSvg from "../components/LoadingSvg"

const Register = () => {

    // const [email, setEmail] = useState('prueba1@prueba.com')
    // const [password, setPassword] = useState('123456')
    // /[0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/

    const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm()
    const { registerUser } = useContext(UserContext)
    const navegate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {required, patternEmail, minLength, validateTrim, validateEquals} = ValidateForm()

    // la data es el email y el password
    const onSubmit = async (data) => {
        console.log(data.email, data.password)
        try {
            await registerUser(data.email, data.password)
            console.log('usuario creado')
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
        <Title text='Registro de Usuario'/>
        
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

            <InputForm 
                type="password" 
                placeholder="confirme el password" 
                {...register('password2', {
                    validate: validateEquals(getValues('password'))})
                }
                label="Repita la contraseña"
                error={errors.password2}
            />
            <ErrorsForm error={errors.password2}/>
            
            {
                loading ? (
                <LoadingSvg/>
                ) : (
                    <Button text='Registrarse' type='submit'/>
                )
            }
            
        </form>
    </>
  )
}

export default Register