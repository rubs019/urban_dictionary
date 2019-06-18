<template>
  <div class="add-definitions">
	<div class="columns">
	  <div class="column">
		<div class="tile is-parent notification is-white">
		  <div class="tile is-child">
			<p class="title has-text-left">Créer une nouvelle expression</p>
			<hr/>
			<div class="subtitle">
			  <div class="content has-text-left">
				<p>Ici vous pouvez créer vos propres définitions et les partager à tout le monde !</p>
				<p class="is-size-6">Que cela soit une expression propre à votre ville, à votre région,
				  ou votre pays, nous récoltons toutes
				  les expressions possible dans l'objectif de partager ces connaissances</p>
			  </div>
			  <div class="column">
				<template>
				  <div class="notification has-text-left ">
					<template>
					  <section>
						<form @submit.prevent="sendExpression">
						  <b-field label="Nom de l'expression">
							<b-input v-model="definition.name"></b-input>
						  </b-field>

						  <b-field label="Description de la définition">
							<b-input maxlength="200" type="textarea"
									 v-model="definition.description"></b-input>
						  </b-field>

						  <b-field label="Ajoutez des tags">
							<b-taginput
									v-model="definition.tags"
									ellipsis
									icon="label"
									placeholder="Add a tag">
							</b-taginput>
						  </b-field>

						  <div class="has-text-right">
							<b-button native-type="submit"
									  :loading="formStatus === Status.PENDING"
									  type="is-primary" icon-pack="fas"
									  icon-left="paper-plane">Ajouter cette définition
							</b-button>
						  </div>
						</form>
					  </section>
					</template>
				  </div>
				</template>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
	import { Post }                     from "../../services/api.service"
	import { ENDPOINT, STATUS }         from "../../constants"
	import DTO                          from "../../services/DTO"
	import Logger                       from "../../services/logger"
	import STORE                        from "../../store"
	import { errorToast, successToast } from "../../helpers/toast"


	export default {
		name: "AddDefinitions",
		data() {
			return {
				Status: STATUS,
				formStatus: STATUS.DEFAULT,
				definition: {
					name: "Bleus",
					description: "Expression argotique signifiant la police",
					tags: [
						'Police',
						'Keuf',
						'Urbain'
					]
				},
			}
		},
		methods: {
			cleanForm() {
				this.definition.name = null
				this.definition.tags = []
				this.definition.description = null
			},
			async sendExpression() {
				this.formStatus = STATUS.PENDING
				Logger('definition', this.definition)

				try {
					// Token require
					const result = await Post(
						ENDPOINT.WORDS,
						DTO.addDefinition(this.definition),
						{ token: STORE.credentials.token }
					)

					setTimeout(() => {
						this.formStatus = STATUS.SUCCESS
						successToast(this, "L'expression à bien été ajoutée")
						this.cleanForm()
					}, 1500)
					Logger('AddDefinitions: result', result)
				} catch (e) {
					Logger('AddDefinitions: Error: ', e.response)
					this.formStatus = STATUS.ERROR
					if (e.response.status === 422) {
						errorToast(this, "Les champs ne doivent pas être vides")
						return
					}
					errorToast("Une erreur s'est produite")
				}
			}
		}
	}
</script>

<style scoped lang="scss">
  p.title {
	margin: 14px;
  }
</style>
