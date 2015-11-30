import React from 'react'
import { Router, Route, Redirect } from 'react-router'

import SignIn from './pages/sign-in'
import GameRoom from './pages/game-room'
import history from './history'

const App = () => (
	<Router history={history}>
		<Redirect from="/" to="/signin" />
		<Route path="/signin" component={SignIn} />
		<Route path="/room/:gameId" component={GameRoom} />
	</Router>
)

export default App
