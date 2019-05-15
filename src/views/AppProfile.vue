<template>
    <div id="AppProfile">
        <AppHeroComponent></AppHeroComponent>
        <div class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-8">
                        <div class="notification is-primary">
                            <p class="title has-text-left">Mon profil</p>
                            <div class="notification is-white">
                                <b-tabs size="is-medium" type="is-boxed" expanded animated>
                                    <b-tab-item label="Mes informations">
                                        <ProfileInformations @updateUserInformation="updateUser" v-if="store" :credentials="store.credentials"></ProfileInformations>
                                    </b-tab-item>

                                    <b-tab-item icon-pack="fas" icon="book">
                                        <template slot="header">
                                            <b-icon icon="information-outline"></b-icon>
                                            <span> Mes définitions <b-tag rounded> 3 </b-tag> </span>
                                        </template>
                                        <ProfileDefinitions></ProfileDefinitions>
                                    </b-tab-item>

                                    <b-tab-item label="Videos" disabled>
                                        Nunc nec velit nec libero vestibulum eleifend.
                                        Curabitur pulvinar congue luctus.
                                        Nullam hendrerit iaculis augue vitae ornare.
                                        Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
                                    </b-tab-item>
                                </b-tabs>
                            </div>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="tile is-vertical">
                            <div class="tile is-parent">
                                <article class="tile is-child notification">
                                    <p class="title">Vous...</p>
                                    <p class="subtitle">Une image de vous...</p>
                                    <figure class="image is-4by3">
                                        <img class="is-rounded" src="http://cdn.onlinewebfonts.com/svg/img_504570.png">
                                    </figure>
                                     <div class="button is-primary">
                                         Changer de photo ?
                                     </div>
                                </article>
                            </div>
                            <div class="tile is-parent">
                                <article class="tile is-child notification is-primary">
                                    <p class="subtitle">Votre score actuel est de</p>
                                    <p class="title">
                                    <span class="icon">
                                        <i class="fas fa-star fa-1x"></i>
                                    </span>
                                        423
                                    </p>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import Store               from "../store"
    import AppHeroComponent    from "../components/AppHeroComponent"
	import ProfileInformations from "../components/profile/ProfileInformations"
	import ProfileDefinitions  from "../components/profile/ProfileDefinitions"
    import { patch }           from "../services/api.service"
	import { ENDPOINT }        from "../constants"
	import DTO                 from "../services/DTO"

	export default {
		name: "AppProfile",
		data() {
			return {
				showBooks: false,
                store: null
			}
		},
        methods: {
			async updateUser(user) {
                try {
					const result = await patch(`${ENDPOINT.ACCOUNTS}/${Store.credentials.id}`, DTO.accountPatchInformation(user))

                    Store.setUser(result.data.username, 'username')
                    Store.setUser(result.data.email, 'email')

                } catch (e) {
					console.log('AppProfile : updateUser : ', e.response)
                }

            }
        },
        components: { AppHeroComponent, ProfileDefinitions, ProfileInformations },
        beforeCreate() {
			if (!Store.state.isConnected) {
				this.$router.push('/')
            }
		},
        beforeMount() {
			this.store = Store
		}
	}
</script>

<style scoped>
</style>
