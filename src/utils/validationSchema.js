import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  username: yup
    .string()
    .nullable()
    .required('Required field')
    .min(8, 'Minimum length is 8 characters')
    .max(16, 'Maximum length is 16 characters'),
  email: yup.string().nullable().required('Required field').email('Invalid email type'),
  country: yup.object().shape({
    id: yup.number(),
    name: yup.string().required('Required field'),
  }),
  password: yup
    .string()
    .nullable()
    .required('Required field')
    .min(8, 'Minimum length is 8 characters')
    .max(16, 'Maximum length is 16 characters'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required('Required field'),
});
