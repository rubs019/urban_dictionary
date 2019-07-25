<template>
  <div class="home">
	<AppHeroComponent></AppHeroComponent>
	<section class="section">
	  <div class="container">
		<div class="columns">
		  <div class="column is-8">
			<div class="has-text-left">
			  <p class="title" v-if="store.state.isConnected"> Welcome back, {{ store.credentials.username
				}} </p>
			  <p>{{ $t('message.appDescription') }}</p>
			</div>
			<div class="expression" id="topExpression" v-if="dayExpression">
			  <h3 class="title boxed-section-title is-4 has-text-left">
				{{ $t('message.dayExpression') }}
			  </h3>
			  <VOneDefinition :is-primary="true" :simpleComponent="false"
							  :expression="dayExpression"></VOneDefinition>
			</div>
			<div class="expression" id="allExpression">
			  <h3 class="title boxed-section-title is-4 has-text-left">
				{{ $t('message.allExpression') }}
			  </h3>
			  <template v-if="definitions">
				<div v-for="(definition, index) in definitions" :key="index">
				  <VOneDefinition :is-primary="false" :simpleComponent="true"
								  :expression="definition"></VOneDefinition>
				</div>
			  </template>
			  <template v-else>
				<VOneDefinition :is-primary="false" :simpleComponent="true"></VOneDefinition>
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
	import AppHeroComponent       from "../components/AppHero.vue"
	import VOneDefinition         from "../components/VOneDefinition"
	import TheSidebar             from "../components/TheSidebar"
	import { API_PATH, ENDPOINT } from "../constants"
	import Store                  from "../store"
	import { Get }                from "../services/request/api.service"
	import Logger                 from "../helpers/logger"
	import { requestBuilder }     from "../helpers/query"
	import EventBus               from '../services/event-bus.js'


	const AppHome = {
		name: "AppHome",
		data() {
			return {
				dayExpression: null,
				store: Store,
				definitions: null,
				test: true
			}
		},
		components: {
			AppHeroComponent,
			VOneDefinition,
			TheSidebar
		},
		methods: {
			async getDayExpression() {
				try {
					const {data: expressionDuJour} = await Get(`${requestBuilder(API_PATH.DAILY_WORD, this.store.language)}`)

					return expressionDuJour
				} catch (e) {
					Logger('AppHome : getDayExpression : ', e.response)
					return null
				}

			},
			async getExpressions(lang) {
				Logger('AppHome : getExpressions : ', this.store)
				try {
					const result = await Get(`${requestBuilder(ENDPOINT.WORDS, lang || this.store.language)}`)

					Logger('AppHome : getExpressions : ', result)
					return result.data
				} catch (e) {
					Logger('AppHome : getExpressions : ', e.response)
					return null
				}
			}
		},
		async created() {
			this.dayExpression = await this.getDayExpression()
			this.definitions = await this.getExpressions()
			const that = this
			EventBus.$on('switchLanguage', async function (lang) {
				Logger('switchLanguage AppHome', that)
				that.definitions = null
				that.definitions = await that.getExpressions(lang)
			})
		}
	}

	export default AppHome
</script>

<style scoped>
  .home {
	background-color: #f6f9fc;
  }

  .expression {
	padding: 40px 0;
  }
</style>
