<template>
    <div class="sidebar">
        <div class="tile is-parent">
            <router-link
                    v-if="store.state.isConnected"
                    :to="{name: 'AddDefinitions'}"
                    class="button is-primary is-fullwidth"
            >
                  <span class="icon">
                    <i class="fas fa-book"></i>
                  </span>
                <span>Créer une définition</span>
            </router-link>
        </div>
        <div class="tile is-parent">
            <router-link
                    to="/connect"
                    class="button is-primary is-fullwidth"
            >
                  <span class="icon">
                    <i class="fas fa-star"></i>
                  </span>
                <span>Lancer une partie</span>
            </router-link>
        </div>
        <div class="tile is-parent">
            <BaseTag :tags="tags"></BaseTag>
        </div>
        <div class="tile is-parent">
            <TopExpressions
                    :expressions-names="rawExpressions"
                    v-bind:url="'OneDefinition'"
            ></TopExpressions>
        </div>
    </div>
</template>

<script>
    import BaseTag        from "../tag/BaseTag"
    import TopExpressions from "../TopExpressionsComponent"
    import Store          from "../../store"

	export default {
		name: "TheSidebar",
        components: { BaseTag, TopExpressions },
        data: () => ({
			tags: [
				"Street",
				"Soleil",
				"Paris",
				"Musique",
				"One",
				"Two",
				"Three",
				"Four",
				"Five",
				"Six",
				"Seven",
				"Eight",
				"Nine",
				"Ten",
				"Eleven",
				"Twelve",
				"Thirteen",
				"Fourteen",
				"Fifteen",
				"Sixteen",
				"Seventeen",
				"Eighteen",
				"Nineteen"
			],
			rawExpressions: [
				"Tchoin",
				"au DD",
				"Gava",
				"Bavon",
				"Brava",
				"En esprit",
				"Un Fer",
				"Un guigui"
			],
            store: Store
        })
	}
</script>

<style scoped>

</style>
