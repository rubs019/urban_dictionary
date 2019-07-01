<template>
  <div>Game playground</div>
</template>

<script>
	import Logger  from "../../services/logger"
	import Store   from "../../store"
	import * as io from "socket.io-client"

	export default {
		name: "AppGamesPlayground",
		data: () => ({
			socket: io.connect('https://underdico.hdaroit.fr', {
				query: {
					jwt: Store.credentials.token
				}
			})
		}),
		methods: {
			joinRoom(roomId) {
				this.socket.emit('ping')
				this.socket.emit('joinRoom', {
					roomId
				})
			}
		},
		mounted() {
			Logger('this.$vueSocketIo', this.socket)
			Logger('Store.credentials.token', Store.credentials.token)
			this.socket.on('error', error => {
				Logger('Error', error)
			})
			this.socket.on('pong', () => {
				Logger('Ponged')
			})
			this.joinRoom(this.$route.params.id)
            this.socket.on('roomStarted', data => {
              Logger('roomStarted', data)
            })
			this.socket.emit('startRoom', {
				roomId: this.$route.params.id
			})
		}
	}
</script>

<style scoped>

</style>
