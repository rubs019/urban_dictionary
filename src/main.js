import Vue from "vue"
import App from "./App.vue"
import Buefy from "buefy"
import 'buefy/dist/buefy.css'
import router from "./router"

Vue.config.productionTip = false

// We use buefy
Vue.use(Buefy)

/*

  Click outside function
  Use case:  Use to remove search suggestion on searchbar

 */
let handleOutsideClick
Vue.directive("clickOutside", {
  inserted: function(el) {
    console.log("el", el)
  },
  bind(el, binding, vnode) {
    // Here's the click/touchstart handler
    // (it is registered below)
    handleOutsideClick = e => {
      e.stopPropagation()
      // Get the handler method name and the exclude array
      // from the object used in v-closable
      const { handler, exclude } = binding.value
      // This variable indicates if the clicked element is excluded
      let clickedOnExcludedEl = false
      exclude.forEach(refName => {
        // We only run this code if we haven't detected
        // any excluded element yet
        if (!clickedOnExcludedEl) {
          // Get the element using the reference name
          const excludedEl = vnode.context.$refs[refName]
          // See if this excluded element
          // is the same element the user just clicked on
          clickedOnExcludedEl = excludedEl.contains(e.target)
        }
      })
      // We check to see if the clicked element is not
      // the dialog element and not excluded
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        // If the clicked element is outside the dialog
        // and not the button, then call the outside-click handler
        // from the same component this directive is used in
        vnode.context[handler]()
      }
    }
    // Register click/touchstart event listeners on the whole page
    document.addEventListener("click", handleOutsideClick)
    document.addEventListener("touchstart", handleOutsideClick)
  },
  unbind() {
    // If the element that has v-closable is removed, then
    // unbind click/touchstart listeners from the whole page
    document.removeEventListener("click", handleOutsideClick)
    document.removeEventListener("touchstart", handleOutsideClick)
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
