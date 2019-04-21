<template>
  <div class="list-definitions container">
    <p class="title">List Definitions</p>
    <div class="columns">
      <div
        class="column is-6"
        v-for="(definition, index) in definitions"
        :key="index"
      >
        <div class="card">
          <router-link
            :to="{ name: 'OneDefinition', params: { name: definition.name } }"
          >
            <header class="card-header">
              <p class="card-header-title">
                <router-link
                  :to="{ name: 'OneDefinition', params: { id: definition.id } }"
                  >{{ definition.name }}
                </router-link>
              </p>
              <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                {{ definition.definition.substr(0, 120) }}
                <a href="#">@bulmaio</a>. <a href="#">#css</a>
                <a href="#">#responsive</a>
                <br />
                <time datetime="2016-1-1">{{ definition.created_at }}</time>
              </div>
            </div>
          </router-link>
          <footer class="card-footer">
            <div class="card-footer-item">
              <span class="icon">
                <i class="fas fa-thumbs-down"></i>
              </span>
              {{ definition.dislike }}
            </div>
            <div class="card-footer-item">
              <span class="icon">
                <i class="fas fa-thumbs-up"></i>
              </span>
              {{ definition.like }}
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as APIService from "@/services/api.service";
const ENDPOINT = "definitions";
export default {
  name: "ListDefinitions",
  data: () => ({
    definitions: null
  }),
  async mounted() {
    try {
      const definitions = await APIService.get(ENDPOINT);

      this.definitions = definitions.data;
      console.log(definitions.data);
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 0;
  a {
    color: white;
  }
  background-color: #36cfde;
  color: white;
}
.card-header {
  box-shadow: none;
}
.card-footer-item {
  border-right: none !important;
}
</style>
