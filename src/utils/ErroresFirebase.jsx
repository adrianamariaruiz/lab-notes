
export const ErroresFirebase = (code) => {
    switch(code){
        case 'auth/email-already-in-use': 
            return {
                code: 'email',
                message: 'El email ya existe'
            }
        case 'auth/invalid-email': 
            return {
                code: 'email',
                message: 'Formato de email invalido'
            }
        case 'auth/user-not-found':
            return {
                code: 'email',
                message: 'El usuario no existe'
            }
        case 'auth/wrong-password':
            return {
                code: 'password',
                message: 'Contraseña incorrecta'
            }
        default: 
            return {
                code: 'email',
                message: 'Ocurrió un error en el servidor'
            }

    }
}
