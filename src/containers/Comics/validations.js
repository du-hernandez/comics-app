import * as Yup from 'yup';

export const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Mínimo 5 caracteres')
    .required('Campo obligatorio'),
  id: Yup.string()
    .min(5, 'Mínimo 5 caracteres')
    .required('Campo obligatorio'),
  description: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Campo obligatorio'),
  image: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Campo obligatorio'),
});
