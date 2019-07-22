<template>
    <div id="basevote">
        <nav class="level">
            <div :disabled="userExpression.userUpVoted" class="level-item button has-text-centered is-success" v-on:click="vote('add')">
                <span class="icon fa-2x">
                    <i class="fas fa-caret-up"></i>
                </span>
                <span>Upvote</span>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Vote</p>
                    <transition name="bounce" mode="out-in">
                        <p class="title" :key="userExpression.score">{{ userExpression.score }}</p>
                    </transition>
                </div>
            </div>
            <div :disabled="userExpression.userDownVoted" class="level-item button has-text-centered is-danger" v-on:click="vote('reduce')">
                <span class="icon fa-2x">
                    <i class="fas fa-caret-down"></i>
                </span>
                <span>Downvote</span>
            </div>
        </nav>
    </div>
</template>

<script>
    import {Get, Patch, Post} from "../../services/api.service"
    import {ENDPOINT}         from "../../constants"
    import Logger             from "../../helpers/logger"
    import Store              from "../../store"
    import {errorToast}       from "../../helpers/toast"

    export default {
        name: "BaseVoteHorizontal",
        props: {
            expression: Object
        },
        data: function () {
            return {
                voteUpdate: false,
                userExpression: this.expression
            }
        },
        methods: {
            imageModal() {
                this.$dialog.alert({
                    title: "Oups...",
                    message: `<span class='has-text-centered'> ${ this.$t("notif.voteErrorUnconnectedUser") } </span>`,
                    confirmText: this.$t('notif.confirmTextvoteErrorUnconnectedUser'),
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    canCancel: ['outside']
                })
            },
            vote(operande) {
                const theUserIsConnected = Store.state.isConnected
                if (!theUserIsConnected) {
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
                    if (!this.userExpression.userDownVoted && !this.userExpression.userUpVoted) {
                        await Post(`${ENDPOINT.WORDS}/${this.userExpression.id}/votes`, {value})
                    } else {
                        if (this.userExpression.userDownVoted && !value || this.userExpression.userUpVoted && value) return
                        await Patch(`${ENDPOINT.WORDS}/${this.userExpression.id}/votes/${this.userExpression.userVoteId}`, {value}, headers)
                    }

                    Logger(this.userExpression, value)

                    const { data: word } = await Get(`${ENDPOINT.WORDS}/${this.userExpression.id}`)
                    Logger('word', word)
                    this.userExpression = word
                } catch (e) {
                    Logger('BaseVoteHorizontal : SendVote : Error', e)
                    errorToast(this, this.$t('notif.voteError'))
                }
            }
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
