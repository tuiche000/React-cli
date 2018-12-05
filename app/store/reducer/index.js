import { UnfoldAction } from '@/store/action'
// Reducer
export default (state, action) => {
  const collapsed = state.collapsed
  switch (action.type) {
    case UnfoldAction:
      return { collapsed: !collapsed }
    default:
      return state
  }
}
