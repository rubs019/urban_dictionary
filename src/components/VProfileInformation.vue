<template>
  <div id="ProfileInformations">
	<section>
	  <template v-if="editable">
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
	  </template>
	  <template v-else>
		<div id="identification">
			<div class="has-text-left">
		  <div class="label">Username</div>
		  <div class="text">{{ credentials.username }}</div>
		</div>
		  	<div class="has-text-left">
			<div class="label">Email</div>
			<div class="text">{{ credentials.email }}</div>
		  </div>
		</div>
	  </template>
	</section>
  </div>
</template>

<script>
	import { STATUS } from '../constants'
	import Logger     from "../helpers/logger"

	export default {
		name: "VProfileInformation",
		props: {
			editable: Boolean,
			statusForm: Number,
			credentials: Object
		},
		data: function () {
			return {
				Status: STATUS,
				user: {
					name: this.credentials && this.credentials.username,
					email: this.credentials && this.credentials.email
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
