import React from 'react'
import { Block } from 'jsxstyle'

const SignIn = ({ onJoin }) => (
	<form onSubmit={onJoin}>
		<h1>Join a room</h1>
		<label>
			Name
			<input type="text" name="name" />
		</label>
		<label>
			Room ID
			<input type="text" name="id" />
		</label>
		<input type="submit" value="Join" />
	</form>
)

export default SignIn
