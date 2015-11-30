import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import SignIn from './sign-in'
import socket from '../../socket'

class SignInContainer extends Component {
	constructor() {
		super()
	}

	render() {
		return <SignIn onJoin={this.handleJoin} />
	}

	handleJoin = (submitEvent) => {
		submitEvent.preventDefault()

		const { history } = this.props
		const rootEl = ReactDOM.findDOMNode(this)
		const name = rootEl.querySelector('input[name="name"]').value
		const id = rootEl.querySelector('input[name="id"]').value

		localStorage.setItem('fiasco:name', name)
		history.pushState(null, `/room/${id}`)
	}
}

export default SignInContainer
