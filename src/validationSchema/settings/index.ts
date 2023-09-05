import * as yup from 'yup';

export const settingsValidationSchema = yup.object().shape({
  invoice_due_days: yup.number().integer().required(),
  currency: yup.string().required(),
  timezone: yup.string().required(),
  language: yup.string().required(),
  company_id: yup.string().nullable().required(),
});
