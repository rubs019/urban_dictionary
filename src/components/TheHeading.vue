<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
	  <router-link
			  :to="{ name: 'AppHome' }"
			  class="navbar-item router-link-exact-active"
	  >
		<img :src="logoUrl" alt="">
	  </router-link>

	  <a role="button"
		 class="navbar-burger burger"
		 :class="[burgerMenu ? 'is-active' : '']"
		 aria-label="menu"
		 aria-expanded="true"
		 v-on:click="toggleBurgerMenu()">
		<span aria-hidden="true"></span>
		<span aria-hidden="true"></span>
		<span aria-hidden="true"></span>
	  </a>
	</div>

	<div class="navbar-menu" :class="[burgerMenu ? 'is-active' : '']">
	  <div class="navbar-end">
		<router-link :to="{ name: 'AppHome' }" class="navbar-item">
		  {{ $t('menu_name.home') }}
		</router-link>
		<router-link
				:to="{ name: 'AppLogIn' }"
				class="navbar-item"
				v-if="!Storage.state.isConnected"
		>
		  <p>{{ $t('menu_name.login') }}</p>
		</router-link>
		<router-link v-if="Storage.state.isConnected" :to="{ name: 'VCreateDefinition' }" class="navbar-item">
		  {{ $t('menu_name.create_definition') }}
		</router-link>
		<router-link v-if="Storage.state.isConnected" :to="{ name: 'AppProfile' }" class="navbar-item">
		  {{ $t('menu_name.profile') }}
		</router-link>
		<router-link
				class="navbar-item"
				:to="{ name: 'AppDisconnect' }"
				v-if="Storage.state.isConnected"
		>
		  {{ $t('menu_name.logout') }}
		</router-link>
		<router-link v-if="!Storage.state.isConnected" :to="{ name: 'AppSignUp' }" class="navbar-item">
		  {{ $t('menu_name.signup') }}
		</router-link>
		<router-link v-if="Storage.state.isConnected && Storage.credentials.role === 'Admin'"
					 :to="{ name: 'AppDashboard' }" class="navbar-item">
		  Dashboard
		</router-link>
		<b-dropdown class="navbar-item" aria-role="list" @change="switchLanguage">
		  <button class="is-primary button" type="button" slot="trigger">
			<template v-if="Storage.language === 'en'">
			  <figure class="image is-16x16">
				<img :src="en_ico">
			  </figure>
			  <span>
                English
              </span>
			</template>
			<template v-else>
			  <figure class="image is-16x16">
				<img :src="fr_ico">
			  </figure>
			  <span>
                Francais
              </span>
			</template>
		  </button>

		  <b-dropdown-item value="fr" aria-role="listitem">
			<div class="media">
			  <figure class="image is-16x16">
				<img :src="fr_ico">
			  </figure>
			  <div class="media-content">
				<h3>Francais</h3>
			  </div>
			</div>
		  </b-dropdown-item>

		  <b-dropdown-item value="en" aria-role="listitem">
			<div class="media">
			  <figure class="image is-16x16">
				<img :src="en_ico">
			  </figure>
			  <div class="media-content">
				<h3>English</h3>
			  </div>
			</div>
		  </b-dropdown-item>
		</b-dropdown>

		<div class="navbar-item">
		  <router-link :to="{name: 'AppGames'}" class="button is-info">
			<strong class="has-text-white">{{ $t('menu_name.games') }}</strong>
		  </router-link>
		</div>
	  </div>
	</div>
  </nav>
</template>

<script>
	import { APP_NAME, ENDPOINT } from "../constants"
	import Store                  from "../store"
	import Logger                 from "../helpers/logger"
	import { Patch }              from "../services/request/api.service"
	import DTO                    from "../services/dto/DTO"
	import EventBus               from '../../services/event-bus.js'

	export default {
		name: "TheHeading",
		data() {
			return {
				logoUrl: require('../assets/underdico.png'),
				fr_ico: require('../assets/fr-ico.png'),
				en_ico: require('../assets/uk-ico.png'),
				AppName: APP_NAME,
				Storage: Store,
				burgerMenu: false
			}
		},
		methods: {
			toggleBurgerMenu() {
				this.burgerMenu = !this.burgerMenu
			},
			async switchLanguage(language) {
				try {
					if (Store.state.isConnected) {
						await Patch(`${ENDPOINT.USERS}/${Store.credentials.id}`, DTO.accountPatchInformation({locale: language}))
					}
					EventBus.$emit('switchLanguage', language)
					this.Storage.setUser(language, 'locale')
					this.Storage.setLanguage(language)
				} catch (e) {
					Logger('Error', e)
				}
			}
		},
		mounted() {
			Logger('TheHeading : mounted : credentials', Store.credentials)
		}
	}
</script>

<style scoped lang="scss">
  figure {
	margin-right: 5px;
  }

  .dropdown-item[role="listitem"] {
	display: flex;

	.media {
	  align-items: center;
	}
  }

  .navbar-brand {
	font-size: 2.2em;
  }
</style>
