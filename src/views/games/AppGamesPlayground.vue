<template>
    <div>
        <div class="section">
            <h1 class="title">Game playground <span class="dot"
                                                    :class="[serverIsUp ? 'has-background-success' : 'has-background-danger']"></span>
            </h1>
            <b-button v-on:click="connectSocket" :disabled="serverIsUp">connect</b-button>
            <b-button v-on:click="joinRoom" :disabled="!serverIsUp">JoinRoom</b-button>
            <b-button v-on:click="newPlayer" :disabled="!serverIsUp">newPlayer</b-button>
            <b-button v-on:click="leaveRoom" :disabled="!serverIsUp">leaveRoom</b-button>
            <b-button v-on:click="disconnect" :disabled="!serverIsUp">disconnect</b-button>
        </div>
        <div class="container is-fluid">
            <div class="columns">
                <div id="user-container" class="column is-4">
                    <div class="tile is-vertical notification has-text-centered">
                        <h2 class="title is-4">
                            Liste des joueurs
                        </h2>
                        <div class="tile">
                            <ul class="has-text-left">
                                <li class="username user-active">Alibaba</li>
                                <li class="username">Alibaba</li>
                                <li class="username">Alibaba</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="game-container" class="column is-8 is-size-2 notification">
                    <div class="section">
                        <div id="actionItem">
                            <p class="title is-4">C'est au tour de Ruben de jouer</p>
                        </div>
                    </div>
                    <div class="section">
                        <div id="wordNameItem">
                            <p>_ _ _ _ - _ _ _ _</p>
                        </div>
                    </div>
                    <div class="section">
                        <p id="wordDefinitionItem" class="is-size-5">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Logger from "../../services/logger"
    import Store from "../../store"

    export default {
        name: "AppGamesPlayground",
        data: () => {
            return {
                serverIsUp: null,
                roomId: null
            }
        },
        sockets: {
            connect: function () {
                Logger('socket connected', this.$socket.connected)
                this.serverIsUp = true
            },
            disconnect: function () {
                Logger('socket disconnected', this.$socket.disconnected)
                this.serverIsUp = false
            },
            error: data => {
                Logger('Error', data)
            },
            gameError: data => {
                Logger('Error', data)
            },
            message: data => {
                Logger('Message', data)
            },
            newPlayer: data => {
                Logger('New player joined the game', data)
            },
            playerRemoved: data => {
                Logger('Player removed from the game', data)
            },
            roomStarted: data => {
                Logger('Room started !', data)
            },
            goodProposal: data => {
                Logger('Good proposal !', data)
            },
            wrongProposal: data => {
                Logger('Wrong proposal !', data)
            },
            newRound: data => {
                Logger('New round', data)
            },
            timeout: data => {
                Logger('timeout', data)
            }
        },
        methods: {
            connectSocket: function () {
                this.$socket.io.opts = {
                    ...this.$socket.io.opts,
                    extraHeaders: {
                        Authorization: `Bearer ${Store.credentials.token}`
                    },
                    query: {
                        jwt: Store.credentials.token
                    }
                }
                this.$socket.open()
            },
            joinRoom: function () {
                if (this.$socket.disconnected) {
                    alert("Socket non connecté")
                    return
                }
                console.log('joinRoom', this.roomId)
                this.$socket.emit('joinRoom', {
                    roomId: this.roomId
                })
            },
            startRoom(roomId) {
                console.log('startRoom')

                this.$socket.emit('startRoom', {
                    roomId
                })
            },
            play(roomId, proposal) {
                console.log('play')

                this.$socket.emit('play', {
                    roomId,
                    proposal
                })
            },
            newPlayer: function () {
                console.log('newPlayer')
                this.$socket.emit('newPlayer')
            },
            leaveRoom: function (roomId) {
                this.$socket.emit('leaveRoom', {
                    roomId
                })
            },
            disconnect: function () {
                this.$socket.close()
            }
        },
        created() {
            this.roomId = this.$route.params.id
        },
        mounted() {
            Logger('this.$socket', this.$socket.connected)
            this.serverIsUp = this.$socket.connected
            Logger('this.serverIsUp', this.serverIsUp)
            Logger('this.roomId', this.roomId)
        }
    }
</script>

<style scoped lang="scss">
    ul {
        width: 100%;

        li.username {
            cursor: pointer;
            padding: 10px;
            font-weight: bold;
        }
    }

    .user-active {
        background-color: #c2ec72;
    }

    .dot {
        height: 15px;
        width: 15px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }
</style>