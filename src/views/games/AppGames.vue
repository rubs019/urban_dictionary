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
				<router-link tag="li" :to="{ name: 'AppGamesPlayground', params: {id: room.id} }"
							 class="all-room tile notification is-primary">
				  <b-tag :type="room.playersIds.length === room.maxPlayers ? 'is-danger' : 'is-info'" rounded>{{
					room.playersIds.length }} / {{ room.maxPlayers }}
				  </b-tag>
				  <p>{{ room.name }}</p>
				</router-link>
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
	import Logger         from "../../services/logger"
	import { ENDPOINT }   from "../../constants"
	import Store          from "../../store"

	export default {
		name: "AppGames",
		data: () => ({
			store: Store,
			rooms: [],
			msg: "Coming soon",
			serverIsUp: false,
			myCreateRoomModal: null,
			loader: {
				status: false,
				text: 'refresh',
				active: true
			}
		}),
		methods: {
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
			async createRoom(room) {
				Logger('createRoom : ', room)
				try {
					const { data: result } = await Post(ENDPOINT.ROOM, room)

					// SI c privée
					if(result.isPrivate) {
						// stock ma room
						this.$localStorage.set('privateRoom', JSON.stringify(result))

						this.myCreateRoomModal.close()

						this.$router.push('/games/' + result.code)

						return
					}
					// je les affiches a l'utilisateur

					Logger('createRoom : result', result)

					await this.getAllRooms()

					this.myCreateRoomModal.close()

				} catch (e) {
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
