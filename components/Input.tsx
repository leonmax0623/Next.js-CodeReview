import classNames from 'classnames'
import { ComponentPropsWithoutRef } from 'react'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: React.ReactNode
  hasError?: boolean
  error?: string
}

const styles = {
  baseStyle:
    'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed',
  error:
    '!border-red-300 !text-red-900 !placeholder-red-300 !focus:outline-none !focus:ring-red-500 !focus:border-red-500 pr-10 focus:ring-0',
}

export default function Input({
  name,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  hasError = false,
  error,
  className,
  disabled,
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            'block text-xs font-medium text-mine-shaft first-letter:uppercase',
            hasError && 'text-red-600',
            disabled && 'opacity-50'
          )}
        >
          {label}
        </label>
      )}
      <div
        className={classNames('relative rounded-md shadow-sm', label && 'mt-1')}
      >
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          className={classNames(
            styles.baseStyle,
            hasError && styles.error,
            className
          )}
          placeholder={placeholder}
          onChange={onChange}
          aria-invalid="true"
          aria-describedby={`${type}-error`}
          disabled={disabled}
          {...props}
        />
      </div>
      {hasError && error && (
        <p className="mt-2 text-sm text-red-600" id={`${type}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}
