<template>
  <div id="search-component" class="control has-icons-left has-icons-right">
	<!-- Liste de defintions -->
	<div class="content">
	  <ul v-if="resultList">
		<!-- On affiche la liste que si nous avons des résultats -->
		<li
				v-for="(expression, index) in expressions"
				:key="index"
				v-on:click="UIRedirectToDefinition(expression)"
				:to="{ name: 'OneDefinition', params: { name: expression.name } }"
		>
		  {{ expression.name }}
		</li>
	  </ul>
	</div>

	<input
			ref="input"
			id="searchContent"
			class="input is-rounded"
			:class="[border ? 'border-input' : '']"
			@keydown.enter="UIRedirectToDefinition(userInput.name)"
			@keyup="search(userInput.name)"
			type="text"
			:placeholder="$t('search.placeholder')"
			v-model="userInput.name"
	/>
	<!-- Icone de gauche -->
	<span class="icon is-small is-left">
      <i class="fas fa-search"></i>
    </span>
	<!-- Icone de droite -->
	<router-link tag="div" :to="{ name: 'random', params: { isRandom: true } }" class="random-icon">
	  <i class="fas fa-random"></i>
	</router-link>
  </div>
</template>

<script>
  import Logger       from '../helpers/logger'
  import { Get }      from "../services/api.service"
  import { ENDPOINT } from "../constants"

	export default {
		name: "searchComponent",
		props: ["border"],
		data() {
			return {
				userInput: {
					name: null
				},
				rawExpressions: [],
				expressions: []
			}
		},
		methods: {
			search: function(text) {
				if (text.length < 2) return

				const cleanText = JSON.stringify({
					'$regex': text,
					'$options': 'i'
				})

				Logger('SeachComponent : Search : ', cleanText)
				Get(`${ENDPOINT.WORDS}?where={"name": ${cleanText}}`)
					.then((result) => {

						const { data: findedWord } = result

						this.expressions = findedWord

					})
					.catch((err) => {
						Logger('SearchComponent :  Error', err)
					})
			},
			UIRedirectToDefinition(text) {
				Logger('SearchComponent : UIRedirectToDefinition : ', text)
				const expression = text
				// Use to select the first element of suggestion or the user input text
				if (!expression.name) {
					// Todo: idea ? Put a notif
					return this.$router.push({name: "AppHome"})
				}
				return this.$router.push({
					name: "OneDefinition",
					params: { name: expression.name }
				})
			}
		},
		computed: {
			suggestions: function (res) {
				return [{name: "Ok"}]
			},
			resultList: function () {
				return this.suggestions.length !== 0
			}
		},
		mounted() {
			this.rawExpressions = [
				{name: "Tchoin"},
				{name: "Afro-Trap"},
				{name: "Kahwa"},
				{name: "En Esprit"},
				{name: "Etre Stein"},
				{name: "FriendZone"}
			]
		}
	}
</script>

<style scoped lang="scss">
  $myGrey: #7b7b7b;
  #search-component {
	position: relative; // Utiliser pour placer correctement l'icone random
  }

  .input {
	border: none;
	box-shadow: none;
	color: $myGrey;
	font-weight: bold;
  }

  .random-icon {
	position: absolute;
	top: 10px;
	right: 20px;
	cursor: pointer;
	color: #dbdbdb;

	&:hover {
	  color: $myGrey;
	}
  }

  .border-input {
	border: 1px solid $myGrey;
  }

  .content {
	background-color: white;
	width: 93%;
	color: #909090;
	border-width: 0 1px 1px 1px;
	position: absolute;
	top: 2.2em;
	left: 1em;

	ul {
	  list-style-type: none;
	  margin: 0;
	}

	li {
	  padding: 5px;
	  cursor: pointer;

	  &:hover {
		background-color: $myGrey;
		color: white;
	  }
	}
  }
</style>
