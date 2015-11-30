import io from 'socket.io-client'

import {
	addPlayer,
	removePlayer,
	updateAllPlayers,
} from './modules/players'
import { updateDice } from './modules/dice'
import store from './store'

const socket = io()

function bind(actionCreator) {
	return (...args) => store.dispatch(actionCreator(...args))
}

socket.on('DICE_UPDATE', bind(updateDice))
socket.on('PLAYER_JOINED', bind(addPlayer))
socket.on('PLAYER_LEFT', bind(removePlayer))
socket.on('PLAYERS', bind(updateAllPlayers))

export default socket
