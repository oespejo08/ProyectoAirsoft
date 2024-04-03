import * as yup from 'yup'

export const loginValidationSchena = yup.object().shape({
    email: yup
    .string()
    .email('Escribe un mail valido')
    .required('E-mail Requerido!!'),

password: yup
    .string()
    .min(5, 'Muy corta!!!')
    .required('Contraseña requerida')

})