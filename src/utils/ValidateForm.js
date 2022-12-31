
export const ValidateForm = (getValues) => {
  return (
    {
        required: {
            value: true,
            message: 'Debe completar este campo'
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: 'Formato de email inválido'
        },
        minLength: {
            value: 6,
            message: 'Debe tener mínimo 6 caracteres'
        },
        validateTrim: {
            trim: (val) => {
                if(!val.trim()){
                    return 'No se permiten espacios en blanco';
                }
                return true;
            }
        },
        validateEquals(getValues) {
            return {
                equals: val => val === getValues('password') || 'No coinciden las contraseñas'
            }
        }
    }
  )
}
