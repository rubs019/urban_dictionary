<template>
    <div class="columns">
        <div class="column is-6 is-offset-3">
            <FormSignUp @tryRegister="register" :message="form.message" :color="form.color"
                        :status="form.status"></FormSignUp>
        </div>
    </div>
</template>

<script>
	import FormSignUp                      from "../components/form/FormSignUp"
	import { post }                        from "../services/api.service"
	import DTO                             from "../services/DTO"
	import Store                           from "../store"
	import { NOTIF_MSG, API_PATH, STATUS } from "../constants"

	export default {
		name: "AppSignUp",
		components: {
			FormSignUp
		},
		data: () => ({
			form: {
				message: null,
				color: null,
				status: null
			}
		}),
		methods: {
			async register(credentials) {

				// Use to show loader
				this.form.status = STATUS.PENDING

				if (!this.checkPassword(credentials)) {
					this.setMsgNotification(NOTIF_MSG.NOT_SAME_PWD)
					this.form.status = STATUS.ERROR
					return
				}

				try {
					const result = await post(API_PATH.CREATE_ACCOUNT, DTO.accountCreate(credentials))

					Store.setConnected(true)
					Store.setUser(result.data)

					this.setMsgNotification(NOTIF_MSG.SUCCESS)

					this.$router.push("/")
				} catch (e) {
					console.log('e', e.response)

					this.form.status = STATUS.ERROR

					if (e.response.status === 422) {
						this.setMsgNotification(NOTIF_MSG.USER_ALREADY_EXIST)
						return
					}

					this.setMsgNotification(NOTIF_MSG.ERROR_SERVER)
				}

			},
			/**
			 * Check if password is the same
			 * @param credentials {object}
			 * @return {boolean}
			 */
			checkPassword(credentials) {
				// Check if password is the same
				return credentials.pwd === credentials.pwd2
			},
			/**
			 * Set the message of notification
			 *
			 * @param message {string} The new message to show
			 * @return {boolean}
			 */
			setMsgNotification(message) {
				this.form.color = message === NOTIF_MSG.SUCCESS ? 'success' : 'danger'
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
