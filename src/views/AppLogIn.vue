<template>
  <div class="columns">
    <div class="column is-6 is-offset-3">
      <FormLogin @login="login" :message="form.message" :color="form.color"></FormLogin>
    </div>
  </div>
</template>

<script>
import FormLogin                         from "../components/FormLogin"
import { post, get }                     from "../services/api.service"
import DTO                  from "../services/DTO"
import { ENDPOINT, NOTIF_MSG, API_PATH } from "../constants"
import Store                             from "../store"

export default {
  name: "AppLogIn",
  components: {
    FormLogin
  },
  data: () => ({
    form: {
      message: null,
      color: null
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

      try {
        const result = await post(API_PATH.ACCOUNT_LOGIN, DTO.accountLogin(credentials))

        const userInformation = await get(`${ENDPOINT.ACCOUNTS}/${result.data.userId}`)

        // On ajoute le token aux données que l'on va enregistrer
        console.log(result)
        userInformation.data.token = result.data.id
        userInformation.data.ttl = result.data.ttl

        Store.setConnected(true)
        Store.setUser(userInformation.data)

        this.setMsgNotification(NOTIF_MSG.SUCCESS_LOGIN)

        this.$router.push('/')
      } catch (e) {
        console.log('e', e)
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
