<template>
  <div class="columns">
    <div class="column is-6 is-offset-3">
      <FormSignUp @tryConnect="sendLogin" :message="form.message"></FormSignUp>
    </div>
  </div>
</template>

<script>
import FormSignUp from "../components/FormSignUp";
export default {
  name: "AppSignUp",
  components: {
    FormSignUp
  },
  data: () => ({
    form: {
      message: null
    }
  }),
  methods: {
    sendLogin(credentials) {
      this.form.message = "Identifiant ou mot de passe incorrect";
      // Send login and pwd

      console.log("credentials", credentials);
    }
  }
};
</script>

<style scoped>
.tile {
  margin-top: 10%;
}
</style>
