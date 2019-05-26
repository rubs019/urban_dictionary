import Vue               from "vue"
import Router            from "vue-router"
import AppHome           from "./views/AppHome.vue"
import HealthCheck       from "./views/AppHealthCheck.vue"
import Games             from "./views/games/Games"
import OneDefinitions    from "./components/definitions/OneDefinitions"
import UpdateDefinitions from "./components/definitions/UpdateDefinitions"
import AppContact        from "./views/AppContact"
import AppDefinitions    from "./views/AppDefinitions"
import AddDefinitions    from "./components/definitions/AddDefinitions"
import AppLogIn          from "./views/AppLogIn"
import AppSignIn         from "./views/AppSignUp"
import AppDisconnect     from "./views/AppDisconnect"
import AppProfile        from "./views/AppProfile"
import AppNotFound       from "./views/AppNotFound"

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
			component: AppSignIn
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
					path: ":name",
					name: "OneDefinition",
					component: OneDefinitions
				}
			]
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
			path: "*",
			name: "AppNotFound",
			component: AppNotFound
		}
	]
})
