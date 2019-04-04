<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'AppHome' }" class="navbar-item">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
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
      <div class="navbar-start">
        <router-link :to="{ name: 'AppHome' }" class="navbar-item">{{
          PageName.home
        }}</router-link>

        <router-link to="/definitions" class="navbar-item"
          >Definitions</router-link
        >
        <router-link to="/games" class="navbar-item">{{
          PageName.games
        }}</router-link>
        <router-link :to="{ name: 'AppHealthCheck' }" class="navbar-item">{{
          PageName.health
        }}</router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <router-link :to="{ name: 'AppAbout' }" class="navbar-item">{{
              PageName.about
            }}</router-link>

            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              <router-link :to="{ name: 'AppContact' }">{{
                PageName.contact
              }}</router-link>
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { PAGE_NAME } from "@/constants";
export default {
  name: "TheHeading",
  data: () => ({
    PageName: PAGE_NAME
  })
};
</script>

<style scoped></style>
