<template>
  <div id="app-dashboard">
	<section class="section">
	  <h1 class="title">Dashboard administration</h1>
	  <div class="container">
		<b-tabs position="is-centered" class="block">
		  <b-tab-item label="Expressions">
			<b-table
					:data="expressions"
					ref="table"
					detailed>
			  <template slot-scope="props">

				<b-table-column field="name" label="Nom" sortable>
				  <b>{{ props.row.name }}</b>
				</b-table-column>

				<b-table-column field="definition" label="Définition" sortable>
				  {{ props.row.definition }}
				</b-table-column>

				<b-table-column field="usernames" label="Utilisateur" sortable>
				  {{ props.row.user && props.row.user.usernames }}
				</b-table-column>

				<b-table-column field="createdAt" label="Créer le" width="100" sortable>
				  {{ new Date(props.row.createdAt).toDateString() }}
				</b-table-column>

				<b-table-column field="locale" label="Langue" sortable>
		  <span class="tag is-success">
			{{ props.row.locale.toUpperCase() }}
		  </span>
				</b-table-column>

				<b-table-column>
				  <b-button class="button is-danger" v-on:click="deleteExpression(props.row)">Supprimer</b-button>
				</b-table-column>
			  </template>
			</b-table>
		  </b-tab-item>
		  <b-tab-item label="Utilisateurs">
			<b-table
					:data="users"
					ref="table"
					detailed>
			  <template slot-scope="props">

				<b-table-column field="name" label="Nom" sortable>
				  <b>{{ props.row.username }}</b>
				</b-table-column>

				<b-table-column field="email" label="Email" sortable>
				  {{ props.row.email }}
				</b-table-column>

				<b-table-column field="role" label="Role" sortable>
				  <span class="tag is-success">
					{{ props.row.role }}
				  </span>
				</b-table-column>

				<b-table-column field="score" label="Score" sortable>
				  <span class="tag is-success">
					{{ props.row.score }}
				  </span>
				</b-table-column>

				<b-table-column field="karma" label="karma" sortable>
				  <span class="tag is-success">
					{{ props.row.karma }}
				  </span>
				</b-table-column>

				<b-table-column field="createdAt" label="Créer le" width="100" sortable>
				  {{ new Date(props.row.createdAt).toDateString() }}
				</b-table-column>

				<b-table-column field="locale" label="Langue" sortable>
				  <span class="tag is-success">
					{{ props.row.locale.toUpperCase() }}
				  </span>
				</b-table-column>

				<b-table-column>
				  <b-button class="button is-danger" v-on:click="deleteUser(props.row)">Supprimer</b-button>
				</b-table-column>
			  </template>
			</b-table>
		  </b-tab-item>
		</b-tabs>
	  </div>
	</section>
	<b-modal :active.sync="isDeleteModalIsActive">
	  <p class="image is-4by3">
		Wesh
	  </p>
	</b-modal>
  </div>
</template>

<script>
	import Storage         from "../store"
	import Logger          from "../helpers/logger"
	import { Delete, Get } from "../services/request/api.service"
	import { ENDPOINT }    from "../constants"
	import helpers         from "../helpers"

	export default {
		name: "AppDashboard",
		data() {
			return {
				expressions: [],
				users: [],
				isDeleteModalIsActive: false
			}
		},
		methods: {
			async deleteUser(user) {
				this.$dialog.confirm({
					type: 'is-danger',
					title: 'Attention',
					confirmText: 'Oui je veux supprimer',
					message: `<p>Voulez vous vraiment supprimer l'utilisateur <b>${user.username}</b></p>`,
					onConfirm: async () => {
						try {
							await Delete(`${ENDPOINT.USERS}/${user.id}`)
							helpers.successToast(this, 'L\'utilisateur à été supprimé')
							await this.getUsers()
						} catch (e) {
							Logger('deleteExpression: onConfirm : error', e.response)
						}
					}
				})
			},
			async deleteExpression(expression) {
				Logger('deleteExpression : expression', expression)

				this.$dialog.confirm({
					type: 'is-danger',
					title: 'Attention',
					confirmText: 'Oui je veux supprimer',
					message: `<p>Voulez vous vraiment supprimer l'expression <b>${expression.name}</b></p>`,
					onConfirm: async () => {
						try {
							await Delete(`${ENDPOINT.WORDS}/${expression.id}`)
							helpers.successToast(this, 'Le mot à été supprimé')
							await this.getExpressions()
						} catch (e) {
							Logger('deleteExpression: onConfirm : error', e.response)
						}
					}
				})
			},
			async getExpressions() {
				try {
					const { data : expressions } = await Get(ENDPOINT.WORDS)

					this.expressions = expressions
				} catch (e) {
					Logger('AppDashboard : getExpressions : ', e)
					return null
				}
			},
			async getUsers() {
				try {
					const { data : users } = await Get(ENDPOINT.USERS)

					this.users = users
				} catch (e) {
					Logger('AppDashboard : getExpressions : ', e)
					return null
				}
			}
		},
		async created() {
			Logger('Storage.credentials.role ', Storage.credentials.role )
			if (Storage.credentials.role !== 'Admin') {
				helpers.errorToast(this, "Vous n'êtes pas autorisé à accéder a cette page")
				// redirection vers page admin

				this.$router.push('/')
			}
			await this.getExpressions()
			await this.getUsers()
		}
	}
</script>

<style scoped>

</style>
