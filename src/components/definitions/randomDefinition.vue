<template>
    <div class="random-definition">
        <OneDefinition v-if="randomExpression" :expression="randomExpression" :is-primary="true"></OneDefinition>
    </div>
</template>

<script>
    import { Get } from "../../services/api.service"
    import {API_PATH} from "../../constants"
    import OneDefinition from "./OneDefinition"
    import Logger from "../../services/logger"

    export default {
        name: "RandomDefinition",
        components: {OneDefinition},
        data() {
            return {
                randomExpression: null
            }
        },
        beforeMount: async function () {
            try {
                const {data: randomExpression} = await Get(API_PATH.RANDOM_WORD)

                this.randomExpression = randomExpression
                Logger('randomDefinition : BeforeMount : randomExpression', this.randomExpression)
            } catch (e) {
                Logger('randomDefinition : BeforeMount : Error', e.response)
            }
        }
    }
</script>

<style scoped lang="scss"></style>
