<template>
  <div class="columns">
    <div class="column is-6 is-offset-3">
      <FormLogin @tryConnect="sendLogin" :message="form.message"></FormLogin>
    </div>
  </div>
</template>

<script>
import FormLogin from "../components/FormLogin";
export default {
  name: "AppLogIn",
  components: {
    FormLogin
  },
  data: () => ({
    form: {
      message: null
    }
  }),
  methods: {
    sendLogin() {
      this.form.message = "Identifiant ou mot de passe incorrect";
      // Send login and pwd
    }
  }
};
</script>

<style scoped>
.tile {
  margin-top: 10%;
}
</style>
