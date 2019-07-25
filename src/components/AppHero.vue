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
          <VSearchComponent></VSearchComponent>
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import VSearchComponent              from "./VSearchComponent"
import { APP_NAME, APP_DESCRIPTION } from "../constants"

export default {
  name: "AppHeroComponent",
  components: { VSearchComponent },
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
