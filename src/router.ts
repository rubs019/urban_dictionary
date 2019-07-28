import Vue from "vue"
import Router from "vue-router"
import AppHome from "./views/AppHome"
import HealthCheck from "./views/AppHealthCheck.vue"
import VOneDefinition from "./components/VOneDefinition.vue"
import UpdateDefinitions from "./components/UpdateDefinitions.vue"
import VRandomDefinition from "./components/VRandomDefinition.vue"
import VCreateDefinition from "./components/VCreateDefinition.vue"
import AppContact from "./views/AppContact"
import AppGamesHome from "./views/AppGames.vue"
import AppGamesPlayground from "./views/AppGamesPlayground.vue"
import AppLogIn from "@/views/AppLogIn.vue"
import AppSignUp from "@/views/AppSignUp.vue"
import AppDisconnect from "@/views/AppDisconnect.vue"
import AppProfile from "@/views/AppProfile.vue"
import AppDashboard from "@/views/AppDashboard.vue"
import AppProfileOtherUser from "@/views/AppProfileOtherUser.vue"
import AppDefinitions from "@/views/AppDefinitions.vue"
import AppPrivacy from "@/views/AppPrivacy.vue"
import AppNotFound from "@/views/AppNotFound.vue"

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "AppHome",
            component: AppHome
        },
        {
            path: "/contact",
            name: "AppContact",
            component: AppContact
        },
        {
            path: "/games",
            name: "AppGames",
            component: AppGamesHome
        },
        {
            path: "/games/:id",
            name: 'AppGamesPlayground',
            component: AppGamesPlayground
        },
        {
            path: "/games/private/:id",
            name: 'AppGamesPlayground',
            component: AppGamesPlayground
        },
        {
            path: "/login",
            name: "AppLogIn",
            component: AppLogIn
        },
        {
            path: "/signup",
            name: "AppSignUp",
            component: AppSignUp
        },
        {
            path: "/disconnect",
            name: "AppDisconnect",
            component: AppDisconnect
        },
        {
            path: "/profile",
            name: "AppProfile",
            component: AppProfile
        },
        {
            path: "/profile/:id",
            name: "AppProfileOtherUser",
            props: true,
            component: AppProfileOtherUser
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
        },
        {
            path: "/definitions",
            name: "AppDefinitions",
            component: AppDefinitions,
            children: [
                {
                    path: "new",
                    name: "VCreateDefinition",
                    component: VCreateDefinition
                },
                {
                    path: "update",
                    component: UpdateDefinitions
                },
                {
                    path: "random",
                    name: 'random',
                    component: VRandomDefinition
                },
                {
                    path: ":name",
                    name: "VOneDefinition",
                    component: VOneDefinition
                }
            ]
        },
        {
            path: "/dashboard",
            name: "AppDashboard",
            component: AppDashboard
        },
        {
            path: "/policy",
            name: "AppPrivacy",
            component: AppPrivacy
        },
        {
            path: "*",
            name: "AppNotFound",
            component: AppNotFound
        }
    ]
})
