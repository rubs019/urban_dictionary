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
		<span>{{ $t('message.createDefinition') }}</span>
	  </router-link>
	</div>
	<div class="tile is-parent">
	  <router-link
			  :to="{ name: 'AppGames' }"
			  class="button is-primary is-fullwidth"
	  >
                  <span class="icon">
                    <i class="fas fa-star"></i>
                  </span>
		<p>{{ $t('message.launchGame') }}</p>
	  </router-link>
	</div>
	<div class="tile is-parent">
	  <b-tabs type="is-toggle" expanded style="padding: 0 !important;">
		<b-tab-item :label="$t('rankingExpression.topLabel')">
		  <TopExpressions
				  :expressions="topExpressions"
				  :name-top="$t('rankingExpression.topLabel')"
				  v-bind:url="'OneDefinition'"
		  ></TopExpressions>
		</b-tab-item>
		<b-tab-item :label="$t('rankingExpression.dayTopLabel')">
		  <TopExpressions
				  :expressions="dayTopExpressions"
				  :name-top="$t('rankingExpression.dayTopLabel')"
				  v-bind:url="'OneDefinition'"
		  ></TopExpressions>
		</b-tab-item>
		<b-tab-item :label="$t('rankingExpression.weekTopLabel')">
		  <TopExpressions
				  :name-top="$t('rankingExpression.weekTopLabel')"
				  :expressions="weekTopExpressions"
				  v-bind:url="'OneDefinition'"
		  ></TopExpressions>
		</b-tab-item>
	  </b-tabs>
	</div>
  </div>
</template>

<script>
	import TopExpressions                                         from "../TopExpressionsComponent"
	import Store                                                  from "../../store"
	import Logger                                                 from "../../services/logger"
	import { Get }                                                from '../../services/api.service'
	import { ENDPOINT }                                           from '../../constants'
	import { getDayTopRequest, getTopRequest, getWeekTopRequest } from '../../services/query'

	export default {
		name: "TheSidebar",
		components: {TopExpressions},
		data: () => ({
			store: Store,
			weekTopExpressions: null,
			topExpressions: null,
			dayTopExpressions: null
		}),
		methods: {
			async fetchTop() {
				try {
					const weekTopRequest = getWeekTopRequest(this.store.language)
					const topRequest = getTopRequest(this.store.language)
					const dayTopRequest = getDayTopRequest(this.store.language)

					const {data: weekTopDefinitions} = await Get(ENDPOINT.WORDS + weekTopRequest)
					this.weekTopExpressions = weekTopDefinitions

					const {data: topExpressions} = await Get(ENDPOINT.WORDS + topRequest)
					this.topExpressions = topExpressions

					const {data: dayTopExpression} = await Get(ENDPOINT.WORDS + dayTopRequest)
					this.dayTopExpressions = dayTopExpression
				} catch (e) {
					Logger('TheSidebar : FetchTop : Error', e)
				}
			}
		},
		async created() {
			await this.fetchTop()
		}
	}
</script>

<style scoped>
  section {
	padding: 0 !important;
  }
</style>
