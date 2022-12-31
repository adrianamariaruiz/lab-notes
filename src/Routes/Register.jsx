import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import {ErroresFirebase} from "../utils/ErroresFirebase"
import {ValidateForm} from "../utils/ValidateForm"
import ErrorsForm from "../components/ErrorsForm"
import InputForm from "../components/InputForm"

const Register = () => {

    // const [email, setEmail] = useState('prueba1@prueba.com')
    // const [password, setPassword] = useState('123456')
    // /[0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/

    const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm()
    const { registerUser } = useContext(UserContext)
    const navegate = useNavigate()
    const {required, patternEmail, minLength, validateTrim, validateEquals} = ValidateForm()

    // la data es el email y el password
    const onSubmit = async (data) => {
        console.log(data.email, data.password)
        try {
            await registerUser(data.email, data.password)
            console.log('usuario creado')
            navegate('/')
        } catch (error) {
            console.log(error.code)
            setError('firebase', {
                message: ErroresFirebase(error.code)
            })
        }              
    } 

  return (
    <>
        <h1>Register</h1>
        <ErrorsForm error={errors.firebase}/>
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
            
            <InputForm 
                type="password" 
                placeholder="confirme el password" 
                {...register('password2', {
                    validate: validateEquals(getValues)})}
            />
            <ErrorsForm error={errors.password2}/>
            <button type="submit">Register</button>
        </form>
    </>
  )
}

export default Register