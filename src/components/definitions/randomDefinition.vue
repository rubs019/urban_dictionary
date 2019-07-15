<template>
    <div class="random-definition">
        <div v-if="randomExpression">
            <OneDefinition :expression="randomExpression" :is-primary="true"></OneDefinition>
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
                audio: null,
                randomExpression: null
            }
        },
        beforeMount: async function () {
            try {
                const {data: randomExpression} = await Get(API_PATH.RANDOM_WORD)

                this.randomExpression = randomExpression
            } catch (e) {
                Logger('randomDefinition : BeforeMount : Error', e.response)
            }
        }
    }
</script>

<style scoped lang="scss"></style>
