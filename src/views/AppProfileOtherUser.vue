<template>
  <div id="AppProfile">
	<AppHeroComponent></AppHeroComponent>
	<div class="section">
	  <div class="container">
		<div class="columns">
		  <div class="column is-8">
			<div class="notification is-primary">
			  <p class="title has-text-left">{{ $t('menu_name.otherProfile') }}</p>
			  <div class="notification is-white">
				<ProfileInformations
						:editable="false"
						v-if="user"
						:credentials="user">
				</ProfileInformations>
			  </div>
			</div>
		  </div>
		  <div class="column is-4">
			<div class="tile is-vertical">
			  <div class="tile is-parent">
				<article class="tile is-child notification">
				  <p class="subtitle">{{ $t('message.OtherPictureAbout', {username: user.username}) }}</p>
				  <figure class="image is-4by3">
					<img class="is-rounded"
						 v-if="currentPhoto"
						 :src="currentPhoto">
					<img class="is-rounded" v-else
						 src="http://cdn.onlinewebfonts.com/svg/img_504570.png">
				  </figure>
				</article>
			  </div>
			  <div class="tile is-parent">
				<article class="tile is-child notification is-primary">
				  <p class="subtitle">{{ $t('message.otherActualScore', {username: user.username}) }}</p>
				  <p class="title">
					  <span class="icon">
						  <i class="fas fa-star fa-1x"></i>
					  </span>
					{{ user.karma || 0 }}
				  </p>
				</article>
			  </div>
			  <div class="tile is-parent">
				<article class="tile is-child notification is-primary">
				  <p class="subtitle">{{ $t('message.otherActualKarma', {username: user.username}) }}</p>
				  <p class="title">
					  <span class="icon">
						  <i class="fas fa-star fa-1x"></i>
					  </span>
					{{ user.score || 0 }}
				  </p>
				</article>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
	import Store                          from "../store"
	import { API_PATH, ENDPOINT as PATH } from "../constants"
	import AppHeroComponent               from "../components/AppHeroComponent"
	import ProfileInformations            from "../components/profile/ProfileInformations"
	import Logger                         from "../helpers/logger"
	import { Get }                        from "../services/api.service"

	export default {
		name: "AppProfileOtherUser",
		data: function () {
			return {
				store: null,
				currentPhoto: null,
				user: null
			}
		},
		methods: {
			async fetchUserCredentials() {
				try {
					const { data: user } = await Get(`${PATH.USERS}/${this.$route.params.id}`)

					this.user = user
					this.currentPhoto = `${process.env.VUE_APP_API_PROD}/${API_PATH.USER_AVATAR(this.user.id)}`
				} catch (err) {
					Logger('AppProfile : fetchUserCredentials', err.response)
				}
			}
		},
		components: {AppHeroComponent, ProfileInformations},
		beforeCreate() {
			if (!Store.state.isConnected) {
				this.$router.push('/')
			}
		},
		async beforeMount() {
			this.store = Store
			await this.fetchUserCredentials()
		}
	}
</script>

<style scoped lang="scss">
  #personalInfo {
	cursor: pointer;
  }

  .upload-image {
	margin: 5px;

	.file {
	  display: block;
	}
  }
</style>
