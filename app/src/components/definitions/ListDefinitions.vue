<template>
    <div class="list-definitions">
        <p>List Definitions</p>
        <ul>
            <li v-for="(definition, index) in definitions" :key="index">
                <router-link :to="{name: 'one-definition', params: {id: definition.id}}">{{ definition.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  import axios from 'axios/index'
  export default {
    name: "ListDefinitions",
    data: () => ({
      definitions: null
    }),
    async mounted() {
      try {
        const definitions = await axios.get(`http://localhost:1337/definitions`)

        this.definitions = definitions.data
        console.log(this.definitions)
      } catch (err) {
        console.log(err)
      }
    }
  };
</script>

<style scoped>

</style>