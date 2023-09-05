import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createSettings } from 'apiSdk/settings';
import { settingsValidationSchema } from 'validationSchema/settings';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { SettingsInterface } from 'interfaces/settings';

function SettingsCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SettingsInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSettings(values);
      resetForm();
      router.push('/settings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SettingsInterface>({
    initialValues: {
      invoice_due_days: 0,
      currency: '',
      timezone: '',
      language: '',
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: settingsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Settings',
              link: '/settings',
            },
            {
              label: 'Create Settings',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Settings
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Invoice Due Days"
            formControlProps={{
              id: 'invoice_due_days',
              isInvalid: !!formik.errors?.invoice_due_days,
            }}
            name="invoice_due_days"
            error={formik.errors?.invoice_due_days}
            value={formik.values?.invoice_due_days}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('invoice_due_days', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.currency}
            label={'Currency'}
            props={{
              name: 'currency',
              placeholder: 'Currency',
              value: formik.values?.currency,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.timezone}
            label={'Timezone'}
            props={{
              name: 'timezone',
              placeholder: 'Timezone',
              value: formik.values?.timezone,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.language}
            label={'Language'}
            props={{
              name: 'language',
              placeholder: 'Language',
              value: formik.values?.language,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/settings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'settings',
    operation: AccessOperationEnum.CREATE,
  }),
)(SettingsCreatePage);
