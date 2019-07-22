<template>
    <div class="columns">
        <div class="column is-6 is-offset-3">
            <FormLogin @login="login" :message="form.message" :color="form.color" :status="form.status"></FormLogin>
        </div>
    </div>
</template>

<script>
	import FormLogin                      from "../components/form/FormLogin"
	import { Post, Get }                  from "../services/api.service"
	import DTO                            from "../services/DTO"
	import Logger                         from "../helpers/logger"
	import { ENDPOINT, API_PATH, STATUS } from "../constants"
	import Store                          from "../store"

	export default {
		name: "AppLogIn",
		components: {
			FormLogin
		},
		data: () => ({
			form: {
				message: null,
				color: null,
                status: STATUS.DEFAULT
			}
		}),
		methods: {
			/**
			 * Function use to log user depends credentials
			 * @param credentials
			 * @return undefined
			 */
			async login(credentials) {
				Logger('credentials : ', credentials)
				// Send login and pwd

				if (!credentials.login || !credentials.pwd) {
					this.setMsgNotification(this.$t('notif.PWD_OR_LOGIN_EMPTY'), true)
					return
                }

                // Use to show loader
                this.form.status = STATUS.PENDING

				try {
					const result = await Post(API_PATH.ACCOUNT_LOGIN, DTO.accountLogin(credentials))

                    const headers = {
						token: result.data.token
                    }

					const { data: userInformation } = await Get(`${ENDPOINT.USERS}/${result.data.userId}`, headers)

                    Logger('userInformation', userInformation)

                    userInformation.token = result.data.token
                    Logger(localStorage)

                    if (Store.setUser(userInformation)) {
                        Store.setConnected(true)
                        Store.setLanguage(userInformation.locale)
                    } else {
                    	throw Error('AppLogin : Erreur lors du stockage des identifiants')
                    }

                    this.setMsgNotification(this.$t('notif.SUCCESS_LOGIN'), false)

					setTimeout(async () => {
                        this.$router.push('/')
					}, 1500)
				} catch (e) {
					Logger('e', e.response)

                    // Use to show error
                    this.form.status = STATUS.ERROR

					if (e.response.data.statusCode === 400) {
						this.setMsgNotification(this.$t('notif.BAD_CREDENTIALS'), true)
						return
					}

					if (e.response.status === 422) {
						this.setMsgNotification(this.$t('notif.PWD_TOO_SHORT'), true)
						return
					}

					this.setMsgNotification(this.$t('notif.ERROR_SERVER'), true)
				}
			},
			/**
			 * Set the message of notification
			 *
			 * @param message {string} The new message to show
			 * @param isError {boolean} Use to update color of form
			 * @return {boolean}
			 */
			setMsgNotification(message, isError = true) {
				this.form.color = isError ? 'danger' : 'success'
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
