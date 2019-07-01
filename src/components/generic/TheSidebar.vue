<template>
    <div class="sidebar">
        <div class="tile is-parent">
            <router-link
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
                <router-link tag='span' :to="{ name: 'AppGames' }">Lancer une partie</router-link>
            </router-link>
        </div>
        <div class="tile is-parent">
            <b-tabs type="is-toggle" expanded style="padding: 0 !important;">
                <b-tab-item label="Top 10">
                    <TopExpressions
                            :expressions-names="rawExpressions"
                            v-bind:url="'OneDefinition'"
                    ></TopExpressions>
                </b-tab-item>
                <b-tab-item label="Music">
                    <TopExpressions
                            :expressions-names="rawExpressions"
                            v-bind:url="'OneDefinition'"
                    ></TopExpressions>
                </b-tab-item>

                <b-tab-item label="Videos">
                    <TopExpressions
                            :expressions-names="rawExpressions"
                            v-bind:url="'OneDefinition'"
                    ></TopExpressions>
                </b-tab-item>
            </b-tabs>
        </div>
    </div>
</template>

<script>
    import TopExpressions from "../TopExpressionsComponent"
    import Store          from "../../store"

	export default {
		name: "TheSidebar",
        components: { TopExpressions },
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
    section {
        padding: 0 !important;
    }
</style>
