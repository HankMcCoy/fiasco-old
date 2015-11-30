import _ from 'lodash'

import createReducer from '../../util/create-reducer'

const ADD_PLAYER = 'players/ADD_PLAYER'
const REMOVE_PLAYER = 'players/REMOVE_PLAYER'
const UPDATE_PLAYER = 'players/UPDATE_PLAYER'
const UPDATE_ALL_PLAYERS = 'players/UPDATE_ALL_PLAYERS'

export default createReducer([], {
	[ADD_PLAYER]: (state, player) => state.concat(player),
	[REMOVE_PLAYER]: (state, player) => {
		return _.remove(state, p => p.id === player.id)
	},
	[UPDATE_PLAYER]: (state, player) => {
		const idx = _.findIndex(state, p => p.id === player.id)

		return [
			...state.slice(0, idx),
			player,
			...state.slice(idx + 1),
		]
	},
	[UPDATE_ALL_PLAYERS]: (state, players) => players,
})

export function addPlayer(player) {
	return { type: ADD_PLAYER, payload: player }
}

export function removePlayer(player) {
	return { type: REMOVE_PLAYER, payload: player }
}

export function updatePlayer(player) {
	return { type: UPDATE_PLAYER, payload: player }
}

export function updateAllPlayers(players) {
	return { type: UPDATE_ALL_PLAYERS, payload: players }
}
