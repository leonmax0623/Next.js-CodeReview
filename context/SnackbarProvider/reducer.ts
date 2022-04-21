import { SnackType } from 'components/Snackbar'

type StateType = {
  open: boolean
  current: SnackType | null
  queue: SnackType[]
}

export type ActionType =
  | { type: 'ADD_SNACK'; payload: { snack: SnackType } }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'CLEAR_CURRENT' }

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'ADD_SNACK': {
      // we check if snack is alreayd in queue
      // if so we don't need to show the same one
      const isInQueue = state.queue.some((snack) => snack.key === action.payload.snack.key)
      if (isInQueue) return state
      return {
        ...state,
        // we close previous snack when we have a new one
        open: false,
        queue: state.queue.concat(action.payload.snack),
      }
    }
    case 'OPEN':
      if (!state.queue.length) return state
      return {
        ...state,
        open: true,
        current: state.queue[0],
        queue: state.queue.slice(1),
      }
    case 'CLOSE':
      return {
        ...state,
        open: false,
      }
    case 'CLEAR_CURRENT':
      return {
        ...state,
        open: false,
        current: null,
      }
    default:
      throw new Error('Unknown action type')
  }
}

export default reducer
