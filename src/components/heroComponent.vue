<template>
  <section class="hero is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ AppName }}
        </h1>
        <h2 class="subtitle">
          {{ AppDescription }}
        </h2>
        <h2 class="subtitle search">
          <SearchComponent></SearchComponent>
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import SearchComponent from "./searchComponent";

export default {
  name: "AppHeroComponent",
  components: { SearchComponent },
  props: {
    AppName: String,
    AppDescription: String
  }
};
</script>

<style scoped lang="scss">
.search {
  width: 40%;
  margin: auto;
}
</style>
