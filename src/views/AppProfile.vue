<template>
  <div id="AppProfile">
	<AppHeroComponent></AppHeroComponent>
	<div class="section">
	  <div class="container">
		<div class="columns">
		  <div class="column is-8">
			<div class="notification is-primary">
			  <p class="title has-text-left">Mon profil</p>
			  <div class="notification is-white">
				<b-tabs size="is-medium" type="is-boxed" expanded animated>
				  <b-tab-item label="Mes informations">
					<ProfileInformations
							v-if="store"
							@updateUserInformation="updateUser"
							:credentials="store.credentials">
					</ProfileInformations>
				  </b-tab-item>

				  <b-tab-item icon-pack="fas" icon="book">
					<template slot="header">
					  <b-icon icon="information-outline"></b-icon>
					  <span> Mes définitions <b-tag rounded> 3 </b-tag> </span>
					</template>
					<ProfileDefinitions></ProfileDefinitions>
				  </b-tab-item>

				  <b-tab-item label="Videos" disabled>
					Nunc nec velit nec libero vestibulum eleifend.
					Curabitur pulvinar congue luctus.
					Nullam hendrerit iaculis augue vitae ornare.
					Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
				  </b-tab-item>
				</b-tabs>
			  </div>
			</div>
		  </div>
		  <div class="column is-4">
			<div class="tile is-vertical">
			  <div class="tile is-parent">
				<article class="tile is-child notification">
				  <p class="title">Vous...</p>
				  <p class="subtitle">Une image de vous...</p>
				  <figure class="image is-4by3">
					<img class="is-rounded" :src="currentPhoto || 'http://cdn.onlinewebfonts.com/svg/img_504570.png'">
				  </figure>
					<div class="upload-image">
					  <b-field class="file" :input="checkFile">
						<b-upload v-model="file">
						  <a class="button is-primary">
							<i class="fas fa-upload"></i>
							<span>Changer de photo ?</span>
						  </a>
						</b-upload>
						<span class="file-name" v-if="file">{{ file.name }}</span>
						<button class="button is-pulled-right" v-if="file" v-on:click="uploadPhoto">Mettre à jour</button>
					  </b-field>
					</div>
				</article>
			  </div>
			  <div class="tile is-parent">
				<article class="tile is-child notification is-primary">
				  <p class="subtitle">Votre score actuel est de</p>
				  <p class="title">
					<span class="icon">
						<i class="fas fa-star fa-1x"></i>
					</span>
					{{ store.credentials.karma || 0 }}
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
	import Store                        from "../store"
	import { API_PATH, ENDPOINT }       from "../constants"
	import AppHeroComponent             from "../components/AppHeroComponent"
	import ProfileInformations          from "../components/profile/ProfileInformations"
	import ProfileDefinitions           from "../components/profile/ProfileDefinitions"
	import { Get, Patch, Put }          from "../services/api.service"
	import Logger                       from "../services/logger"
	import DTO                          from "../services/DTO"
	import { errorToast, successToast } from "../helpers/toast"

	export default {
		name: "AppProfile",
		data: function() {
			return {
				showBooks: false,
				store: null,
				file: null,
				currentPhoto: null
			}
		},
		methods: {
			checkFile(file) {
				Logger('checkFile', file)
			},
			async updateUser(user) {
				Logger('AppProfile : updateUser : User', user)
				try {
					const result = await Patch(`${ENDPOINT.USERS}/${Store.credentials.id}`, DTO.accountPatchInformation(user), {
						token: Store.credentials.token
					})

					Store.setUser(result.data.username, 'username')
					Store.setUser(result.data.email, 'email')

					successToast(this, 'Vos informations ont bien été mise à jour')

				} catch (e) {
					Logger('AppProfile : updateUser : ', e.response)
				}

			},
			async uploadPhoto() {
				Logger('AppProfile : uploadPhoto', this.file)
				const formData = new FormData()

				const headers = {
					'Content-Type': 'multipart/form-data',
					Authorization: this.store.credentials.token ? `Bearer ${this.store.credentials.token}` : undefined
				}
				formData.append('file', this.file)
				Put(API_PATH.UPLOAD_FILE(this.store.credentials.id), formData, headers)
					.then(function() {
						console.log('SUCCESS!!')
					})
					.catch(function() {
						console.log('FAILURE!!')
					})
				try {
					await Put(API_PATH.UPLOAD_FILE(this.store.credentials.id), formData, headers)
					// Afficher popup
					successToast(this, 'Votre photo a bien été upload')

				} catch (e) {
					Logger('AppProfile : uploadPhoto : Error', e)
					errorToast(this, "Une erreur s'est produite lors de l'upload de la photo")
					// Afficher popup
				}
			},
			async fetchUserPhoto() {
				try {
					const { data: userPhoto } = await Get(API_PATH.UPLOAD_FILE(this.store.credentials.id))
					Logger('AppProfile : fetchUserPhoto : userPhoto', userPhoto)
					// Afficher popup

				} catch (e) {
					Logger('AppProfile : uploadPhoto : Error', e)
					// Afficher popup
				}

				Put(API_PATH.UPLOAD_FILE(this.store.credentials.id), formData, headers)
					.then(function() {
						console.log('SUCCESS!!')
					})
					.catch(function() {
						console.log('FAILURE!!')
					})
			}
		},
		components: {AppHeroComponent, ProfileDefinitions, ProfileInformations},
		beforeCreate() {
			if (!Store.state.isConnected) {
				this.$router.push('/')
			}
		},
		beforeMount() {
			this.store = Store
			this.fetchUserPhoto()
		}
	}
</script>

<style scoped lang="scss">
  .upload-image {
	margin: 5px;
	.file {
	  display: block;
	}
  }
</style>
