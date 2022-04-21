import LoadingSVG from 'assets/icons/LoadingSVG'
import classNames from 'classnames'
import { ComponentPropsWithRef, ReactNode } from 'react'

interface Props extends ComponentPropsWithRef<'button'> {
  variant: 'primary' | 'secondary' | 'tertiary'
  loading?: boolean
  children: ReactNode
}

const styles = {
  baseStyle:
    'relative inline-flex items-center px-6 py-2 border text-xs font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
  primary:
    'border-transparent text-white bg-primary hover:bg-blue-800 disabled:bg-primary focus:ring-blue-500',
  secondary:
    'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:bg-white focus:ring-indigo-500',
  tertiary:
    'shadow-none text-black bg-white hover:text-mine-shaft !border-0 !p-0 focus:!ring-0',
}

export default function Button({
  variant,
  className,
  children,
  loading = false,
  disabled = false,
  ...props
}: Props) {
  return (
    <button
      className={classNames(styles.baseStyle, styles[variant], className)}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {/* add loading spinner if loading */}
      {loading && (
        <span className="absolute right-0 ml-1">
          <LoadingSVG className="animate-spin h-5 w-5 text-white" />
        </span>
      )}
    </button>
  )
}
