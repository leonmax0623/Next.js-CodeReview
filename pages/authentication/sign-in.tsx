import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from 'react-query'

import Button from 'components/Button'
import Input from 'components/Input'
import AuthenticationLayout from 'layout/Authentication'
import { useRouter } from 'next/router'
import { useSnackbar } from 'context/SnackbarProvider'
import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid'
import { SingInInputType } from 'types/user'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
})

const useForm = () => {
  const Router = useRouter()
  const showSnackbar = useSnackbar()
  const { mutate: signIn } = useMutation(
    async (values: SingInInputType) => {
      const { email, password } = values
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/signin/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      )
      const isSuccess = response.status === 200

      if (!isSuccess) {
        throw new Error('Something went wrong!')
      }
    },
    {
      onSuccess: () => {
        Router.push('/')
        showSnackbar({
          text: 'You have successfully signed in!',
          variant: 'success',
          key: 'sign-in-success',
          dismissible: true,
          icon: CheckCircleIcon,
        })
      },
      onError: () => {
        showSnackbar({
          text: 'Invalid email or password',
          variant: 'error',
          key: 'sign-in-error',
          dismissible: true,
          icon: ExclamationIcon,
        })
      },
    }
  )

  return useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signIn(values)
      } catch (error) {
        console.log(error)
      }
    },
  })
}

const SignIn = () => {
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
        <Button
          type="submit"
          variant="primary"
          className="w-full flex justify-center"
          disabled={Object.keys(errors).length > 0}
          loading={isSubmitting}
        >
          <a>Sign In</a>
        </Button>
        <div className="flex justify-end">
          <Link href="/authentication/sign-up" passHref>
            <a className="text-sm font-medium text-gray-600">
              Don&apos;t have an account? Sign up
            </a>
          </Link>
        </div>
      </form>
    </AuthenticationLayout>
  )
}

export default SignIn
