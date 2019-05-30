<template>
  <div id="search-component" class="control has-icons-left has-icons-right">
	<!-- Liste de defintions -->
	<div class="content">
	  <ul
			  v-if="resultList"
	  >
		<!-- On affiche la liste que si nous avons des résultats -->
		<router-link
				tag="li"
				v-for="(expression, index) in suggestions"
				:key="index"
				:to="{ name: 'OneDefinition', params: { name: expression.name } }"
		>
		  {{ expression.name }}
		</router-link>
	  </ul>
	</div>

	<input
			ref="input"
			id="searchContent"
			class="input is-rounded"
			:class="[border ? 'border-input' : '']"
			v-on:keyup.enter="UIRedirectToDefinition"
			type="text"
			placeholder="Entrer le mot que vous cherchez"
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
	export default {
		name: "searchComponent",
		props: ["border"],
		data() {
			return {
				userInput: {
					name: null
				},
				rawExpressions: []
			}
		},
		methods: {
			filterWithLowerCase: function (rawExpression) {
				return rawExpression.name.toLowerCase() === this.userInput.name
			},
			onClose() {
				this.rawExpressions = []
			},
			UIRedirectToDefinition() {
				const expression = this.suggestions.shift() || this.userInput
				// Use to select the first element of suggestion or the user input text
				if (!expression.name) {
					// Todo: idea ? Put a notif
					return this.$router.push({name: "AppHome"})
				}
				return this.$router.push({
					name: "OneDefinition",
					params: {name: expression.name}
				})
			}
		},
		computed: {
			suggestions: function () {
				// Don't show suggestions lists if no results
				if (this.rawExpressions.length === 0) return []

				// Else filters the results
				return this.rawExpressions.filter(this.filterWithLowerCase)
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
