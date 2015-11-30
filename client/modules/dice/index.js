import createReducer from '../../util/create-reducer'

const UPDATE = 'dice/UPDATE'

export default createReducer([], {
	[UPDATE]: (state, dice) => dice,
})

export const updateDice = (dice) => ({ type: UPDATE, payload: dice })
