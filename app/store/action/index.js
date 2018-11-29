// Action
export const UnfoldAction = 'UnfoldAction'

export const unfoldAction = (payload) => {
  console.log(payload)
  return {
    type: UnfoldAction,
    payload
  }
}