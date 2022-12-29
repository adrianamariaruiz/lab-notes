import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const Register = () => {

    // const [email, setEmail] = useState('prueba1@prueba.com')
    // const [password, setPassword] = useState('123456')
    // /[0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/

    const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm()

    const { registerUser } = useContext(UserContext)
    const navegate = useNavigate()

    // la data es el email y el password
    const onSubmit = async (data) => {
        console.log(data.email, data.password)
        try {
            await registerUser(data.email, data.password)
            console.log('usuario creado')
            navegate('/')
        } catch (error) {
            console.log(error.code)
            switch(error.code){
                case 'auth/email-already-in-use': 
                    setError('email', {
                        message: 'El email ya existe'
                    })
                    break;
                case 'auth/invalid-email': 
                    setError('email', {
                        message: 'Formato de email invalido'
                    })
                    break;
                default: 
                    console.log('Ocurrió un error en el servidor')

            }
        }
    } 

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     console.log('probando handlesubmit ', email, password)
    //     try {
    //         await registerUser(email, password)
    //         console.log('usuario creado')
    //         navegate('/')
    //     } catch (error) {
    //         console.log(error.code)
    //     }
    // }

  return (
    <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                type="email" 
                placeholder="ingrese el email" 
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                {...register('email', {
                    required: {
                        value: true,
                        message: 'Debe completar este campo'
                    },
                    pattern: {
                        value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                        message: 'Formato de email inválido'
                    }
                })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <input 
                type="password" 
                placeholder="ingrese el password" 
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                {...register('password', {
                    minLength: {
                        value: 6,
                        message: 'Debe tener mínimo 6 caracteres'
                    },
                    validate: {
                        trim: (val) => {
                        if(!val.trim()){
                            return 'No se permiten espacios en blanco'
                        }
                        return true
                    }}
                })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <input 
                type="password" 
                placeholder="confirme el password" 
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                {...register('password2', {validate: {
                    equals: val => val === getValues('password') || 'No coinciden las contraseñas'
                }})}
            />
            {errors.password2 && <p>{errors.password2.message}</p>}
            <button type="submit">Register</button>
        </form>
    </>
  )
}

export default Register