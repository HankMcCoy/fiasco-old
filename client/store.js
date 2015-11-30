import { createStore, combineReducers } from 'redux'

import dice from './modules/dice'
import players from './modules/players'

export default createStore(combineReducers({
	dice,
	players,
}))
