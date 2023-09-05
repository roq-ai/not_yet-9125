import * as yup from 'yup';

export const auditLogValidationSchema = yup.object().shape({
  action: yup.string().required(),
  entity: yup.string().required(),
  entity_id: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
