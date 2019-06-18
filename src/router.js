import Vue               from "vue"
import Router            from "vue-router"
import AppHome           from "./views/AppHome.vue"
import HealthCheck       from "./views/AppHealthCheck.vue"
import Games             from "./views/games/Games"
import OneDefinition     from "./components/definitions/OneDefinition"
import UpdateDefinitions from "./components/definitions/UpdateDefinitions"
import RandomDefinition from "./components/definitions/randomDefinition"
import AppContact       from "./views/AppContact"
import AppDefinitions   from "./views/AppDefinitions"
import AddDefinitions   from "./components/definitions/AddDefinitions"
import AppLogIn         from "./views/AppLogIn"
import AppSignUp        from "./views/AppSignUp"
import AppDisconnect    from "./views/AppDisconnect"
import AppProfile       from "./views/AppProfile"
import AppNotFound      from "./views/AppNotFound"
import AppDashboard     from "./views/AppDashboard"
import AppPrivacy       from "./views/AppPrivacy"

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
			name: "games",
			component: Games
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
					name: "AddDefinitions",
					component: AddDefinitions
				},
				{
					path: "update",
					component: UpdateDefinitions
				},
				{
					path: "random",
					name: 'random',
					component: RandomDefinition
				},
				{
					path: ":name",
					name: "OneDefinition",
					component: OneDefinition
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
