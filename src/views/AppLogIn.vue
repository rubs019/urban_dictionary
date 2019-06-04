<template>
    <div class="columns">
        <div class="column is-6 is-offset-3">
            <FormLogin @login="login" :message="form.message" :color="form.color" :status="form.status"></FormLogin>
        </div>
    </div>
</template>

<script>
	import FormLogin                                 from "../components/form/FormLogin"
	import { Post, Get }                             from "../services/api.service"
	import DTO                                       from "../services/DTO"
	import Logger                                      from "../services/logger"
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
				Logger('credentials : ', credentials)
				// Send login and pwd

				if (!this.checkCredentials(credentials)) {
					this.setMsgNotification(NOTIF_MSG.PWD_OR_LOGIN_EMPTY)
					return
                }

                // Use to show loader
                this.form.status = STATUS.PENDING

				try {
					const result = await Post(API_PATH.ACCOUNT_LOGIN, DTO.accountLogin(credentials))

                    Logger('result', result)
                    const headers = {
						token: result.data.token
                    }

					const { data: userInformation } = await Get(`${ENDPOINT.USERS}/${result.data.userId}`, headers)

                    Logger('userInformation', userInformation)

                    userInformation.token = result.data.token
                    Logger(localStorage)

                    if (Store.setUser(userInformation)) {
                        Store.setConnected(true)
                    } else {
                    	throw Error('AppLogin : Erreur lors du stockage des identifiants')
                    }

                    this.setMsgNotification(NOTIF_MSG.SUCCESS_LOGIN)

					setTimeout(async () => {
                        this.$router.push('/')
					}, 1500)
				} catch (e) {
					Logger('e', e.response)

                    // Use to show error
                    this.form.status = STATUS.ERROR

					if (e.response.data.statusCode === 400) {
						this.setMsgNotification(NOTIF_MSG.BAD_CREDENTIALS)
						return
					}

					if (e.response.status === 422) {
						this.setMsgNotification(NOTIF_MSG.PWD_TOO_SHORT)
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
			},
			/**
             * Check if credentials is present
			 * @param credentials
			 */
			checkCredentials(credentials) {
				return !(!credentials.login || !credentials.pwd)

			}
		}
	}
</script>

<style scoped>
    .tile {
        margin-top: 10%;
    }
</style>
