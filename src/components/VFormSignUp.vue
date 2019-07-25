<template>
    <div class="tile is-parent notification is-white">
        <div class="tile is-child">
            <p class="title">S'inscrire</p>
            <div class="subtitle">
                <div class="columns">
                    <div class="column is-10 is-offset-1">
                        <div class="columns">
                            <div class="column is-12">
                                <template v-if="message">
                                    <article class="is-size-6 message"
                                             :class="[color ? `is-${color}` : '']">
                                        <div class="message-body">
                                            {{ message }}
                                        </div>
                                    </article>
                                </template>
                                <form @submit.prevent="register">
                                    <div class="content has-text-left" v-if="user">
                                        <b-field grouped>
                                            <b-field :label="$t('form.username')" expanded>
                                                <b-input id="login" v-model="user.login"></b-input>
                                            </b-field>

                                            <b-field label="Language">
                                                <b-select placeholder="Language" icon-pack="fa" icon="globe" v-model="user.locale">
                                                    <option
                                                            v-for="(langue, index) in languages"
                                                            :value="langue"
                                                            :key="index">
                                                        {{ langue.toUpperCase() }}
                                                    </option>
                                                </b-select>
                                            </b-field>
                                        </b-field>

                                        <b-field :label="$t('form.email')">
                                            <b-input id="email" type="email" v-model="user.email"></b-input>
                                        </b-field>

                                        <b-field grouped>
                                            <b-field :label="$t('form.password')"
                                                     :type="{'is-danger': error.pwd}"
                                                     expanded
                                                     :message="[
                                {'Password must have at least 6 characters': error.pwd}
                               ]">
                                                <b-input id="pwd"
                                                         expanded
                                                         type="password"
                                                         v-model="user.pwd"
                                                         icon-pack="fas"
                                                         password-reveal></b-input>
                                            </b-field>

                                            <b-field :label="$t('form.confirmPassword')">
                                                <b-input id="pwd2" type="password" v-model="user.pwd2"></b-input>
                                            </b-field>
                                        </b-field>
                                    </div>
                                    <b-button
                                            id="sendBtn"
                                            type="is-primary"
                                            rounded
                                            class="is-pulled-right"
                                            native-type="submit"
                                            :loading="status === Status.PENDING"
                                    >{{ $t('menu_name.signup') }}
                                    </b-button
                                    >
                                    <div class="content is-pulled-left">
                                        <router-link :to="{ name: 'AppLogIn' }" class="is-size-7"
                                        >{{ $t('form.alreadyAccount') }}
                                        </router-link
                                        >
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

	import { STATUS } from "../constants"
    import Store      from "../store"
    import Logger     from "../helpers/logger"


	export default {
		name: "VFormSignUp",
		props: {
			message: String,
			color: String,
			status: Number
		},
		data: function () {
			return {
				Status: STATUS,
                fr_ico: require('../assets/fr-ico.png'),
                en_ico: require('../assets/uk-ico.png'),
                languages: ['fr', 'en'],
				error: {
					login: false,
					pwd: false
				},
				user: {
					login: "Ruben",
					email: "ruben.desert@gmail.com",
					pwd: "testtest",
					pwd2: "testtesty",
                    locale: Store.language
				}
			}
		},
		methods: {
			register: function() {
			    Logger('FormSignUp : Register : ', this.user)
				this.$emit("tryRegister", this.user)
			}
		}
	}
</script>

<style scoped></style>
