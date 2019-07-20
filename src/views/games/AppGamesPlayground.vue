<template>
  <div>
	<div class="section">
	  <h1 class="title">Game playground
		<span class="dot" :class="[server.status ? 'has-background-success' : 'has-background-danger']"></span>
	  </h1>
	  <!--        <b-button :disabled="!serverIsUp">leaveRoom</b-button>
				  <b-button v-on:click="disconnect" :disabled="!serverIsUp">disconnect</b-button>-->
	</div>
	<div class="container is-fluid">
	  <div class="columns">
		<div id="user-container" class="column is-3">
		  <b-message type="is-success">
			Connecté en tant que {{ Storage.credentials.username }}
		  </b-message>
		  <div class="tile is-vertical notification has-text-centered">
			<h2 class="title is-4">
			  Liste des joueurs
			</h2>
			<div class="tile" v-if="game && game.connectedUsers">
			  <ul class="has-text-left">
				<li class="username" v-for="(user, index) in game.connectedUsers"
					:key="index">{{ user.username }} ({{ user.score || 0 }})
				</li>
			  </ul>
			</div>
		  </div>
		</div>
		<div id="game-container" class="column is-6 is-size-2">
		  <div class="level">
			<span class="level-left">
			  <b-button :disabled="!server.status" v-on:click="startRoom" class="is-info">Commencer le jeu</b-button>
			</span>
			<span class="level-right">
			  <b-button :disabled="!server.status" v-on:click="leaveRoom" class="is-danger">Quitter la partie</b-button>
			</span>
		  </div>
		  <div id="gameplay">
			<b-message type="is-primary" v-if="game.status">
			  C'est au tour de {{ nextUser }} de jouer
			</b-message>
			<div id="definitionToFind" class="notification is-info">
			  <p id="wordDefinitionItem" class="is-size-5">
				{{ game.definitionToFind || "Le texte va apparaitre ici une fois le jeu lancé"}}
			  </p>
			</div>
			<div id="loader" v-show="game.status">
			  <div class="bar has-background-info"></div>
			</div>
			<div id="obfuscatedWord">
			  <span v-for="(word, index) in game.obfuscatedWord" :key="index" class="obfuscatedSpan">{{ word === null ? '_ ' : word }}</span>
			</div>
		  </div>
		  <div class="section">
			<div id="wordNameItem">
			  <input
					  class="input is-rounded"
					  placeholder="Entrer votre réponse ici"
					  @keydown.enter="sendWordFromUser"
					  v-model="game.wordFromUser">
			</div>
		  </div>
		</div>
		<div id="game-information" class="column is-3">
		  <b-message type="is-info" v-if="room">
			<ul>
			  <li>ID : {{ room.id }}</li>
			  <li>Name: {{ room.name }}</li>
			  <li>Langue: {{ room.locale }}</li>
			  <li>Timeout : {{ room.timeout }} secondes</li>
			  <li>Ranked : {{ room.isRanked }}</li>
			  <li>Private: {{ room.isPrivate }}</li>
			  <li>Status: {{ room.status }}</li>
			  <li>Max players: {{ room.maxPlayers }}</li>
			  <li>Rounds: {{ room.rounds }}</li>
			  <li>usernames: {{ room.usernames }}</li>
			  <li>Players Id: {{ room.playersIds }}</li>
			</ul>
		  </b-message>
		</div>

	  </div>
	</div>
  </div>
</template>

<script>
	import Logger       from "../../services/logger"
	import Store        from "../../store"
	import { Get }      from '../../services/api.service'
	import { ENDPOINT } from '../../constants'
	import helpers      from "../../helpers"

	export default {
		name: "AppGamesPlayground",
		data: function () {
			return {
				Storage: Store,
				server: {
					status: false
				},
				room: {},
				interval: null,
				game: {
					resetTimer: false,
					definitionToFind: null,
					wordFromUser: null,
					obfuscatedWord: null,
					connectedUsers: []
				}
			}
		},
		sockets: {
			connect: function () {
				this.server.status = this.$socket.connected
				Logger('socket connected', this.server.status)
			},
			disconnect: function () {
			},
			error: function (data) {
				Logger('Error', data)
			},
			gameError: function (data) {
				Logger('Error', data)
				if (data && data.response && data.response.message) {
					helpers.errorToast(this, data.response.message)
				} else {
					helpers.errorToast(this, 'Une erreur s\'est produite')
				}
			},
			/**
			 * Event lancer lorsqu'un utilisateur se connecte
			 * Sert à rafraichir la liste des utilisateurs connecté
			 * @param { User } user
			 * */
			newPlayer: async function (user) {
				if (user && user.username) {
					helpers.successToast(this, `${user.username} has been connected`)
				} else {
					helpers.successToast(this, `A new player has been connected`)
				}
				if (!this.game.connectedUsers.find(connectedUser => connectedUser.id === user.id)) {
					this.game.connectedUsers.push(user)
				}

			},
			/**
			 * Event lancer lorsqu'un utilisateur se déconnecte
			 * Sert à supprimer l'utilisateur qui vient de partir de la liste des utilisateurs connecté
			 * @param { User } user - information de l'utilisateur qui vient de déco
			 * */
			playerRemoved: function (user) {
				Logger('PlayerRemoved', user)
				this.handlePlayerRemoved(user)
			},
			/**
			 * Event lancer lorsque la partie débute
			 * @param { User } user - information de l'utilisateur qui vient de déco
			 * */
			roomStarted: function () {
				this.game.status = true
				helpers.successToast(this, 'Game start')
			},
			/**
			 * Event lancer lorsqu'une bonne réponse est soumise
			 * Sert à notifier qu'un utilisateur à entrer une bonne proposition
			 * @param { string } playerId - ID de l'utilisateur qui vient d'émettre la réponse
			 * */
			goodProposal: function ({playerId, playerScore}) {
				this.handleGoodProposal({playerId, playerScore})
			},
			/**
			 * Event lancer lorsqu'une mauvaise réponse est soumise
			 * Sert à notifier qu'un utilisateur à entrer une mauvaise proposition
			 * @param { string } playerId - ID de l'utilisateur qui vient d'émettre la réponse
			 * @param { string } nextPlayerId - ID de l'utilisateur suivant
			 * */
			wrongProposal: function ({playerId, nextPlayerId}) {
				this.handleWrongProposal({playerId, nextPlayerId})
			},
			/**
			 * Event lancer lorsqu'un nouveau round débute
			 * Sert à notifier qu'un utilisateur à entrer une mauvaise proposition
			 * @param {Object} newRound - Contient les méta données du nouveau round
			 * */
			newRound: function (newRound) {
				Logger('newRound|data', newRound)
				this.handleNewRound(newRound)
			},
			timeout: function (data) {
				Logger('timeout', data)
				this.handleTimeout(data)
			},
			exception: function (data) {
				Logger('exception', data)
			}
		},
		methods: {
			connectSocket: function () {
				this.$socket.io.opts = {
					...this.$socket.io.opts,
					query: {
						jwt: this.Storage.credentials.token
					}
				}
				this.$socket.connect()
			},
			joinRoom: function (roomId, code) {
				Logger('JoinRoom')

				this.$socket.emit('joinRoom', {
					roomId,
					code
				})
			},
			startRoom() {
				this.$socket.emit('startRoom', {
					roomId: this.room.id
				})
			},
			play(roomId) {
				this.$socket.emit('play', {
					roomId,
					proposal: this.wordFromUser
				})
			},
			leaveRoom: function () {
				this.$socket.emit('leaveRoom', {
					roomId: this.room.id
				})
				this.disconnect()
				this.$router.push('/games')
			},
			disconnect: function () {
				this.$socket.close()
			},
			handleTimeout({playerId, nextPlayerId}) {
				Logger('Timeout !', {playerId, nextPlayerId})
				helpers.errorToast(this, 'Timeout')
				this.resetLoader()
				this.setTheNextUser(nextPlayerId)
				this.startTimer()
			},
			handlePlayerRemoved(user) {
				if (user && user.username) {
					helpers.errorToast(this, `${user.username} has been disconnected`)
				} else {
					helpers.errorToast(this, `A player has been disconnected`)
				}
				Logger('this.game.connectedUsers', this.game.connectedUsers)
				const index = this.game.connectedUsers.findIndex(connectedUser => {
					return connectedUser.id === user.id
				})
				Logger('index', index)
				this.game.connectedUsers.splice(index, 1)
			},
			handleGoodProposal({playerId, playerScore}) {
				Logger('Good proposal !', playerId)
				const user = this.game.connectedUsers.find(user => user.id === playerId)

				helpers.successToast(this, `Good proposition of ${user.username}`)

				this.resetLoader()
				this.setTheNextUser(user.id)

				// Use to clean input user
				this.game.wordFromUser = null

				// Use to update playerScore
				user.score = playerScore
			},
			handleWrongProposal({playerId, nextPlayerId}) {
				Logger('Wrong proposal !', {playerId, nextPlayerId})
				helpers.errorToast(this, 'Bad proposition')
				this.resetLoader()
				this.setTheNextUser(nextPlayerId)
				this.startTimer()
			},
			/**
			 * Affiche à l'écran la définition et le nombre de lettre à trouver
			 * @param { string } definition - Définition du mot à trouver
			 * @param { string } nextPlayerId - ID de l'utilisateur suivant
			 * @param { Array<null> } obfuscatedWord - Les lettres à trouver correspondant au mots
			 */
			handleNewRound({definition, obfuscatedWord, nextPlayerId}) {
				helpers.successToast(this, `Au suivant !`)
				this.game.definitionToFind = definition
				this.game.obfuscatedWord = [null, null, ' ', 't']
				this.startTimer()
				this.setTheNextUser(nextPlayerId)
			},
			sendWordFromUser: function () {
				Logger(`The word enter is : ${this.game.wordFromUser}`)

				this.$socket.emit('play', {
					roomId: this.room.id,
					proposal: this.game.wordFromUser
				})
			},
			resetLoader() {
				clearInterval(this.interval)
				document.querySelector('.bar').style.width = "0%"
			},
			setTheNextUser: function (playerId) {
				const user = this.game.connectedUsers.find(username => {
					return username.id === playerId
				})
				Logger('setNextUser() = ', user)
				this.nextUser = user.username
			},
			/**
			 * @param {string} roomId - ID provenant du path de l'url
			 * @return {object} | undefined Informations d'une room
			 */
			async fetchRoomInformation(roomId) {
				const {data: rooms} = await Get(ENDPOINT.ROOM)

				return rooms.find(room => room.id === roomId)
			},
			/**
			 * @param {Array} users - Tableau d'utilisateurs
			 * @return {boolean}
			 */
			fillConnectedUser({usernames, playersIds}) {
				if(!Array.isArray(usernames) || usernames.length <= 0) return false
				if(!Array.isArray(playersIds) || playersIds.length <= 0) return false

				let userHasBeenFill = false
				usernames.forEach((username, index) => {
					// Pas besoin de push si le user existe déjà dans la liste
					if (this.game.connectedUsers.find(connectedUser => connectedUser.id === playersIds[index])) {
						return
					}
					this.game.connectedUsers.push({id: playersIds[index], username})
					userHasBeenFill = true
				})
				return userHasBeenFill
			},
			startTimer() {
				const barElement = document.querySelector('.bar')
				if (!this.room.timeout) {
					Logger('timer Error')
					return
				}
				let percentage = 0
				const that = this
				this.interval = setInterval(function() {
					if (percentage > 100) {
						clearInterval(this.interval)
					}

					if (that.resetTimer) {
						percentage = 0
						that.resetTimer = false
					}
					barElement.style.width = `${percentage}%`
					percentage++
				}, 300)
			}
		},
		// Use to create the room
		async created() {
			Logger('AppGamesPlayground : created')
			if (!this.Storage.state.isConnected) {
				helpers.errorToast(this, 'Vous devez être connecté pour accéder à cette page')
				this.$router.push('/games')
				return
			}

			// Peut être déjà connecté dans le cas d'un back dans l'historique
			if (this.$socket.disconnected) {
				this.connectSocket()
			} else {
				this.server.status = true
			}

			Logger('this.$route.path', this.$route)
			const isPrivate = this.$route.path.split('/')[2] === 'private'

			if (isPrivate) {
				const pathId = this.$route.params.id
				const code = this.$route.query.code

				const {data: room} = await Get(`${ENDPOINT.ROOM}/private?code=${code}`)

				if (!room) {
					helpers.errorToast(this, 'Erreur lors de la récupération de la room privée')
					this.$router.push('/games')
				}
				this.room = room
				this.fillConnectedUser(this.room)
				this.joinRoom(pathId, code)

				return
			}

			const roomInStorage = this.$localStorage.get('room', null)
			if (roomInStorage && !isPrivate) {
				try {
					this.room = JSON.parse(roomInStorage)
					// On clean le localStorage, pour ne pas récupérer les info de la room si on se reconnecte
					this.fillConnectedUser(this.room)
					this.$localStorage.remove('room')
				} catch (error) {
					helpers.errorToast(this, 'Erreur lors de la récupération de la room (cache)')
					this.$router.push('/games')
					return
				}
			} else if (!isPrivate) {
				try {
					Logger('this.$route.params.id', this.$route.params.id)
					const pathId = this.$route.params.id
					const room = await this.fetchRoomInformation(pathId)

					Logger('fetchRoomInformation', room)

					if (!room) throw Error('Room is empty')

					if (!this.fillConnectedUser(room)) {
						Logger('Cannot fill user connected')
					}

					Logger('this.game.connectedUsers', this.game.connectedUsers)
					this.room = room
				} catch (error) {
					helpers.errorToast(this, 'Aucune room n\'a été trouvé')
					Logger('AppGamesPlayground : Created : Error', error)
					this.$router.push('/games')
					return
				}
			}

			this.joinRoom(this.room.id, this.room.code)
		}
	}
</script>

<style scoped lang="scss">
  ul {
	width: 100%;

	li.usernames {
	  cursor: pointer;
	  padding: 10px;
	  font-weight: bold;
	}
  }
  .user-active {
	background-color: #c2ec72;
  }
  .dot {
	height: 15px;
	width: 15px;
	background-color: #bbb;
	border-radius: 50%;
	display: inline-block;
  }
  .bar, #loader {
	border-radius: 20px;
  }
  #loader {
	width: 100%;
	border: 1px solid lightgray;
  }
  .bar {
	width: 0%;
	height: 20px;
  }
  .obfuscatedSpan {
	display: inline-block;
	margin: 0 10px;
  }
</style>
