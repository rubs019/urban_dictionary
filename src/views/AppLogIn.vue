<template>
    <div class="columns">
        <div class="column is-6 is-offset-3">
            <FormLogin @login="login" :message="form.message" :color="form.color" :status="form.status"></FormLogin>
        </div>
    </div>
</template>

<script>
	import FormLogin                                 from "../components/form/FormLogin"
	import { post, get }                             from "../services/api.service"
	import DTO                                       from "../services/DTO"
	import { ENDPOINT, NOTIF_MSG, API_PATH, STATUS } from "../constants"
	import Store                                     from "../store"

	export default {
		name: "AppLogIn",
		components: {
			FormLogin
		},
		data: () => ({
			form: {
				message: null,
				color: null,
                status: 0
			}
		}),
		methods: {
			/**
			 * Function use to log user depends credentials
			 * @param credentials
			 * @return undefined
			 */
			async login(credentials) {
				// this.form.message = "Identifiant ou mot de passe incorrect"
				console.log('credentials : ', credentials)
				// Send login and pwd

                // Use to show loader
                this.form.status = STATUS.PENDING

				try {
					const result = await post(API_PATH.ACCOUNT_LOGIN, DTO.accountLogin(credentials))

					const userInformation = await get(`${ENDPOINT.USERS}/${result.data.userId}`)

					setTimeout(async () => {
                        // On ajoute le token aux données que l'on va enregistrer
                        console.log(result)
                        userInformation.data.token = result.data.id
                        userInformation.data.ttl = result.data.ttl

                        Store.setConnected(true)
                        Store.setUser(userInformation.data)

                        this.setMsgNotification(NOTIF_MSG.SUCCESS_LOGIN)

                        this.$router.push('/')
					}, 1500)
				} catch (e) {
					console.log('e', e)

                    // Use to show error
					this.form.status = STATUS.ERROR

					if (e.response.status === 401) {
						this.setMsgNotification(NOTIF_MSG.ACCOUNT_NOT_EXIST)
						return
					}

					this.setMsgNotification(NOTIF_MSG.ERROR_SERVER)
				}
			},
			/**
			 * Set the message of notification
			 *
			 * @param message {string} The new message to show
			 * @return {boolean}
			 */
			setMsgNotification(message) {
				this.form.color = message === NOTIF_MSG.SUCCESS_LOGIN ? 'success' : 'danger'
				this.form.message = message
			}
		}
	}
</script>

<style scoped>
    .tile {
        margin-top: 10%;
    }
</style>
