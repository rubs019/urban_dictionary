<template>
  <section class="hero is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ AppName }}
        </h1>
        <h2 class="subtitle">
          Le dictionnaire complet de l'argot
        </h2>
        <h2 class="subtitle search">
          <SearchComponent></SearchComponent>
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import SearchComponent from "../components/searchComponent";
import { APP_NAME } from "../constants";

export default {
  name: "heroComponent",
  components: { SearchComponent },
  data() {
    return {
      AppName: APP_NAME
    };
  }
};
</script>

<style scoped lang="scss">
.search {
  width: 40%;
  margin: auto;
}
</style>
