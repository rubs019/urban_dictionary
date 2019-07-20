<template>
  <div class="one-definitions">
	<transition name="component-fade" mode="out-in">
	  <template v-if="definition">
		<div class="tile is-vertical is-parent">
		  <article
				  class="tile is-child notification"
				  v-bind:class="[isPrimary ? 'is-primary' : ''  ]">
			<div class="level">
			  <div class="level-left">
				<div class="item">
				  <router-link
						  class="title"
						  :to="{ name: 'OneDefinition', params: { name: definition.name } }">{{ definition.name }}
				  </router-link>
				</div>
				<div v-if="audio && simpleComponent">
				  <audio controls>
					<source :src="audio" type="audio/mpeg">
				  </audio>
				</div>
			  </div>
			  <div class="level-right">
				<div class="dropdown is-hoverable">
				  <div class="dropdown-trigger">
					<div
							class="dropdown-definition"
							aria-haspopup="true"
							aria-controls="dropdown-menu4"
					>
                        <span class="icon">
                          <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
					</div>
				  </div>
				  <div class="dropdown-menu" id="dropdown-menu4" role="menu">
					<div class="dropdown-content">
					  <a href="#" class="dropdown-item">
                      <span class="icon">
                          <i class="fas fa-flag" aria-hidden="true"></i>
                        </span>
						Autre langue
					  </a>
					  <a href="#" class="dropdown-item">
                      <span class="icon">
                        <i class="fas fa-book"></i>
                      </span>
						Proposez une définition
					  </a>
					</div>
				  </div>
				</div>
			  </div>
			</div>
			<div v-if="audio" class="has-text-left">
			  <audio v-if="!simpleComponent" controls>
				<source :src="audio" type="audio/mpeg">
			  </audio>
			</div>
			<!--	COnditional rendering usernames	  -->
			<p id="userLink" class="subtitle has-text-left is-size-6"
			   v-if="definition && definition.user && definition.user.username">Ecrit par @{{
			  definition.user.username }}
			</p>
			<b-message type="is-primary">
			  <b class="is-size-5">{{ definition.definition }}</b>
			  <section class="example">
				<b-message v-if="expression.example">
				  <span class="subtile">Example : </span>
				  <!-- Example -->
				  "{{ definition.example }}"
				</b-message>
			  </section>
			</b-message>

			<div id="tag-items" class="has-text-left">
            <span id="label-items" v-for="(label, index) in definition.tags" :key="index">
              <BaseTagLabel :name="label" :colors="!!simpleComponent"></BaseTagLabel>
            </span>
			</div>
			<BaseVoteHorizontal :expression="definition"></BaseVoteHorizontal>
		  </article>
		</div>

	  </template>
	  <template v-else-if="definition === false">
		<div class="tile is-parent">
		  <article class="tile is-child notification is-primary">
			<p class="title">Oups...</p>
			<p class="subtitle has-text-left">Il n'existe pas d'expression</p>
		  </article>
		</div>
	  </template>
	  <template v-else>
		<div class="tile is-parent">
		  <article class="tile is-child notification is-primary">
			<p class="title">Chargement...</p><span class="loader"></span>
			<p class="subtitle left"></p>
		  </article>
		</div>
	  </template>
	</transition>

  </div>
</template>

<script>
	import BaseVoteHorizontal from "./BaseVoteHorizontal"
	import BaseTagLabel       from "../tag/BaseTagLabel"
	import { Get }            from "../../services/api.service"
	import Logger             from "../../services/logger"
	import { ENDPOINT }       from "../../constants"
	import stringify          from "../../helpers/stringifyText"
	import BMessage           from "buefy/src/components/message/Message"

	export default {
		name: "OneDefinition",
		components: {BMessage, BaseVoteHorizontal, BaseTagLabel},
		props: {
			isPrimary: Boolean,
			simpleComponent: Boolean,
			expression: [Object, Boolean]
		},
		data: function () {
			return {
				definition: this.expression,
				audio: null,
				voiceRecord: new MediaStream(),
				headers: {}
			}
		},
		methods: {},
		beforeMount() {
			const name = this.$route && this.$route.params ? this.$route.params.name : undefined
			Logger('OneDefinition : BeforeMount : randomExpression', name)
			if (name) {
				Get(`${ENDPOINT.WORDS}?where={"name": ${stringify(name)}}`)
					.then(result => {
						this.definition = Array.isArray(result.data) && result.data.length > 0 ? result.data[0] : false
						this.audio = this.definition.hasAudio ? `${process.env.VUE_APP_API_PROD}/${ENDPOINT.WORDS}/${this.definition.id}/audio` : false
					})
					.then(res => {
						Logger('OneDefinition : BeforeMount : randomExpression', res)
					})
					.catch(error => {
						Logger('Error', error)
					})
			} else {
				if (this.expression) {
					this.definition = this.expression
					Logger('this.definition.hasAudio', this.definition.hasAudio)
					this.audio = this.definition.hasAudio ? `${process.env.VUE_APP_API_PROD}/${ENDPOINT.WORDS}/${this.definition.id}/audio` : false
					return
				}
				Logger("OneDefinition : beforeMount : Expression was not found")
			}
		},
		async beforeRouteUpdate(to, from, next) {
			Get(`${ENDPOINT.WORDS}?where={"name": ${stringify(to.params.name)}}`)
				.then(async result => {
					this.definition = Array.isArray(result.data) && result.data.length > 0 ? result.data[0] : false
					this.audio = `${process.env.VUE_APP_API_PROD}/${ENDPOINT.WORDS}/${this.definition.id}/audio`
				})
				.catch(error => {
					Logger('Error', error)
				})
			next()
		}
	}
</script>

<style scoped lang="scss">
  .justify-column {
	flex-direction: column;
  }

  .media {
	border: 1px solid #e1e1e1;
	box-shadow: 0 1px 0 0 #e1e1e1;
	border-radius: 4px;
	padding: 5px;
  }

  .media .content:not(:last-child) {
	margin: 0;
  }

  .loading {
	display: block;
  }

  .title,
  .subTitle {
	text-align: left;
  }

  .dropdown-definition {
	cursor: pointer;
  }

  #tag-items {
	margin: 5px 0;

	span {
	  margin: 0 .2em;
	}
  }

  .example {
	margin-top: 5px;
  }

  .fade-enter-active, .component-fade-leave-active {
	transition: opacity .3s ease;
  }

  .fade-enter, .component-fade-leave-to
	/* .component-fade-leave-active avant la 2.1.8 */
  {
	opacity: 0;
  }
</style>
