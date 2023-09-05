import * as yup from 'yup';

export const accessValidationSchema = yup.object().shape({
  access_level: yup.string().required(),
  user_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
});
