import Link from 'next/link'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid'

import Button from 'components/Button'
import Input from 'components/Input'
import AuthenticationLayout from 'layout/Authentication'
import { useRouter } from 'next/router'
import { SignUpInputType } from 'types/user'
import { useSnackbar } from 'context/SnackbarProvider'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Please enter your password'),
})

const useForm = () => {
  const Router = useRouter()
  const showSnackbar = useSnackbar()

  const { mutate } = useMutation(
    async (values: SignUpInputType) => {
      const { first_name, last_name, email, password } = values
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/signup/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ first_name, last_name, email, password }),
        }
      )
      const isSuccess = response.status === 201

      if (!isSuccess) {
        throw new Error('Something went wrong!')
      }
    },
    {
      onSuccess: () => {
        Router.push('/authentication/sign-in')
        showSnackbar({
          text: 'You have successfully signed up!',
          variant: 'success',
          key: 'sign-up-success',
          dismissible: true,
          icon: CheckCircleIcon,
        })
      },
      onError: () => {
        showSnackbar({
          text: 'Something went wrong!',
          variant: 'error',
          key: 'sign-up-error',
          dismissible: true,
          icon: ExclamationIcon,
        })
      },
    }
  )
  return useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        mutate({
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
        })
      } catch (error) {
        console.error(error)
      }
    },
  })
}

const SignUp = () => {
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    isSubmitting,
  } = useForm()
  return (
    <AuthenticationLayout>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="flex items-start space-x-4">
          <fieldset className="w-full">
            <Input
              label="First Name"
              name="firstName"
              type="text"
              value={values.firstName}
              onChange={handleChange}
              hasError={touched.firstName && !!errors.firstName}
              error={errors.firstName}
              onBlur={handleBlur}
            />
          </fieldset>
          <fieldset className="w-full">
            <Input
              label="Last Name"
              name="lastName"
              type="text"
              value={values.lastName}
              onChange={handleChange}
              hasError={touched.lastName && !!errors.lastName}
              error={errors.lastName}
              onBlur={handleBlur}
            />
          </fieldset>
        </fieldset>
        <fieldset>
          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            hasError={touched.email && !!errors.email}
            error={errors.email}
            onBlur={handleBlur}
          />
        </fieldset>
        <fieldset>
          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            hasError={touched.password && !!errors.password}
            error={errors.password}
            onBlur={handleBlur}
          />
        </fieldset>
        {/* <Link href="/" passHref> */}
        <Button
          type="submit"
          variant="primary"
          className="w-full flex justify-center"
          disabled={Object.keys(errors).length > 0}
          loading={isSubmitting}
        >
          {/* TODO: should be deleted after integrating the api */}
          <a>Sign Up</a>
        </Button>
        {/* </Link> */}
        <div className="flex justify-end">
          <Link href="/authentication/sign-in">
            <a className="text-sm font-medium text-gray-600">
              Already have an account? Sign in
            </a>
          </Link>
        </div>
      </form>
    </AuthenticationLayout>
  )
}

export default SignUp
