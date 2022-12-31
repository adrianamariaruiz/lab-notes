
export const ErroresFirebase = (code) => {
    switch(code){
        case 'auth/email-already-in-use': 
            return 'El email ya existe'
        case 'auth/invalid-email': 
            return 'Formato de email invalido'
        case 'auth/user-not-found':
            return 'El usuario no existe'
        case 'auth/wrong-password':
            return 'Contraseña incorrecta'
        default: 
            return 'Ocurrió un error en el servidor'

    }
}
