<template>
    <div class="add-definitions">
        <div class="columns">
            <div class="column">
                <div class="tile is-parent notification is-white">
                    <div class="tile is-child">
                        <p class="title has-text-left">Créer une nouvelle expression</p>
                        <hr />
                        <div class="subtitle">
                            <div class="content has-text-left">
                                <p>Ici vous pouvez créer vos propres définitions et les partager à tout le monde !</p>
                                <p class="is-size-6">Que cela soit une expression propre à votre ville, à votre région, ou votre pays, nous récoltons toutes
                                    les expressions possible dans l'objectif de partager ces connaissances</p>
                            </div>
                            <div class="column">
                                <template>
                                    <div class="notification has-text-left ">
                                        <template>

                                            <div class="notification is-danger" v-if="formStatus === 2">
                                                {{ errorMsg }}
                                            </div>
                                            <section>
                                                <form @submit.prevent="sendExpression">
                                                    <b-field label="Nom de l'expression">
                                                        <b-input v-model="definition.name"></b-input>
                                                    </b-field>

                                                    <b-field label="Description de la définition">
                                                        <b-input maxlength="200" type="textarea" v-model="definition.description"></b-input>
                                                    </b-field>

                                                    <b-field label="Ajoutez des tags">
                                                        <b-taginput
                                                                v-model="definition.tags"
                                                                ellipsis
                                                                icon="label"
                                                                placeholder="Add a tag">
                                                        </b-taginput>
                                                    </b-field>

                                                    <b-field class="file">
                                                        <b-upload v-model="file">
                                                            <a class="button is-primary">
                                                                <b-icon icon="upload"></b-icon>
                                                                <span>Click to upload</span>
                                                            </a>
                                                        </b-upload>
                                                        <span class="file-name" v-if="file">
            {{ file.name }}
        </span>
                                                    </b-field>

                                                    <div class="has-text-right">
                                                        <b-button native-type="submit" :loading="formStatus === Status.PENDING" type="is-primary" icon-pack="fas" icon-left="paper-plane">Ajouter cette définition</b-button>
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
	import { post }             from "../../services/api.service"
	import { ENDPOINT, STATUS } from "../../constants"
	import Store                from "../../store"
	import DTO                  from "../../services/DTO"


	export default {
		name: "AddDefinitions",
		data() {
			return {
				Status: STATUS,
				formStatus: STATUS.DEFAULT,
				errorMsg: null,
				successMsg: "L'expression à bien été ajoutée",
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
			successToast() {
				this.$toast.open({
					message: this.successMsg,
					type: 'is-success'
				})
			},
			errorToast() {
				this.$toast.open({
					message: this.errorMsg,
					type: 'is-danger'
				})
			},
			cleanForm(){
				this.definition.name = null
				this.definition.tags = []
				this.definition.description = null
			},
			async sendExpression() {
				this.formStatus = STATUS.PENDING
				console.log('definition', this.definition)

				try {
					const result = await post(`${ENDPOINT.ACCOUNTS}/${Store.credentials.id}/words`, DTO.addDefinition(this.definition))

					setTimeout(() => {
						this.formStatus = STATUS.SUCCESS
						this.successToast()
						this.cleanForm()
					}, 1500)
					console.log('AddDefinitions: result', result)
				} catch (e) {
					this.formStatus = STATUS.ERROR
					if (e.response.status === 422) {
						this.errorMsg = "Les champs ne doivent pas être vides"
					}
					this.errorToast()
					console.log('AddDefinitions: Error: ', e.response)
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
