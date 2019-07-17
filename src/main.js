import Vue             from "vue"
import Buefy           from "buefy"
import 'buefy/dist/buefy.css'
import App             from "./App.vue"
import router          from "./router"
import VueSocketIO     from "vue-socket.io"
import SocketIO        from "socket.io-client"
import VueLocalStorage from 'vue-localstorage'
import i18n from './i18n'

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

Vue.use(VueLocalStorage)

Vue.use(vueSocket)

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount("#app")
