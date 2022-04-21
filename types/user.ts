export type User = {
  first_name: string
  last_name: string
  email: string
}

export type SignUpInputType = User & {
  password: string
}

export type SignUpResponseType = User

export type SingInInputType = Pick<SignUpInputType, 'email' | 'password'>
