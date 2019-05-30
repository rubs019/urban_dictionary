<template>
  <div class="one-definitions">

	<template v-if="expression">
	  <div class="tile is-parent">
		<article
				class="tile is-child notification"
				v-bind:class="[isPrimary ? 'is-primary' : ''  ]">
		  <div class="level">
			<div class="level-left">
			  <div class="item">
				<router-link
						class="title"
						:to="{ name: 'OneDefinition', params: { name: expression.name } }">{{ expression.name }}
				</router-link>
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
					<a href="" class="dropdown-item">
                      <span class="icon">
                        <i class="fas fa-volume-up"></i>
                      </span>
					  Ecouter l'audio
					</a>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		  <router-link
				  tag="p"
				  class="subtitle has-text-left is-size-6"
				  v-if="!simpleComponent"
				  :to="{ name: 'OneDefintion', params: { name: expression.accountId } }">@{{ expression.accountId }}
		  </router-link>
		  <div class="content has-text-left">
			<!-- Content -->
			{{ expression.definition }}
		  </div>
		  <div id="tag-items" class="has-text-left">
            <span id="label-items" v-for="(label, index) in expression.tags" :key="index">
              <BaseTagLabel :name="label" :colors="!!simpleComponent"></BaseTagLabel>
            </span>
		  </div>
		  <BaseVoteHorizontal :nb-vote="definition ? definition.score : 92 "></BaseVoteHorizontal>
		</article>
	  </div>
	</template>

	<template v-else-if="expression === false">
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

  </div>
</template>

<script>
	import BaseVoteHorizontal from "./BaseVoteHorizontal"
	import BaseTagLabel       from "../tag/BaseTagLabel"

	export default {
		name: "OneDefinition",
		components: {BaseVoteHorizontal, BaseTagLabel},
		props: {
			isPrimary: Boolean,
			simpleComponent: Boolean,
			expression: [Object, Boolean]
		},
		data: function() {
			return {
				definition: this.expression
			}
		}
	}
</script>

<style scoped lang="scss">
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

  p {
	cursor: pointer;
  }

  #tag-items {
	margin: 5px 0;

	span {
	  margin: 0 .2em;
	}
  }
</style>
