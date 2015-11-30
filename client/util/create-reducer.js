export default function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		const handler = handlers[action.type]

		return typeof handler === 'function' ? handler(state, action.payload) : state
	}
}
