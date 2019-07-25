import Vue             from "vue"
import Buefy           from "buefy"
import 'buefy/dist/buefy.css'
import App             from "./App.vue"
import router          from "./router"
// @ts-ignore
import VueSocketIO     from "vue-socket.io" // Typescript definition not implemented
import SocketIO        from "socket.io-client"
// @ts-ignore
import VueLocalStorage from 'vue-localstorage' // Typescript definition not implemented
import i18n from './i18n'

const vueSocket = new VueSocketIO({
    debug: true,
    connection: SocketIO('wss://underdico.hdaroit.fr', {
        autoConnect: false,
        reconnection: true
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
