<template>
    <div class="home">
        <AppHeroComponent></AppHeroComponent>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-8">
                        <p class="title" v-if="store.state.isConnected"> Welcome back, {{ store.credentials.username
                            }} </p>
                        <div class="expression" id="topExpression">
                            <h3 class="title boxed-section-title is-4 has-text-left">
                                Expression du jour
                            </h3>
                            <OneDefinition :is-primary="true" :simpleComponent="false"></OneDefinition>
                        </div>
                        <div class="expression" id="allExpression">
                            <h3 class="title boxed-section-title is-4 has-text-left">
                                Toutes les expressions
                            </h3>
                            <template v-if="definitions">
                                <div v-for="(definition, index) in definitions" :key="index">
                                    <OneDefinition :is-primary="false" :simpleComponent="true"
                                                   :expression="definition"></OneDefinition>
                                </div>
                            </template>
                            <template v-else>
                                <OneDefinition :is-primary="false" :simpleComponent="true"></OneDefinition>
                            </template>
                        </div>
                    </div>
                    <div class="column is-4">
                        <TheSidebar></TheSidebar>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
	// @ is an alias to /src
	import AppHeroComponent from "../components/AppHeroComponent.vue"
	import OneDefinition    from "../components/definitions/OneDefinition"
	import TheSidebar       from "../components/generic/TheSidebar"
	import { ENDPOINT }     from "../constants"
	import Store            from "../store"
	import { get }          from "../services/api.service"

	export default {
		name: "AppHome",
		data() {
			return {
				OneDefinition: OneDefinition,
				store: Store,
				definitions: null
			}
		},
		components: {
			AppHeroComponent,
			OneDefinition,
			TheSidebar
		},
		methods: {
			async getExpressions() {
				try {
					const result = await get(ENDPOINT.WORDS)

					console.log('result.data', result.data)

					this.definitions = result.data
				} catch (e) {
					console.log('AppHome : getExpressions : ', e.response)
				}
			}
		},
		mounted() {
			this.getExpressions()
		}
	}
</script>

<style scoped>
    .home {
        background-color: #f6f9fc;
    }

    .expression {
        padding: 40px 0;
    }
</style>
