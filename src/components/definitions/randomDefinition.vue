<template>
  <div class="random-definition">
	<OneDefinition :expression="randomExpression" :is-primary="true"></OneDefinition>
  </div>
</template>

<script>
	import { Get }       from "../../services/api.service"
	import { API_PATH }  from "../../constants"
	import OneDefinition from "./OneDefinition"
	import Logger        from "../../services/logger"

<<<<<<< HEAD
export default {
  name: "RandomDefinition",
  components: {OneDefinition},
  data() {
    return {
      randomExpression: null
    }
  },
  beforeMount: async function() {
    console.log('OneDefinition : BeforeMount : this.$route.params', this.$route.params)
    if (this.$route.params.isRandom) {
      try {
        const { data : randomExpression } = await Get(API_PATH.RANDOM_WORD)

        console.log(randomExpression)
        this.randomExpression = randomExpression
      } catch(e) {
        console.log('OneDefinition : BeforeMount : Error', e.response)
      }
    }
  },
}
=======
	export default {
		name: "RandomDefinition",
		components: {OneDefinition},
		data() {
			return {
				randomExpression: null
			}
		},
		beforeMount: async function () {
			Logger('OneDefinition : Component : BeforeMount', this.$route.params)
			if (this.$route.params.isRandom) {
				try {
					const {data: randomExpression} = await Get(API_PATH.RANDOM_WORD)

					Logger(randomExpression)
					this.randomExpression = randomExpression
				} catch (e) {
					Logger('OneDefinition : Component : BeforeMount', e.response)
				}
			}
		},
	}
>>>>>>> (feat): add production logger
</script>

<style scoped lang="scss"></style>
