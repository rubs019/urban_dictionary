<template>
  <div id="app">
    <div id="nav">
      <TheHeading />
    </div>
    <router-view />
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

export default {
  name: "home",
  components: {
    TheHeading
  },
  created() {
    const haveCredentialsStored = !!this.$localStorage.get('credentials', null)
    if (haveCredentialsStored) {
      Store.setUser(JSON.parse(this.$localStorage.get('credentials')))
      Store.setLanguage(this.$localStorage.get('language'))
    }
  }
}
</script>
