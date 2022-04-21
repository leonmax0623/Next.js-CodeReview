import { FunctionComponent, ReactNode, SVGProps } from 'react'
import { Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import classNames from 'classnames'

const variants = {
  success: 'bg-secondary',
  error: 'bg-red-400',
}

const Snackbar = ({
  text,
  icon: Icon,
  open,
  duration,
  handleClose,
  handleLeave,
  disableAutoHide = false,
  dismissible = disableAutoHide || false,
  actions = [],
  variant = 'success',
}: SnackbarProps) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (open && !disableAutoHide) {
      timer = setTimeout(() => {
        handleClose()
      }, duration)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [open, disableAutoHide, duration, handleClose])

  return (
    <Transition
      // 'appear' set to 'true' to transition
      // the component the first time it's rendered
      appear={true}
      show={open}
      as={Fragment}
      afterLeave={handleLeave}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-28"
      enterTo="translate-y-0 "
      leave="transition ease-in duration-200"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-28"
    >
      <div className="pointer-events-none z-[1000] fixed bottom-4 right-8">
        <div
          className={classNames(
            variants[variant],
            'text-xs text-white',
            'min-w-[320px] rounded-lg shadow-md',
            'whitespace-nowrap truncate',
            'px-3.5 py-3',
            'flex items-center'
          )}
        >
          {Icon && (
            <span className="text-base mr-4" aria-hidden="true">
              <Icon className="w-3 h-3" />
            </span>
          )}
          <div
            className="flex-grow flex items-center justify-between w-full"
            role="alert"
          >
            <span>{text}</span>

            <div className="space-x-2.5 pointer-events-auto">
              {actions.map(({ name, onClick }) => (
                <button
                  className={classNames(
                    'underline',
                    'ring-gray-600 focus:outline-none focus-visible:ring-2',
                    'cursor-pointer disabled:cursor-not-allowed'
                  )}
                  key={name}
                  onClick={() => {
                    onClick()
                    // we always close after running an action
                    handleClose()
                  }}
                >
                  {name}
                </button>
              ))}
              {/*
                  we should always show dismiss button if snackbar
                  doesn't hide automatically.
                */}
              {disableAutoHide || dismissible ? (
                <button
                  className={classNames(
                    'underline',
                    'ring-gray-600 focus:outline-none focus-visible:ring-2',
                    'cursor-pointer disabled:cursor-not-allowed'
                  )}
                  onClick={handleClose}
                >
                  Dismiss
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export type SnackType = {
  /**
   * snackbar identifier
   */
  key: string
  /**
   * text to show within snackbar
   */
  text: ReactNode
  /**
   * snackbar icon
   */
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>
  /**
   * whether we'd like to show 'dimiss' button
   */
  dismissible?: boolean
  /**
   * We don't allow the snackbar to hide automatically after a period
   */
  disableAutoHide?: boolean

  actions?: {
    name: string
    onClick: () => void
  }[]

  variant?: 'success' | 'error'
}

type SnackbarProps = Omit<SnackType, 'key'> & {
  /**
   * whether to open the snackbar or not
   */
  open: boolean
  /**
   * duration after which we close the snackbar
   */
  duration: number
  /**
   * Function that is run when the snackbar is closed
   * after the duration is finished
   */
  handleClose: () => void
  /**
   * Function that is run after the exit animation is finished
   */
  handleLeave: () => void
}

export default Snackbar
