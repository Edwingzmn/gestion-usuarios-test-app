import * as yup from 'yup'

export const userSchema = yup.object().shape({
  nombre: yup.string().required('Nombre es requerido').matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'Solo se permiten letras en el nombre'),
  apellidoPaterno: yup.string().required('Apellido paterno es requerido').matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'Solo se permiten letras en el apellido paterno'),
  apellidoMaterno: yup.string().required('Apellido materno es requerido').matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'Solo se permiten letras en el apellido materno'),
  email: yup.string().required('Email es requerido').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Formato de email inválido'),
  fechaNac: yup.string().required('Fecha de nacimiento es requerida').matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato debe ser AAAA-MM-DD').test('noFutura', 'La fecha no debe ser futura', (value) => {if (!value) return false; const selectDate = new Date(value); const today = new Date(); return selectDate <= today; }),
  datos: yup.object().shape({
    calle: yup.string().required('Calle es requerida').matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s-]+$/, 'Solo se permiten letras y números en la calle'),
    numero: yup.string().required('Número es requerido').matches(/^[0-9]+$/, 'Solo se permiten números'),
    colonia: yup.string().required('Colonia es requerida'),
    delegacion: yup.string().required('Alcaldía es requerida'),
    estado: yup.string().required('Estado es requerido').matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'Solo se permiten letras en el estado'),
    cp: yup.string().required('Código postal es requerido').matches(/^[0-9]{5}$/, 'El código postal debe tener 5 dígitos'),
    imagen: yup.string()
  })
});