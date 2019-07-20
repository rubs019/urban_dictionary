<template>
  <div class="modal-card" style="width: auto">
	<header class="modal-card-head">
	  <p class="modal-card-title">{{ $t('game.createRoom') }}</p>
	</header>
	<section class="modal-card-body">
	  <form>
		<b-field :label="$t('game.roomName')">
		  <b-input v-model="room.name" rounded></b-input>
		</b-field>

		<b-field grouped>
		  <b-field :label="$t('game.maxRoomPlayer')">
			<b-select :placeholder="$t('game.selectName')" v-model="room.maxPlayers" rounded>
			  <option
					  v-for="(option, index) in totalMaxPlayer"
					  :value="option"
					  :key="index">
				{{ option }}
			  </option>
			</b-select>
		  </b-field>

		  <b-field label="Language">
			<b-select rounded v-model="room.locale">
			  <option value="fr">Francais</option>
			  <option value="en">English</option>
			</b-select>
		  </b-field>
		</b-field>

		<b-field grouped>
		  <b-field>
			<b-checkbox v-model="room.isPrivate">{{ $t('game.private') }}</b-checkbox>
		  </b-field>

		  <b-field>
			<b-checkbox v-model="room.isRanked">{{ $t('game.ranked') }}</b-checkbox>
		  </b-field>
		</b-field>
	  </form>
	</section>
	<footer class="modal-card-foot">
	  <button class="button" type="button" @click="$parent.close()">{{ $t('message.close') }}</button>
	  <b-button @click="createRoom(room)" native-type="submit" class="button is-success">{{ $t('game.createRoom') }}
	  </b-button>
	</footer>
  </div>
</template>

<script>
  	import Store from "../../store"
	export default {
		name: "CreateRoomForm",
		data: () => ({
			totalMaxPlayer: 20,
			room: {
				name: null,
				maxPlayers: 1,
				isPrivate: false,
				isRanked: false,
				locale: Store.credentials.locale
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
