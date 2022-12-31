// uso el forwardRef porque necesito acceder a todo el ...register del useForm 
// como el props es un objeto, lo puedo desestructurar

import { forwardRef } from "react"

const InputForm = forwardRef(({type, placeholder, onChange, onBlur, name, label, children}, ref) => {
  return (
    <div className="mb-6">
        <label 
          htmlFor="email" 
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {label}
        </label>
        <input 
            type={type}
            placeholder={placeholder}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {children}
    </div>
  )
}
)

export default InputForm