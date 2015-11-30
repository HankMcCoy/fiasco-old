import React from 'react'
import { Block } from 'jsxstyle'

import Die from './components/die'

const GameRoom = ({ dice, players, onRoll }) => (
	<Block>
		{players.map(p => p.name).join(', ')}
		{dice.map((die, idx) => <Die {...die} key={idx} />)}
		<button onClick={onRoll}>
			Roll
		</button>
	</Block>
)

export default GameRoom
