<template>
    <div class="random-definition">
        <div class="tile is-parent">
            <b-button v-on:click="fetchRandomExpression">Random</b-button>
        </div>
        <div v-if="randomExpression">
            <OneDefinition :key="id" :expression="randomExpression" :is-primary="true"></OneDefinition>
        </div>
        <template v-else>
            <div class="tile is-parent">
                <article class="tile is-child notification is-primary">
                    <p class="title">Chargement...</p><span class="loader"></span>
                    <p class="subtitle left"></p>
                </article>
            </div>
        </template>
    </div>
</template>

<script>
    import { Get }                from "../../services/api.service"
    import { API_PATH } from "../../constants"
    import OneDefinition          from "./OneDefinition"
    import Logger                 from "../../services/logger"

    export default {
        name: "RandomDefinition",
        components: {OneDefinition},
        data() {
            return {
                id: 1,
                audio: null,
                randomExpression: null
            }
        },
        methods: {
            async fetchRandomExpression() {
                try {
                    const {data: randomExpression} = await Get(API_PATH.RANDOM_WORD)

                    this.randomExpression = randomExpression
                    this.id++
                } catch (e) {
                    Logger('randomDefinition : BeforeMount : Error', e.response)
                }
            }
        },
        beforeMount: async function () {
            this.fetchRandomExpression()
        }
    }
</script>

<style scoped lang="scss"></style>
