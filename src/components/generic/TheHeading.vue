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
          PageName.home
        }}</router-link>

        <router-link :to="{ name: 'ListDefinitions' }" class="navbar-item">{{
          PageName.expression
        }}</router-link>
        <router-link :to="{ name: 'AppAbout' }" class="navbar-item">{{
          PageName.about
        }}</router-link>
        <router-link :to="{ name: 'AppLogIn' }" class="navbar-item">
          Log in
        </router-link>
        <router-link :to="{ name: 'AppSignUp' }" class="navbar-item">
          Sign Up
        </router-link>
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <router-link to="/games">
                <strong>{{ PageName.games }}</strong>
              </router-link>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { PAGE_NAME, APP_NAME } from "../../constants";

export default {
  name: "TheHeading",
  data: () => ({
    PageName: PAGE_NAME,
    AppName: APP_NAME
  })
};
</script>

<style scoped lang="scss">
.navbar-brand {
  font-size: 2.2em;
}
</style>