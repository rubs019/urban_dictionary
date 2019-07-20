<template>
  <section class="hero is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ AppName }}
        </h1>
        <h2 class="subtitle">
          {{ $t('message.appDescription') }}
        </h2>
        <h2 class="subtitle search">
          <SearchComponent></SearchComponent>
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import SearchComponent               from "./SearchComponent"
import { APP_NAME, APP_DESCRIPTION } from "../constants"

export default {
  name: "AppHeroComponent",
  components: { SearchComponent },
  data() {
    return {
      AppName: APP_NAME
    }
  }
}
</script>

<style scoped lang="scss">
.search {
  width: 40%;
  margin: auto;
}
</style>
