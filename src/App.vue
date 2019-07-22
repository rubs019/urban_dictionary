<template>
  <div id="app">
    <div id="nav">
      <TheHeading />
    </div>
    <router-view />
    <footer>
      <cookie-law theme="dark-lime">
        <div slot="message">
          We use cookies to improve your online experience. By continuing to use our website we assume you are happy to allow the use of these cookies.
          <router-link to="policy">Take a look at our Cookie Policy to learn more and change your preferences.</router-link>
        </div>
      </cookie-law>
    </footer>
  </div>
</template>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";

  $primary: #F6DCA7;

  $colors: (
    "primary": ($primary, $primary-invert)
  );

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #f6f9fc !important;
    height: 100vh;
  }
  #nav {
    padding: 0;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>
<script>
import TheHeading from "./components/generic/TheHeading.vue"
import Store from "./store"
import CookieLaw from 'vue-cookie-law'

export default {
  name: "home",
  components: {
    TheHeading,
    CookieLaw
  },
  created() {
    const haveCredentialsStored = this.$localStorage.get('credentials', null)
    if (haveCredentialsStored) {
      const credentials = JSON.parse(haveCredentialsStored)
      Store.setUser(credentials)
      Store.setLanguage(credentials.locale)
    } else {
      const language = this.$localStorage.get('language', null) ? 'fr' : this.$localStorage.get('language')
      Store.setLanguage(language)
    }
  }
}
</script>
