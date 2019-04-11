<template>
  <div class="home">
    <HeroComponent></HeroComponent>
    <div class="container"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroComponent from "../components/heroComponent.vue";
import { APP_NAME } from "../constants";

export default {
  name: "AppHome",
  data() {
    return {
      AppName: APP_NAME
    };
  },
  components: {
    HeroComponent
  }
};
</script>
