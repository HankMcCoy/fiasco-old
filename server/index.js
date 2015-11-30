'use strict'

const _ = require('lodash')
const express = require('express')
const http = require('http')
const path = require('path')
const socketIo = require('socket.io')
const r = require('rethinkdb')

const app = express()
const server = http.Server(app)
const io = socketIo(server)
const db = r.db('fiasco')

app.use(express.static('public'))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

let dbConn = null
r.connect({ host: 'localhost', port: 28015 }).then((conn) => {
	dbConn = conn
})

io.on('connection', (socket) => {
	socket.on('JOIN', (info) => {
		// Connect the client to the socket.io room for the game
		socket.join(info.gameId)

		run(db.table('players').changes())
			.then((cursor) => {
				// Subscribe the client to any changes in the players for the game
				cursor.each((err, change) => {
					if (change.new_val && !change.old_val) {
						io.to(info.id).emit('PLAYER_JOINED', change.new_val)
					} else if (!change.new_val && change.old_val) {
						io.to(info.id).emit('PLAYER_LEFT', change.old_val)
					} else {
						io.to(info.id).emit('PLAYER_UPDATED', change.new_val)
					}
				})
			})
			.then(() => run(
				// Update the players table when a player joins a game
				db.table('players')
					.insert([{
						id: info.name + ':' + info.gameId,
						gameId: info.gameId,
						name: info.name,
					}], {
						conflict: 'update',
					})
			))
	})

	socket.on('GET_PLAYERS', (gameId) => {
		run(db.table('players').filter({ gameId }))
			.then(cursor => cursor.toArray())
			.then(players => {
				io.to(gameId).emit('PLAYERS', players)
			})
	})

	socket.on('ROLL', (gameId) => {
		const dice = getFiascoDice()

		io.to(gameId).emit('DICE_UPDATE', dice)
	})
})

server.listen(process.env.PORT || 3000, () => {
	console.log('Listening')
})

function getFiascoDice() {
	return getDice(8, 'BLACK').concat(getDice(8, 'WHITE'))
}

function getDice(num, color) {
	return _.times(num, () => {
		return {
			color,
			pips: Math.floor(Math.random() * 6 + 1),
		}
	})
}

function run(query) {
	return new Promise((resolve, reject) => {
		query.run(dbConn, (err, cursor) => {
			if (err) {
				reject(err)
			} else {
				resolve(cursor)
			}
		})
	})
}
