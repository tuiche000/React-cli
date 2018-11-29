import { createStore } from 'redux'
import reducer from '@/store/reducer'
const initValue = {
  collapsed: false,
}
const store = createStore(reducer, initValue)
export default store