<template>
  <div class="columns">
    <div class="column is-6 is-offset-3">
      <FormSignUp @tryRegister="register" :message="form.message" :color="form.color"></FormSignUp>
    </div>
  </div>
</template>

<script>
import FormSignUp from "../components/FormSignUp"
import { post } from "../services/api.service"
import { accountCreate } from "../services/DTO"
import Store from "../store"
export default {
  name: "AppSignUp",
  components: {
    FormSignUp
  },
  data: () => ({
    form: {
      message: null,
      color: null
    },
    notificationMsg: {
      NOT_SAME_PWD: "Les mots de passent doivent être identiques",
      USER_ALREADY_EXIST: "Ce nom d'utilisateur existe déjà",
      SUCCESS: "Vous allez être redirigé vers la page correspondante",
      ERROR_SERVER: "Une erreur s'est produite, veuillez réessayer dans quelques instants"
    }
  }),
  methods: {
    async register(credentials) {
      if (!this.checkPassword(credentials)) {
        this.setMsgNotification(this.notificationMsg.NOT_SAME_PWD)
        return
      }

      try {
        const result = await post('accounts', accountCreate(credentials))

        Store.setConnected(true)
        Store.setUser(result.data)

        this.setMsgNotification(this.notificationMsg.SUCCESS)
      } catch (e) {
        console.log('e', e.response)
        if (e.response.status === 422) {
          this.setMsgNotification(this.notificationMsg.USER_ALREADY_EXIST)
          return
        }
        this.setMsgNotification(this.notificationMsg.ERROR_SERVER)
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
      this.form.color = message === this.notificationMsg.SUCCESS ? 'success' : 'danger'
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
