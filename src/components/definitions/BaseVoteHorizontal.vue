<template>
  <div id="basevote">
	<nav class="level">
	  <div class="level-item button has-text-centered is-primary" v-on:click="vote('add')">
		<span class="icon fa-2x">
			<i class="fas fa-caret-up"></i>
		</span>
		<span>Upvote</span>
	  </div>
	  <div class="level-item has-text-centered">
		<div>
		  <p class="heading">Vote</p>
		  <transition name="bounce" mode="out-in">
			<p class="title" :key="nbLike">{{ nbLike }}</p>
		  </transition>
		</div>
	  </div>
	  <div class="level-item button has-text-centered is-primary" v-on:click="vote('reduce')">
		<span class="icon fa-2x">
			<i class="fas fa-caret-down"></i>
		</span>
		<span>Downvote</span>
	  </div>
	</nav>
  </div>
</template>

<script>
	import FormLogin    from "../form/FormLogin"
	import Logger       from "../../services/logger"
	import { Post }     from "../../services/api.service"
	import { ENDPOINT } from "../../constants"
	import Store        from "../../store"

	export default {
		name: "BaseVoteHorizontal",
		props: {
			idExpression: String,
			nbVote: Number,
			nbMaxLike: Number
		},
		data: () => ({
			voteUpdate: false,
			nbLike: null
		}),
		methods: {
			imageModal() {
				this.$modal.open({
					component: FormLogin,
					hasModalCard: true,
					animation: 'zoom-out'
				})
			},
			vote(operande) {
				const theUserIsConnected = false
				if (theUserIsConnected) {
					this.imageModal()
					return
				}
				if (operande === 'add') {
					this.addNbVote()
				}
				if (operande === 'reduce') {
					this.reduceNbVote()
				}
				this.voteUpdate = true
			},
			async addNbVote() {
				await this.sendVote(true)
			},
			async reduceNbVote() {
				await this.sendVote(false)
			},
			async sendVote(value) {
				const headers = {
					token: Store.credentials.token
				}
				try {
					await Post(`${ENDPOINT.WORDS}/${this.idExpression}/votes`, {value}, headers)
					value ? this.nbLike++ : this.nbLike--
				} catch (e) {
					Logger('BaseVoteHorizontal : SendVote : Error', e)
					this.$toast.open({
						message: "Une erreur s'est produite lors du vote, veuillez réessayer plus tard",
						type: 'is-danger',
						duration: 4000
					})
				}
			}
		},
		mounted() {
			this.nbLike = this.nbVote
		}
	}
</script>

<style scoped="scss">
  #basevote {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
  }

  .icon {
	cursor: pointer;
  }

  .divide {
	margin: 0.2em 0;
  }

  .bounce-enter-active {
	animation: bounce-in .5s;
  }
  .bounce-leave-active {
	animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
	0% {
	  transform: scale(0);
	}
	50% {
	  transform: scale(1.5);
	}
	100% {
	  transform: scale(1);
	}
  }
</style>
