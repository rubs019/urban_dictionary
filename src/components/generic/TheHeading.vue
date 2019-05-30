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
        :class="[burgerMenu ? 'is-active' : '']"
        aria-label="menu"
        aria-expanded="true"
        v-on:click="toggleBurgerMenu()"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="[burgerMenu ? 'is-active' : '']">
      <div class="navbar-end">
        <router-link :to="{ name: 'AppHome' }" class="navbar-item">{{
          MenuName.home
          }}</router-link>

        <router-link :to="{ name: 'AppDefinitions' }" class="navbar-item">{{
          MenuName.expression
          }}</router-link>
        <router-link :to="{ name: 'AppAbout' }" class="navbar-item">{{
          MenuName.about
          }}</router-link>
        <router-link
                :to="{ name: 'AppLogIn' }"
                class="navbar-item"
                v-if="!Storage.state.isConnected"
        >
          {{ MenuName.login }}
        </router-link>
        <router-link
                class="navbar-item"
                :to="{ name: 'AppDisconnect' }"
                v-if="Storage.state.isConnected"
        >
          {{ MenuName.logout }}
        </router-link>
        <router-link v-if="!Storage.state.isConnected" :to="{ name: 'AppSignUp' }" class="navbar-item">
          {{ MenuName.signup }}
        </router-link>
        <router-link v-if="Storage.state.isConnected" :to="{ name: 'AppProfile' }" class="navbar-item">
          {{ MenuName.profile }}
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
    Storage: Store,
    burgerMenu: false
  }),
  methods: {
    disconnectUser() {
      Store.clear()
      this.$router.push('/')
    },
    toggleBurgerMenu() {
      this.burgerMenu = !this.burgerMenu
    },
  }
}
</script>

<style scoped lang="scss">
.navbar-brand {
  font-size: 2.2em;
}
</style>
