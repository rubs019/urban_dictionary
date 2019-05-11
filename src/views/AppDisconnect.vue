<template>
    <p>Vous avez été deconnecté</p>
</template>

<script>
    import Store from "../store"
  export default {
    name: "AppDisconnect",
    beforeMount() {
      console.log('Store.credentials', Store.credentials)
      Store.clear()
      console.log('Store.credentials2', Store.credentials)

      const $that = this

      setTimeout(() => {
        $that.$router.push('/')
      }, 1500)
    }
  }
</script>

<style scoped>

</style>
