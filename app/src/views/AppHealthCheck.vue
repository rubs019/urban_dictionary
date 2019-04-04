<template>
  <div class="healthcheck">
    <p>Check if server is up :</p>
    <button v-on:click="check(true)">Check</button>
    <div
      v-if="isChecked"
      v-bind:class="{ valid: isUp === true, error: isUp === false, default: isUp === null }"
      class="notif default"
    >
      <span class="notif-title">{{ msgNotif.title }}</span>
      <p class="notif-content">{{ msgNotif.content }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios/index";
export default {
  name: "AppHealthCheck",
  data: () => ({
    msgNotif: "",
    isChecked: false,
    isUp: null,
    statusNotif: {
      resolve: {
        title: "Success",
        content: "The server is up !"
      },
      pending: {
        title: "Wait...",
        content: "Try to connect..."
      },
      reject: {
        title: "Error",
        content: "The server seems close"
      }
    }
  }),
  methods: {
    check: async function(lazy) {
      if (this.isChecked) {
        this.isChecked = false;
        return;
      }
      this.isChecked = true;
      this.msgNotif = this.statusNotif.pending;
      this.isUp = null

      try {
        await axios.get("http://localhost:1337/healthcheck");

        if (lazy) {
          setTimeout(() => {
            this.isUp = true;
            this.msgNotif = this.statusNotif.resolve;
          }, 1500)
          return
        }
        this.isUp = true;
        this.msgNotif = this.statusNotif.resolve;
      } catch (err) {
        console.log(err);
        this.isUp = false;
        this.msgNotif = this.statusNotif.reject;
      }
    }
  }
};
</script>

<style scoped>
.valid {
  background-color: forestgreen !important;
}
.error {
  background-color: red !important;
}
.default {
  background-color: gray;
  color: white;
}
div.notif {
  padding: 20px 40px;
  border: none;
  width: 25%;
  margin: 15px auto auto;
}
.notif-title {
  font-size: x-large;
  font-weight: bold;
}
.notif-content {
  margin: 0;
}
</style>
