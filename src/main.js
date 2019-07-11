import Vue from "vue"
import Buefy from "buefy"
import 'buefy/dist/buefy.css'
import infiniteScroll from "vue-infinite-scroll"
import App from "./App.vue"
import router from "./router"
import VueSocketIO from "vue-socket.io"
import SocketIO from "socket.io-client"

const vueSocket = new VueSocketIO({
    debug: true,
    connection: SocketIO('wss://underdico.hdaroit.fr', {
        autoConnect: false,
        reconnection: false
    })
})

Vue.config.productionTip = false

// We use buefy
Vue.use(Buefy)

Vue.use(infiniteScroll)

Vue.use(vueSocket)

new Vue({
    router,
    render: h => h(App)
}).$mount("#app")
