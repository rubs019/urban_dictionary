<template>
    <div>
        <div class="section">
            <h1 class="title">Game playground <span class="dot"
                                                    :class="[serverIsUp ? 'has-background-success' : 'has-background-danger']"></span>
            </h1>
            <b-button v-on:click="newPlayer" :disabled="!serverIsUp">newPlayer</b-button>
            <b-button v-on:click="startRoom" :disabled="!serverIsUp">StartRoom</b-button>
            <b-button v-on:click="leaveRoom" :disabled="!serverIsUp">leaveRoom</b-button>
            <b-button v-on:click="disconnect" :disabled="!serverIsUp">disconnect</b-button>
        </div>
        <div class="container is-fluid">
            <div class="columns">
                <div id="user-container" class="column is-4">
                    <b-message type="is-success">
                        Connecté en tant que {{ store.credentials.username }}
                    </b-message>
                    <div class="tile is-vertical notification has-text-centered">
                        <h2 class="title is-4">
                            Liste des joueurs
                        </h2>
                        <div class="tile" v-if="roomInformation && roomInformation.usernames">
                            <ul class="has-text-left">
                                <li class="username" v-for="(username, index) in roomInformation.usernames"
                                    :key="index">{{ username }}
                                </li>
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
    import Logger         from "../../services/logger"
    import Store          from "../../store"
    import { Get }        from '../../services/api.service'
    import { ENDPOINT }   from '../../constants'
    import helpers        from "../../helpers"

    export default {
        name: "AppGamesPlayground",
        data: () => {
            return {
                serverIsUp: null,
                roomId: null,
                roomInformation: null,
                store: Store
            }
        },
        sockets: {
            connect: function () {
                Logger('socket connected', this.$socket.connected)
                this.joinRoom()
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
            newPlayer: async function (user) {
                Logger('New player joined the game', user)

                if (!user || !user.id) {
                    // Send Error in case of
                    helpers.errorToast(this, 'Erreur lors de la reception du nouveau joueur')
                }

                try {
                    // Search the name of the user
                    const { data: newUserInTheRoom } = await Get(`${ENDPOINT.USERS}/${user.id}`)

                    helpers.successToast(this, `${newUserInTheRoom.username} vient de se connecter`)

                    Logger('this.roomInformation', this.roomInformation)
                    const nameIsAlreadyPresent = this.roomInformation.usernames.find((username) => username === newUserInTheRoom.username)
                    if (!nameIsAlreadyPresent)
                        this.roomInformation.usernames.push(newUserInTheRoom.username)

                } catch (e) {
                    helpers.errorToast(this, 'Erreur requete for get user credentials')
                }
            },
            playerRemoved: data => {
                Logger('Player removed from the game', data)
                alert('PlayerRemoved')
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
            },
            exception: data => {
                Logger('exception', data)
            }
        },
        methods: {
            connectSocket: function () {
                this.$socket.io.opts = {
                    ...this.$socket.io.opts,
                    query: {
                        jwt: Store.credentials.token
                    }
                }
                this.$socket.connect()
            },
            joinRoom: function () {
                this.$socket.emit('joinRoom', {
                    roomId: this.roomId
                })
            },
            startRoom(roomId) {
                console.log('startRoom')

                this.$socket.emit('startRoom', {
                    roomId: this.roomId
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
                this.$socket.emit('fire')
            },
            leaveRoom: function () {
                this.$socket.emit('leaveRoom', {
                    roomId: this.roomId
                })
            },
            disconnect: function () {
                this.$socket.close()
            },
            fetchRoomInformation: async function () {
                try {
                    const query = {
                        $expr: {
                            $eq: ['$id', this.roomId]
                        }
                    }
                    const {data: tempRoomInformation} = await Get(`${ENDPOINT.ROOM}?where=${JSON.stringify(query)}`)

                    this.roomInformation = tempRoomInformation.find(room => room.id === this.roomId)
                } catch (err) {
                    Logger('AppGamesPlayground : fetchRoomInformation : error', err)
                    helpers.errorToast(this, "Une erreur s'est produite lors de la récupération des informations de la room")
                }
            }
        },
        created() {
            Logger("this.$localStorage.get('credentials')", this.$localStorage.get('credentials', null))

            if (!this.$localStorage.get('credentials', null)) {
                helpers.errorToast(this, 'Vous devez être connecté pour accéder à cette page')
                this.$router.push('/games')
                return
            }

            this.roomId = this.$route.params.id
            this.fetchRoomInformation()
        },
        updated() {
            console.log('updated')
            this.connectSocket()
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