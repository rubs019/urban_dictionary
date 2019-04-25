<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link
        :to="{ name: 'AppHome' }"
        class="navbar-item router-link-exact-active"
      >
        {{ AppName }}
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <router-link :to="{ name: 'AppHome' }" class="navbar-item">{{
          MenuName.home
        }}</router-link>

        <router-link :to="{ name: 'ListDefinitions' }" class="navbar-item">{{
          MenuName.expression
        }}</router-link>
        <router-link :to="{ name: 'AppAbout' }" class="navbar-item">{{
          MenuName.about
        }}</router-link>
        <router-link
          :to="{ name: 'AppLogIn' }"
          class="navbar-item"
          v-on:click="connectOrDisconnectUser()"
        >
          {{ Storage.state.isConnected ? MenuName.logout : MenuName.login }}
        </router-link>
        <router-link :to="{ name: 'AppSignUp' }" class="navbar-item">
          {{ MenuName.signup }}
        </router-link>
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <router-link to="/games">
                <strong>{{ MenuName.games }}</strong>
              </router-link>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { APP_NAME, MENU_NAME } from "../../constants"
import Store from "../../store"

export default {
  name: "TheHeading",
  data: () => ({
    AppName: APP_NAME,
    MenuName: MENU_NAME,
    Storage: Store
  }),
  methods: {
    connectOrDisconnectUser: () => {
      console.log("this.storage", Store)
      Store.setConnected(!Store.state.isConnected)
    }
  }
}
</script>

<style scoped lang="scss">
.navbar-brand {
  font-size: 2.2em;
}
</style>
