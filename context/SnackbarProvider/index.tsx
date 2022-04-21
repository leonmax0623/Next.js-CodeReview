import { createContext, ReactNode, useCallback, useContext, useEffect, useReducer, useRef } from 'react'
import Snackbar, { SnackType } from 'components/Snackbar'
import reducer, { ActionType } from './reducer'

const SNACKBAR_DEFAULT_DURATION = 3500
const SnackbarContext = createContext<{
  queue: SnackType[]
  dispatch: React.Dispatch<ActionType>
}>({
  queue: [],
  dispatch: () => {},
})

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [{ queue, current, open }, dispatch] = useReducer(reducer, {
    current: null,
    open: false,
    queue: [],
  })

  useEffect(() => {
    if (queue.length && !current) {
      // Set a new snack when we don't have an active one
      dispatch({ type: 'OPEN' })
    }
  }, [current, open, queue.length])

  const callbackRefs = useRef({
    handleClose: () => dispatch({ type: 'CLOSE' }),
    handleLeave: () => dispatch({ type: 'CLEAR_CURRENT' }),
  })

  return (
    <SnackbarContext.Provider value={{ queue, dispatch }}>
      <Snackbar
        open={open}
        key={current?.key}
        text={current?.text}
        icon={current?.icon}
        actions={current?.actions}
        dismissible={current?.dismissible}
        disableAutoHide={current?.disableAutoHide}
        handleClose={callbackRefs.current.handleClose}
        handleLeave={callbackRefs.current.handleLeave}
        duration={SNACKBAR_DEFAULT_DURATION}
        variant={current?.variant}
      />
      {children}
    </SnackbarContext.Provider>
  )
}

type SnackbarProviderProps = { children: ReactNode }

export const useSnackbar = () => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar was called outside SnackbarProvider')
  }
  const { dispatch } = context

  return useCallback(
    (snack: SnackType) => {
      dispatch({ type: 'ADD_SNACK', payload: { snack } })
    },
    [dispatch],
  )
}

export default SnackbarProvider
