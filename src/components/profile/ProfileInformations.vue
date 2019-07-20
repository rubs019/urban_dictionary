<template>
  <div id="ProfileInformations">
	<section>
	  <form class="has-text-left" @submit.prevent="$emit('updateUserInformation', user)">
		<b-field :label="$t('form.username')">
		  <b-input v-model="user.name"></b-input>
		</b-field>

		<b-field :label="$t('form.email')">
		  <b-input type="email"
				   v-model="user.email">
		  </b-input>
		</b-field>
		<b-field :label="$t('form.password')">
		  <b-input type="password" v-model="user.pwd"></b-input>
		</b-field>
		<b-field :label="$t('form.confirmPassword')">
		  <b-input type="password" v-model="user.pwd2"></b-input>
		</b-field>
		<div class="has-text-right">
		  <b-button
				  :loading="statusForm === Status.PENDING"
				  native-type="submit" :type="statusForm === Status.ERROR ? 'is-danger' : 'is-primary'"
				  icon-pack="fas" icon-left="paper-plane">{{ $t('form.btnUpdate') }}
		  </b-button>
		</div>
	  </form>
	</section>
  </div>
</template>

<script>
	import { STATUS } from '../../constants'
	import Logger     from "../../services/logger"

	export default {
		name: "ProfileInformations",
		props: {
			statusForm: Number,
			credentials: Object
		},
		data: function () {
			return {
				Status: STATUS,
				user: {
					name: this.credentials.username,
					email: this.credentials.email
				}
			}
		},
		mounted() {
			Logger('this.credentials', this.credentials)
		}
	}
</script>

<style scoped>

</style>
