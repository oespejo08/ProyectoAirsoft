import * as yup from 'yup'

export const loginValidationSchena = yup.object().shape({
    usuario: yup
    .string()
    .email('Escribe un usuario valido')
    .required('E-mail Requerido!!'),

password: yup
    .string()
    .min(5, 'Muy corta!!!')
    .required('Contraseña requerida')

})