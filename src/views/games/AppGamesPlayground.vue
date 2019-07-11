<template>
    <div>
        <div class="section">
            <h1 class="title">Game playground <span class="dot"
                                                    :class="[serverIsUp ? 'has-background-success' : 'has-background-danger']"></span>
            </h1>
            {{ game.allUsers }}
            <b-button v-on:click="startRoom" :disabled="!serverIsUp">Commencez le jeu</b-button>
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
                        <div class="tile" v-if="game && game.allUsers">
                            <ul class="has-text-left">
                                <li class="username" v-for="(user, index) in game.allUsers"
                                    :key="index">{{ user.username }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="game-container" class="column is-8 is-size-2">
                    <div class="has-text-centered">
                        <div id="actionItem">
                            <b-message type="is-primary">
                                C'est au tour de {{ nextUser }} de jouer
                            </b-message>
                            <b-notification :active.sync="gameError">
                                {{ gameError }}
                            </b-notification>
                        </div>
                    </div>
                    <div class="section">
                        <div class="notification is-info">
                            <p id="wordDefinitionItem" class="is-size-5">
                                {{ game.definitionToFind || "Le texte va apparaitre ici une fois le jeu lancé"}}
                            </p>
                        </div>
                    </div>
                    <div class="section">
                        <div id="wordNameItem">
                            <input
                                    class="input is-rounded"
                                    @keydown.enter="sendWordFromUser"
                                    v-model="game.wordFromUser">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Logger       from "../../services/logger"
    import Store        from "../../store"
    import { Get }      from '../../services/api.service'
    import { ENDPOINT } from '../../constants'
    import helpers      from "../../helpers"

    export default {
        name: "AppGamesPlayground",
        data: () => {
            return {
                serverIsUp: null,
                roomId: null,
                roomInformation: {
                    usernames: []
                },
                gameError: false,
                nextUser: null,
                currentUsername: null,
                store: Store,
                game: {
                    definitionToFind: null,
                    wordFromUser: null,
                    obfuscatedWord: null,
                    allUsers: []
                }
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
                this.$router.push('/games')
            },
            error: function (data) {
                Logger('Error', data)
                this.gameError = true
            },
            gameError: function (data) {
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
                    const {data: newUserInTheRoom} = await Get(`${ENDPOINT.USERS}/${user.id}`)

                    helpers.successToast(this, `${newUserInTheRoom.username} vient de se connecter`)

                    Logger('this.roomInformation', this.roomInformation)
                    Logger('newUserInTheRoom', newUserInTheRoom)

                    const nameIsAlreadyPresent = this.game.allUsers.find((username) => username.id === newUserInTheRoom.id)
                    console.log('nameIsAlreadyPresent', nameIsAlreadyPresent)
                    if (!nameIsAlreadyPresent)
                        this.game.allUsers.push(user)

                } catch (e) {
                    Logger('AppGamesPlayground : newPlayer EVENT : error', e)
                    helpers.errorToast(this, 'Erreur requete for get user credentials')
                    this.$router.push('/games')
                }
            },
            playerRemoved: function (data) {
                Logger('Player removed from the game', data.id)
                Logger('this.roomInformation.usernames', this.roomInformation.usernames)

                const indexToDelete = this.game.allUsers.findIndex((user) => {
                    return user.id === data.id
                })
                Logger('indexToDelete', indexToDelete)
                this.game.allUsers.splice(indexToDelete, 1)

                helpers.errorToast(this, `Un joueur vient de se déconnecter`)
            },
            roomStarted: function (data) {
                Logger('Room started !', data)
            },
            goodProposal: function (data) {
                Logger('Good proposal !', data)

                // We clean the user input
                this.game.wordFromUser = null

                helpers.successToast(this, 'Félicitations, vous avez trouvé le bon mot !')
            },
            wrongProposal: function (data) {

                // We clean the user input
                this.game.wordFromUser = null

                Logger('Wrong proposal !', data)
                helpers.errorToast(this, 'Oups ! Encore un petit effort')
            },
            newRound: function (data) {
                if (!data || !data.definition)
                    return helpers.errorToast(this, "Erreur lors de la récupération de la définition du round")
                this.handleNewRound(data)
            },
            timeout: function (data) {
                Logger('timeout', data)
                this.nextUser = data.nextPlayerId
            },
            exception: function (data) {
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
            startRoom() {
                console.log('startRoom, next event is newRound')

                this.$socket.emit('startRoom', {
                    roomId: this.roomId
                })
            },
            play(roomId) {
                console.log('play')

                this.$socket.emit('play', {
                    roomId,
                    proposal: this.wordFromUser
                })
            },
            newPlayer: function () {
                console.log('newPlayer')
            },
            leaveRoom: function () {
                this.$socket.emit('leaveRoom', {
                    roomId: this.roomId
                })
                this.disconnect()
                this.$router.push('/games')
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

                    Logger('fetchRoomInformation : roomInformation', this.roomInformation)

                    this.setAllPlayers()
                } catch (err) {
                    Logger('AppGamesPlayground : fetchRoomInformation : error', err)
                    helpers.errorToast(this, "Une erreur s'est produite lors de la récupération des informations de la room")
                    this.$router.push('/games')
                }
            },
            /**
             * Use to map player connected
             */
            setAllPlayers() {
                if (this.roomInformation.playersIds.length > 0) {
                    for (let i = 0; i < this.roomInformation.playersIds.length; i++) {
                        if (this.game.allUsers.find(user => {
                            return user.id === this.roomInformation.playersIds[i]
                        })) {
                            return
                        }
                        this.game.allUsers.push({
                            id: this.roomInformation.playersIds[i],
                            username: this.roomInformation.usernames[i]
                        })
                    }
                    return
                }
            },
            /**
             * Use to process a new round
             */
            handleNewRound({definition, obfuscatedWord}) {
                this.game.definitionToFind = definition
                this.game.obfuscatedWord = obfuscatedWord
            },
            sendWordFromUser: function () {
                Logger(`The word enter is : ${this.game.wordFromUser}`)

                this.$socket.emit('play', {
                    roomId: this.roomId,
                    proposal: this.game.wordFromUser
                })
            }
        },
        async created() {

            if (!this.$localStorage.get('credentials', null)) {
                helpers.errorToast(this, 'Vous devez être connecté pour accéder à cette page')
                this.$router.push('/games')
                return
            }

            this.roomId = this.$route.params.id
            if (this.$socket.disconnected) this.connectSocket()
            await this.fetchRoomInformation()
        },
        updated() {
            if (this.$socket.disconnected) this.connectSocket()
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