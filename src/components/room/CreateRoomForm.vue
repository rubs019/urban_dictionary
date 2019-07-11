<template>
  <div class="modal-card" style="width: auto">
	<header class="modal-card-head">
	  <p class="modal-card-title">Créer une room</p>
	</header>
	<section class="modal-card-body">
	  <form>
		<b-field label="Nom de la Room">
		  <b-input v-model="room.name"></b-input>
		</b-field>

		<b-field label="Nombre de joueurs maximum">
		  <b-select placeholder="Select a name" v-model="room.maxPlayers">
			<option
					v-for="option in 5"
					:value="option"
					:key="option">
			  {{ option }}
			</option>
		  </b-select>
		</b-field>

		<b-field grouped>
		  <b-field>
			<b-checkbox v-model="room.isPrivate">Privée</b-checkbox>
		  </b-field>

		  <b-field>
			<b-checkbox v-model="room.isRanked">Classée</b-checkbox>
		  </b-field>
		</b-field>
	  </form>
	</section>
	<footer class="modal-card-foot">
	  <button class="button" type="button" @click="$parent.close()">Close</button>
	  <b-button @click="createRoom(room)" native-type="submit" class="button is-success">Créer un nouveau salon
	  </b-button>
	</footer>
  </div>
</template>

<script>
	export default {
		name: "CreateRoomForm",
		data: () => ({
			room: {
				name: null,
				maxPlayers: 1,
				isPrivate: false,
				isRanked: false,
				locale: 'fr'
			}
		}),
		methods: {
			createRoom: function (room) {
				this.$emit('createRoom', room)
			}
		}
	}
</script>

<style scoped>

</style>
