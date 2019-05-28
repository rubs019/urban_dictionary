<template>
    <p>{{ message }}</p>
</template>

<script>
	import Store        from "../store"

	export default {
		name: "AppDisconnect",
		data: () => {
			return {
				message: "Vous avez été deconnecté"
			}
		},
		async beforeMount() {
			console.log("Store.credentials", Store.credentials)

			try {
				Store.clear()
				console.log("Store.credentials2", Store.credentials)
				console.log("Store.userConnected", Store.state.isConnected)

				const $that = this

				setTimeout(() => {
					$that.$router.push("/")
				}, 1500)
			} catch (e) {
				console.log('appDisconnect: Error:', e.response)
				this.message = "Une erreur s'est produite, veuillez recharger la page"
			}
		}
	}
</script>

<style scoped>

</style>
