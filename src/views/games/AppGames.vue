<template>
  <div id="games" class="section">
	<div class="container">
	  <div class="columns">
		<div class="column is-4 is-offset-4">
		  <div class="section">
			<h1 class="title">Underdico Games <span class="dot"
													:class="[serverIsUp ? 'has-background-success' : 'has-background-danger']"></span>
			</h1>
			<div class="notification is-info">
			  <h2 class="subtitle">
				{{ $t('game.listRoomActive') }}
			  </h2>
			</div>
			<span v-on:click="getAllRooms">
				<b-button :loading="loader.status" :disabled="!loader.active" type="is-info" size="is-small">{{ loader.text }}</b-button>
			</span>

			<div v-if="rooms && rooms.length !== 0" id="list-salon-actif">
			  <ul v-for="(room, index) in rooms" :key="index">
				<li class="all-room tile notification is-primary" v-on:click="goToGamePlayground(room)">
				  <b-tag :type="room.playersIds.length === room.maxPlayers ? 'is-danger' : 'is-info'" rounded>{{
					room.playersIds.length }} / {{ room.maxPlayers }}
				  </b-tag>
				  <p>{{ room.name }}</p>
				</li>
			  </ul>
			  <div class="has-text-left">
				<p>{{ $t('game.showMoreRoom') }} </p>
			  </div>
			</div>
			<div v-else>
			  <p class="subtitle">{{ $t('game.noActiveRoom') }}</p>
			  <p v-if="!store.state.isConnected">{{ $t('game.unConnectedUserMessage') }}</p>
			</div>
			<section class="section" @click="createRoomModal" v-if="store.state.isConnected">
			  <b-button id="open-modal" type="is-success">{{ $t('game.createRoom') }}</b-button>
			</section>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
	import CreateRoomForm from '../../components/room/CreateRoomForm'
	import { Post, Get }  from "../../services/api.service"
	import Logger         from "../../helpers/logger"
	import { ENDPOINT }   from "../../constants"
	import Store          from "../../store"
	import helpers        from "../../helpers"

	export default {
		name: "AppGames",
		data: () => ({
			store: Store,
			rooms: [],
			msg: "Coming soon",
			serverIsUp: false,
			myCreateRoomModal: null,
			roomPrivateModalInfo: null,
			loader: {
				status: false,
				text: 'refresh',
				active: true
			}
		}),
		methods: {
			goToGamePlayground(room) {
				if (!room) {
					helpers.errorToast('Impossible de récupérer les informations de la room')
					Logger('AppGames : GoToGamePlayground : error', room)
				}
				Logger('goToGamePlayground', room)
				this.$localStorage.set('room', JSON.stringify(room))
				this.$router.push('/games/' + room.id)
			},
			createRoomModal() {
				this.myCreateRoomModal = this.$modal.open({
					component: CreateRoomForm,
					parent: this,
					hasModalCard: true,
					events: {
						createRoom: this.createRoom
					}
				})
			},
			createRoomPrivateModalInfo(data) {
				this.roomPrivateModalInfo = this.$modal.open(
					`<div class="notification is-info">
						<p>Code : ${data.code}</p>
						<p>URL à partager : /games/private/${data.id}?code=${data.code}</p>
					</div>`
				)
			},
			async createRoom(room) {
				Logger('createRoom : ', room)
				try {
					const {data: result} = await Post(ENDPOINT.ROOM, room)
					this.$localStorage.set('room', JSON.stringify(result))
					// SI c privée
					if (result.isPrivate) {
						// stock ma room

						this.myCreateRoomModal.close()

						this.createRoomPrivateModalInfo(result)

						Logger('createRoom private: result', result)

						this.$router.push('/games/' + result.id)

						return
					}
					// je les affiches a l'utilisateur

					Logger('createRoom : result', result)

					this.myCreateRoomModal.close()

					this.$router.push('/games/' + result.id)
				} catch (e) {
					this.myCreateRoomModal.close()
					helpers.errorToast(this, "Une erreur s'est produite lors de la création de la room")
					Logger('AppGames : SendRoom : Error', e)
				}
			},
			async getAllRooms() {
				this.loader.status = true
				this.loader.active = false
				try {
					const {data: rooms} = await Get(`${ENDPOINT.ROOM}`)

					Logger('AppGames : getAllRooms : rooms', rooms)
					this.rooms = rooms
					this.loader.status = false
					this.loader.text = 'Up to date'
					const that = this
					setTimeout(() => {
						that.loader.text = 'Refresh'
						that.loader.active = true
					}, 5000)
				} catch (e) {
					Logger('AppGames : getAllRooms : Error', e.response)
					this.loader.status = false
				}
			}
		},
		async created() {
			await this.getAllRooms()
		}
	}
</script>

<style scoped>
  #open-modal:hover, .all-room:hover {
	cursor: pointer;
  }

  li {
	margin-bottom: 5px;
  }

  .all-room p {
	margin-left: 5px;
  }

  .dot {
	height: 15px;
	width: 15px;
	background-color: #bbb;
	border-radius: 50%;
	display: inline-block;
  }
</style>
