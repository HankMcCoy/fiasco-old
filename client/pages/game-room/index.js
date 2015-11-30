import React, { Component } from 'react'
import { connect } from 'react-redux'

import GameRoom from './game-room'
import socket from '../../socket'
import history from '../../history'

class GameRoomContainer extends Component {
	constructor() {
		super()
	}

	render() {
		return <GameRoom onRoll={this.handleRoll} {...this.props} />
	}

	componentDidMount() {
		const name = localStorage.getItem('fiasco:name')
		const { gameId } = this.props.params

		if (name) {
			socket.emit('JOIN', {
				name,
				gameId,
			})

			socket.emit('GET_PLAYERS', gameId)
		} else {
			history.pushState('/signin')
		}
	}

	handleRoll = () => {
		socket.emit('ROLL', this.props.params.gameId)
	}
}

export default connect(
	state => ({
		players: state.players,
		dice: state.dice,
	})
)(GameRoomContainer)
