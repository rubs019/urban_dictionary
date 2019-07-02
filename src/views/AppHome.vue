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
                            <p> {{ AppDescription }}</p>
                        </div>
                        <div class="expression" id="topExpression" v-if="dayExpression">
                            <h3 class="title boxed-section-title is-4 has-text-left">
                                Expression du jour
                            </h3>
                            <OneDefinition :is-primary="true" :simpleComponent="false"
                                           :expression="dayExpression"></OneDefinition>
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
    import AppHeroComponent from "../components/AppHeroComponent.vue"
    import OneDefinition from "../components/definitions/OneDefinition"
    import TheSidebar from "../components/generic/TheSidebar"
    import {API_PATH, ENDPOINT, APP_DESCRIPTION} from "../constants"
    import Store from "../store"
    import {Get} from "../services/api.service"
    import Logger from "../services/logger"

    export default {
        name: "AppHome",
        data() {
            return {
                dayExpression: null,
                store: Store,
                AppDescription: APP_DESCRIPTION,
                definitions: null,
                busyScroll: false
            }
        },
        components: {
            AppHeroComponent,
            OneDefinition,
            TheSidebar
        },
        methods: {
            async getDayExpression() {
                try {
                    const {data: expressionDuJour} = await Get(API_PATH.DAILY_WORD)

                    return expressionDuJour
                } catch (e) {
                    Logger('AppHome : getDayExpression : ', e.response)
                    return null
                }

            },
            async getExpressions() {
                try {
                    const result = await Get(`${ENDPOINT.WORDS}`)

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
