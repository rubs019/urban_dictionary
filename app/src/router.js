import Vue from "vue";
import Router from "vue-router";
import Home from "./views/AppHome.vue";
import HealthCheck from "./views/AppHealthCheck.vue";
import Games from "./views/games/Games";
import OneDefinitions from "./components/definitions/OneDefinitions";
import UpdateDefinitions from "./components/definitions/UpdateDefinitions";
import ListDefinitions from "./components/definitions/ListDefinitions";
import InscriptionPage from "./views/inscription/InscriptionPage";
import AppContact from "./views/AppContact";
import AppDefinitions from "./views/AppDefinitions";
import AddDefinitions from "./components/definitions/AddDefinitions";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "AppHome",
      component: Home
    },
    {
      path: "/contact",
      name: "AppContact",
      component: AppContact
    },
    {
      path: "/games",
      name: "games",
      component: Games
    },
    {
      path: "/definitions",
      name: "AppDefinitions",
      component: AppDefinitions,
      children: [
        {
          path: "/",
          name: "ListDefinitions",
          component: ListDefinitions
        },
        {
          path: "new",
          component: AddDefinitions
        },
        {
          path: "update",
          component: UpdateDefinitions
        },
        {
          path: ":name",
          name: "OneDefinition",
          component: OneDefinitions
        }
      ]
    },
    {
      path: "/inscription",
      name: "inscription",
      component: InscriptionPage
    },
    {
      path: "/healthcheck",
      name: "AppHealthCheck",
      component: HealthCheck
    },
    {
      path: "/about",
      name: "AppAbout",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/AppAbout.vue")
    }
  ]
});
