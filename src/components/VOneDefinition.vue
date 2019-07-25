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
			</div>
			<div v-if="audio" class="has-text-left">
			  <audio v-if="!simpleComponent" controls>
				<source :src="audio" type="audio/mpeg">
			  </audio>
			</div>
			<router-link
					v-if="definition && definition.user && definition.user.id"
					tag="p"
					class="subtitle has-text-left is-size-6"
					:to="{ name: 'AppProfileOtherUser', params: { id: definition.user.id } }">Ecrit par <span
					class="userLink">@{{ definition.user.username }}</span>
			</router-link>
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
              <BaseLabel :name="label" :colors="!!simpleComponent"></BaseLabel>
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
	import BaseVoteHorizontal from "./BaseVote"
	import BaseLabel          from "./BaseLabel"
	import { Get }            from "../services/request/api.service"
	import Logger             from "../helpers/logger"
	import { ENDPOINT }       from "../constants"
	import stringify          from "../helpers/stringifyText"
	import BMessage           from "buefy/src/components/message/Message"

	export default {
		name: "VOneDefinition",
		components: {BMessage, BaseVoteHorizontal, BaseLabel},
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
			Logger('VOneDefinition : BeforeMount : randomExpression', name)
			if (name) {
				Get(`${ENDPOINT.WORDS}?where={"name": ${stringify(name)}}`)
					.then(result => {
						this.definition = Array.isArray(result.data) && result.data.length > 0 ? result.data[0] : false
						this.audio = this.definition.hasAudio ? `${process.env.VUE_APP_API_PROD}/${ENDPOINT.WORDS}/${this.definition.id}/audio` : false
					})
					.then(res => {
						Logger('VOneDefinition : BeforeMount : randomExpression', res)
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
				Logger("VOneDefinition : beforeMount : Expression was not found")
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

  .userLink {
	cursor: pointer;
  }
</style>
