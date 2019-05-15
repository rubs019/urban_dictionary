<template>
    <p>{{ message }}</p>
</template>

<script>
	import Store        from "../store"
	import { post }     from "../services/api.service"
	import { API_PATH } from "../constants"
	import DTO     from "../services/DTO"

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
				const result = await post(`${API_PATH.ACCOUNT_LOGOUT}`, DTO.accountLogout(null), { token: Store.credentials.token })
				console.log('appDisconnect : result', result)
				Store.clear()
				console.log("Store.credentials2", Store.credentials)

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
