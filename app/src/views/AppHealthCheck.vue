<template>
  <div class="healthcheck">
    <div class="columns">
      <div class="column">
        <p class="title">Check if server is up :</p>
        <button
          v-on:click="UICheck(true, 1500)"
          class="button is-medium is-primary"
        >
          Check
        </button>
        <div class="columns">
          <div class="column is-half is-offset-3">
            <article
              class="message"
              v-if="isChecked"
              v-bind:class="{
                'is-success': isUp === 1,
                'is-danger': isUp === 2,
                'is-info': isUp === 0
              }"
            >
              <div class="message-header">
                <p>{{ msgNotif.title }}</p>
                <span v-if="msgNotif.loader" class="loader"></span>
                <button
                  class="delete"
                  aria-label="delete"
                  v-on:click="UICloseNotificationOnClick()"
                ></button>
              </div>
              <div class="message-body">
                {{ msgNotif.content }}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as APIService from "@/services/api.service";

const STATUS_INITIAL = 0,
  STATUS_UP = 1,
  STATUS_DOWN = 2;
const ENDPOINT = "healthcheck";

export default {
  name: "AppHealthCheck",
  data: () => ({
    msgNotif: null,
    isChecked: false,
    isUp: null,
    statusNotif: {
      resolve: {
        title: "Success",
        content: "The server is up !"
      },
      pending: {
        title: "Wait...",
        content: "Try to connect...",
        loader: true
      },
      reject: {
        title: "Error",
        content: "The server seems close"
      }
    }
  }),
  methods: {
    UICheck: async function(lazy, timeout = 1500) {
      if (this.isChecked === true) {
        // For better UX
        this.closeNotification();
        return;
      }
      this.setNotification(STATUS_INITIAL);
      try {
        await APIService.get(ENDPOINT);

        if (lazy) {
          // Use to simulate a server latency
          setTimeout(() => {
            this.setNotification(STATUS_UP);
          }, timeout);
          return;
        }
        this.setNotification(STATUS_UP);
      } catch (err) {
        this.setNotification(STATUS_DOWN, err);
      }
    },
    UICloseNotificationOnClick: function() {
      this.closeNotification();
    },
    closeNotification: function() {
      this.isChecked = false;
    },
    successNotification: function() {
      this.isChecked = true;
      this.isUp = STATUS_UP;
      this.msgNotif = this.statusNotif.resolve;
    },
    errorNotification: function(err) {
      console.log(err);
      this.isChecked = true;
      this.isUp = STATUS_DOWN;
      this.msgNotif = this.statusNotif.reject;
    },
    waitNotification: function() {
      this.isChecked = true;
      this.msgNotif = this.statusNotif.pending;
      this.isUp = STATUS_INITIAL;
    },
    setNotification: function(status, error = null) {
      if (status === STATUS_INITIAL) {
        this.waitNotification();
        return;
      }
      if (status === STATUS_UP) {
        this.successNotification();
        return;
      }
      if (status === STATUS_DOWN && error) {
        this.errorNotification(error);
        return;
      }

      console.log("SetNotification Error");
    }
  },
  mounted() {
    this.isUp = STATUS_INITIAL;
  }
};
</script>

<style scoped>
.message {
  margin: 10px;
}
</style>
