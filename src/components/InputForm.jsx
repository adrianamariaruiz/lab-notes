// uso el forwardRef porque necesito acceder a todo el ...register del useForm 
// como el props es un objeto, lo puedo desestructurar

import { forwardRef } from "react"

const InputForm = forwardRef(({type, placeholder, onChange, onBlur, name, children}, ref) => {
  return (
    <>
        <input 
            type={type}
            placeholder={placeholder}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
        />
        {children}
    </>
  )
}
)

export default InputForm