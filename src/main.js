import Vue            from "vue"
import Buefy          from "buefy"
import 'buefy/dist/buefy.css'
import infiniteScroll from "vue-infinite-scroll"
import App            from "./App.vue"
import router         from "./router"

Vue.config.productionTip = false

// We use buefy
Vue.use(Buefy)

Vue.use(infiniteScroll)

new Vue({
	router,
	render: h => h(App)
}).$mount("#app")
