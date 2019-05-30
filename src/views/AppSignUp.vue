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
	import { Post }                        from "../services/api.service"
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

				if (!this.validationInput(credentials)) {
					this.form.status = STATUS.ERROR
                    return
                }

				try {
					const result = await Post(API_PATH.CREATE_USER, DTO.accountCreate(credentials))

                    console.log('result', result)

					Store.setConnected(true)
					Store.setUser(result.data)

					this.setMsgNotification(NOTIF_MSG.SUCCESS)
                    const that = this
					setTimeout(() => {
						that.$router.push("/login")
                    }, 1500)
				} catch (e) {
					this.form.status = STATUS.ERROR
					console.log('e', e.response)
					const that = this
					setTimeout(() => {
						if (e.response.data.status === 422) {
							that.setMsgNotification(NOTIF_MSG.USER_ALREADY_EXIST)
							return
						}

						if (e.response.data.statusCode === 409) {

							that.setMsgNotification(NOTIF_MSG.EMAIL_ALREADY_EXIST)
                            return
                        }

						that.setMsgNotification(NOTIF_MSG.ERROR_SERVER)
					}, 1500)
				}

			},
			/**
			 * Check if password is the same
			 * @param credentials {object}
			 * @return {boolean}
			 */
			checkPassword(credentials) {
				// Check if password is the same
                if (!credentials.pwd || !credentials.pwd2) return false
				return credentials.pwd === credentials.pwd2
			},
			/**
			 * Check password length
			 * @param credentials {object}
			 * @return {boolean}
			 */
			checkPasswordLength(credentials) {
				// Check if password is the same
                if (!credentials.pwd) return false
				return credentials.pwd.length >= 6
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
			},
			/**
			 * Check all form
			 * @param credentials {object}
			 * @return {boolean}
			 */
			validationInput(credentials) {
				if (!this.checkPasswordLength(credentials)) {
					this.setMsgNotification(NOTIF_MSG.PWD_TOO_SHORT)
					return false
				}
				if (!this.checkPassword(credentials)) {
					this.setMsgNotification(NOTIF_MSG.NOT_SAME_PWD)
					return false
				}
				return true
			},
		}
	}
</script>

<style scoped>
    .tile {
        margin-top: 10%;
    }
</style>
