import Vue            from "vue"
import Buefy          from "buefy"
import 'buefy/dist/buefy.css'
import infiniteScroll from "vue-infinite-scroll"
import App            from "./App.vue"
import router         from "./router"
import VueSocketIO    from "vue-socket.io"

Vue.config.productionTip = false

// We use buefy
Vue.use(Buefy)

// We use Vue Socket
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://underdico.hdaroit.fr',
  options: { path: "/" }
}))

Vue.use(infiniteScroll)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
