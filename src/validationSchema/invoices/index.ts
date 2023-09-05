import * as yup from 'yup';

export const invoiceValidationSchema = yup.object().shape({
  invoice_number: yup.string().required(),
  date: yup.date().required(),
  amount: yup.number().integer().required(),
  status: yup.string().required(),
  company_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
