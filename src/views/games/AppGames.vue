<template>
  <div id="games" class="section">
	<div class="container">
	  <div class="columns">
		<div class="column is-4 is-offset-4">
		  <div class="card">
			<div class="card-image">
			  <figure class="image is-4by3">
				<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
			  </figure>
			</div>
		  </div>
		  <div class="section">
			<h1 class="title">Underdico Games <span class="dot" :class="[serverIsUp ? 'has-background-success' : 'has-background-danger']"></span></h1>
			<h2 class="subtitle notification is-info">
			  Liste des salons actifs
			</h2>

			<div v-if="rooms && rooms.length !== 0" id="list-salon-actif">
			  <ul v-for="(room, index) in rooms" :key="index">
				<router-link tag="li" :to="{ name: 'AppGamesPlayground', params: {id: room.id} }" class="all-room tile notification is-primary">
				  <b-tag :type="room.playersIds.length === room.maxPlayers ? 'is-danger' : 'is-info'" rounded>{{ room.playersIds.length }} / {{ room.maxPlayers }}</b-tag>
				  <p>{{ room.name }}</p>
				</router-link>
			  </ul>
			  <div class="has-text-left">
				<p>Voir plus de salon... </p>
			  </div>
			</div>
			<div v-else>
			  <p class="has-text-left">Pas de salon actif</p>
			</div>
			<section class="section" @click="createRoomModal">
			  <b-button id="open-modal" type="is-success">Créer un nouveau salon</b-button>
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
			rooms: [],
			msg: "Coming soon",
			serverIsUp: false
		}),
		methods: {
			createRoomModal() {
				this.$modal.open({
					component: CreateRoomForm,
					parent: this,
					hasModalCard: true,
					events: {
						createRoom: this.createRoom
					}
				})
			},
			async createRoom(room) {
				Logger('sendRoom : Logger', Store.credentials.token)
				try {
					const headers = {
						token: Store.credentials.token ? Store.credentials.token : undefined
					}
					const {data: result} = await Post(ENDPOINT.ROOM, room, headers)

					Logger('createRoom : result', result)

				} catch (e) {
					Logger('AppGames : SendRoom : Error', e)
				}
			},
			async getAllRooms() {
				try {
					const {data: rooms} = await Get(ENDPOINT.ROOM)

					Logger('AppGames : getAllRooms : rooms', rooms)
					rooms.forEach(room => {
						this.rooms.push(room)
					})
				} catch (e) {
					Logger('AppGames : getAllRooms : Error', e)
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
