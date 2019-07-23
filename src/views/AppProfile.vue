<template>
  <div id="AppProfile">
	<AppHeroComponent></AppHeroComponent>
	<div class="section">
	  <div class="container">
		<div class="columns">
		  <div class="column is-8">
			<div class="notification is-primary">
			  <p class="title has-text-left">{{ $t('menu_name.profile') }}</p>
			  <div class="notification is-white">
				<b-tabs size="is-medium" type="is-boxed" expanded animated>
				  <b-tab-item label="Mes informations">
					<ProfileInformations
							:editable="true"
							:status-form="form.status"
							v-if="store"
							@updateUserInformation="updateUser"
							:credentials="store.credentials">
					</ProfileInformations>
				  </b-tab-item>
				</b-tabs>
			  </div>
			</div>
		  </div>
		  <div class="column is-4">
			<div class="tile is-vertical">
			  <div class="tile is-parent">
				<article class="tile is-child notification">
				  <p class="title">{{ $t('message.you') }}</p>
				  <p class="subtitle">{{ $t('message.pictureAboutYou') }}</p>
				  <figure class="image is-4by3">
					<img class="is-rounded"
						 v-if="currentPhoto"
						 :src="currentPhoto">
					<img class="is-rounded" v-else
						 src="http://cdn.onlinewebfonts.com/svg/img_504570.png">
				  </figure>
				  <div class="upload-image">
					<b-field class="file">
					  <b-upload v-model="file">
						<a class="button is-primary">
						  <i class="fas fa-upload"></i>
						  <span>{{ $t('message.switchPicture') }}</span>
						</a>
					  </b-upload>
					  <span class="file-name" v-if="file">{{ file.name }}</span>
					  <button class="button is-pulled-right" v-if="file" v-on:click="uploadPhoto">
						{{ $t('form.btnUpdate') }}
					  </button>
					</b-field>
				  </div>
				</article>
			  </div>
			  <div class="tile is-parent">
				<article class="tile is-child notification is-primary">
				  <p class="subtitle">{{ $t('message.actualScore') }}</p>
				  <p class="title">
					  <span class="icon">
						  <i class="fas fa-star fa-1x"></i>
					  </span>
					{{ store.credentials.score || 0 }}
				  </p>
				</article>
			  </div>
			  <div class="tile is-parent">
				<article class="tile is-child notification is-primary">
				  <p class="subtitle">{{ $t('message.actualKarma') }}</p>
				  <p class="title">
					  <span class="icon">
						  <i class="fas fa-star fa-1x"></i>
					  </span>
					{{ store.credentials.karma || 0 }}
				  </p>
				</article>
			  </div>
			  <div class="tile is-parent">
				<article id="personalInfo" v-on:click="fetchPersonnalInformation"
						 class="tile is-child notification is-danger">
				  <p>{{ $t('message.downloadRPGD') }}</p>
				</article>
			  </div>
			  <div class="tile is-parent">
				<article id="deleteUser" v-on:click="deleteAccount"
						 class="tile is-child notification is-danger">
				  <p>{{ $t('message.deleteAccount') }}</p>
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
	import Store                                     from "../store"
	import { API_PATH, ENDPOINT, NOTIF_MSG, STATUS } from "../constants"
	import AppHeroComponent                          from "../components/AppHeroComponent"
	import ProfileInformations         from "../components/profile/ProfileInformations"
	import ProfileDefinitions          from "../components/profile/ProfileDefinitions"
	import { Delete, Get, Patch, Put } from "../services/api.service"
	import Logger                      from "../helpers/logger"
	import DTO                         from "../services/DTO"
	import helper                      from "../helpers/index"
	import { getWordUser }             from "../helpers/query"
	import helpers                     from "../helpers"

	export default {
		name: "AppProfile",
		data: function () {
			return {
				showBooks: false,
				store: null,
				file: null,
				currentPhoto: null,
				form: {
					status: 0
				}
			}
		},
		methods: {
			deleteAccount() {
				Logger('checkFile', this.store.credentials.id)

				this.$dialog.confirm({
					type: 'is-danger',
					title: 'Attention',
					confirmText: 'Oui je veux supprimer',
					message: `<p>Voulez vous vraiment supprimer l'utilisateur <b>${this.store.credentials.username}</b></p>`,
					onConfirm: async () => {
						try {
							await Delete(`${ENDPOINT.USERS}/${this.store.credentials.id}`)
							helpers.successToast(this, 'L\'utilisateur à été supprimé')
							this.$router.push('/disconnect')
						} catch (e) {
							Logger('deleteExpression: onConfirm : error', e.response)
						}
					}
				})
			},
			async updateUser(user) {
				Logger('AppProfile : updateUser : User', user)

				this.form.status = STATUS.PENDING

				if (user.pwd && !user.pwd2) {
					helper.errorToast(this, NOTIF_MSG.SECOND_PWD_REQUIRED)
					this.form.status = STATUS.ERROR
					return
				}

				if (user.pwd && user.pwd2) {
					if (!helper.checkPassword(user.pwd, user.pwd2)) {
						helper.errorToast(this, NOTIF_MSG.NOT_SAME_PWD)
						this.form.status = STATUS.ERROR
						return
					}

					if (!helper.passwordIsGreaterThan6(user.pwd)) {
						helper.errorToast(this, NOTIF_MSG.PWD_TOO_SHORT)
						this.form.status = STATUS.ERROR
						return
					}
				}


				try {
					const result = await Patch(`${ENDPOINT.USERS}/${Store.credentials.id}`, DTO.accountPatchInformation(user))

					Store.setUser(result.data.usernames, 'usernames')
					Store.setUser(result.data.email, 'email')

					helper.successToast(this, 'Vos informations ont bien été mise à jour')

					this.form.status = STATUS.SUCCESS

				} catch (e) {
					Logger('AppProfile : updateUser : ', e.response)

					helper.errorToast(this, "Une erreur s'est produite lors de la mise à jour")
					this.form.status = STATUS.DEFAULT
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
				try {
					await Put(API_PATH.USER_AVATAR(this.store.credentials.id), formData, headers)
					// Afficher popup
					helper.successToast(this, 'Votre photo a bien été upload')
					this.currentPhoto = null
					this.currentPhoto = `${process.env.VUE_APP_API_PROD}/${API_PATH.USER_AVATAR(this.store.credentials.id)}`
					Logger(this.currentPhoto)

				} catch (e) {
					Logger('AppProfile : uploadPhoto : Error')
					Logger(e)
					helper.errorToast(this, "Une erreur s'est produite lors de l'upload de la photo")
					// Afficher popup
				}
			},
			async fetchUserPhoto() {
				try {

					this.currentPhoto = `${process.env.VUE_APP_API_PROD}/${API_PATH.USER_AVATAR(this.store.credentials.id)}`

					// Afficher popup

				} catch (e) {
					Logger('AppProfile : uploadPhoto : Error', e)
					// Afficher popup
				}
			},
			async fetchUserDefinition() {
				try {
					const url = `${ENDPOINT.WORDS}${getWordUser(this.store.credentials.id, this.store.language)}`
					Logger('URL', url)
					const data = await Get(url)
					Logger('AppProfile : ', data)
				} catch (err) {
					Logger('AppProfile : err : ', err)
				}
			},
			async fetchPersonnalInformation() {
				try {
					const result = await Get(`${ENDPOINT.USERS}/${this.store.credentials.id}/summary`)
					Logger('fetchPersonnalInformation : result', result)
					const url = window.URL.createObjectURL(new Blob([JSON.stringify(result.data)]))
					const link = document.createElement('a')
					link.href = url
					link.setAttribute('download', `${this.store.credentials.username}-account-${this.store.credentials.id}.json`) //or any other extension
					document.body.appendChild(link)
					link.click()
				} catch (err) {
					Logger('Error', err)
				}
			}
		},
		components: {AppHeroComponent, ProfileInformations},
		beforeCreate() {
			if (!Store.state.isConnected) {
				this.$router.push('/')
			}
		},
		beforeMount() {
			this.store = Store
			this.fetchUserPhoto()
			this.fetchUserDefinition()
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
