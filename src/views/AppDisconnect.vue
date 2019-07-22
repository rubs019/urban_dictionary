<template>
    <p>{{ message }}</p>
</template>

<script>
	import Store  from "../store"
    import Logger from "../helpers/logger"

	export default {
		name: "AppDisconnect",
		data: () => {
			return {
				message: "Vous avez été deconnecté"
			}
		},
		async beforeMount() {
			Logger("Store.credentials", Store.credentials)

			try {
				Store.clear()
				Logger("Store.credentials2", Store.credentials)
				Logger("Store.userConnected", Store.state.isConnected)

				const $that = this

				setTimeout(() => {
					$that.$router.push("/")
				}, 1500)
			} catch (e) {
				Logger('appDisconnect: Error:', e.response)
				this.message = "Une erreur s'est produite, veuillez recharger la page"
			}
		}
	}
</script>

<style scoped>

</style>
