<template>
  <div id="ProfileInformations">
	<section>
	  <form class="has-text-left" @submit.prevent="$emit('updateUserInformation', user)">
		<b-field label="Name">
		  <b-input v-model="user.name"></b-input>
		</b-field>

		<b-field label="Email">
		  <b-input type="email"
				   v-model="user.email">
		  </b-input>
		</b-field>
		<b-field label="Mot de passe">
		  <b-input type="password" v-model="user.pwd"></b-input>
		</b-field>
		<div class="has-text-right">
		  <b-button native-type="submit" type="is-primary" icon-pack="fas" icon-left="paper-plane">Mettre à jour
		  </b-button>
		</div>
	  </form>
	</section>
  </div>
</template>

<script>
	export default {
		name: "ProfileInformations",
		props: {
			credentials: Object
		},
		data() {
			return {
				name: 'John Silver',
				user: {
					name: this.credentials.username,
					email: this.credentials.email
				}
			}
		}
	}
</script>

<style scoped>

</style>
