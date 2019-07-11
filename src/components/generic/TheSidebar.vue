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
                    :to="{ name: 'AppGames' }"
                    class="button is-primary is-fullwidth"
            >
                  <span class="icon">
                    <i class="fas fa-star"></i>
                  </span>
                <p>Lancer une partie</p>
            </router-link>
        </div>
        <div class="tile is-parent">
            <b-tabs type="is-toggle" expanded style="padding: 0 !important;">
                <b-tab-item label="Top">
                    <TopExpressions
                            :expressions="topExpressions"
                            :name-top="'Top Expression'"
                            v-bind:url="'OneDefinition'"
                    ></TopExpressions>
                </b-tab-item>
                <b-tab-item label="Top jours">
                    <TopExpressions
                            :expressions="dayTopExpressions"
                            :name-top="'Top du jour'"
                            v-bind:url="'OneDefinition'"
                    ></TopExpressions>
                </b-tab-item>
                <b-tab-item label="Top semaine">
                    <TopExpressions
                            :name-top="'Top semaine'"
                            :expressions="weekTopExpressions"
                            v-bind:url="'OneDefinition'"
                    ></TopExpressions>
                </b-tab-item>
            </b-tabs>
        </div>
    </div>
</template>

<script>
    import TopExpressions from "../TopExpressionsComponent"
    import Store from "../../store"
    import Logger from "../../services/logger"
    import {Get} from '../../services/api.service'
    import {ENDPOINT} from '../../constants'
    import {getDayTopRequest, getTopRequest, getWeekTopRequest} from '../../services/request'

    export default {
        name: "TheSidebar",
        components: {TopExpressions},
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
            weekTopExpressions: null,
            dayTopExpressions: null,
            topExpressions: null,
            store: Store
        }),
        methods: {
            async fetchTop() {
                try {
                    const weekTopRequest = getWeekTopRequest()
                    const topRequest = getTopRequest()
                    const dayTopRequest = getDayTopRequest()

                    const { data: weekTopDefinitions } = await Get(ENDPOINT.WORDS + weekTopRequest)
                    this.weekTopExpressions = weekTopDefinitions
                    Logger('TheSidebar : FetchTop : weekTopExpressions', this.weekTopExpressions)

                    const { data: topExpressions} = await Get(ENDPOINT.WORDS + topRequest)
                    this.topExpressions = topExpressions
                    Logger('TheSidebar : FetchTop : topExpressions', this.topExpressions)

                    const { data: dayTopExpression } = await Get(ENDPOINT.WORDS + dayTopRequest)
                    this.dayTopExpressions = dayTopExpression
                    Logger('TheSidebar : FetchTop : dayTopExpressions', this.dayTopExpressions)
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
