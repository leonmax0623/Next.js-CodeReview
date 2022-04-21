import classNames from 'classnames'
import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function AuthenticationLayout({ children, className }: Props) {
  return (
    <div
      className={classNames('h-screen flex flex-col justify-center', className)}
    >
      <div className="mx-auto max-w-md w-full space-y-8">{children}</div>
    </div>
  )
}
