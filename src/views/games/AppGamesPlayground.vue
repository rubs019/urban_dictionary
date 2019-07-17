<template>
    <div>
        <div class="section">
            <h1 class="title">Game playground <span class="dot"
                                                    :class="[serverIsUp ? 'has-background-success' : 'has-background-danger']"></span>
            </h1>
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
                        <div class="tile" v-if="game && game.connectedUsers">
                            <ul class="has-text-left">
                                <li class="username" v-for="(user, index) in game.connectedUsers"
                                    :key="index">{{ user.username }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="game-container" class="column is-8 is-size-2">
                    <div class="has-text-centered">
                        <div id="actionItem" v-if="gameIsStart">
                            <b-message type="is-primary">
                                C'est au tour de {{ nextUser }} de jouer
                            </b-message>
                            <b-notification :active.sync="gameError">
                                {{ gameError }}
                            </b-notification>
                        </div>
                    </div>
                    <div class="">
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

    /**
     * @typedef { Object } User
     * @property { string } id
     * @property { string } name
     */
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
                gameIsStart: false,
                nextUser: null,
                currentUsername: null,
                store: Store,
                game: {
                    definitionToFind: null,
                    wordFromUser: null,
                    obfuscatedWord: null,
                    connectedUsers: []
                }
            }
        },
        sockets: {
            connect: function () {
                Logger('socket connected', this.roomInformation)
                const userAlreadyJoinRoom = this.roomInformation.playersIds.find(playerId => playerId === this.store.credentials.id)
                if (!userAlreadyJoinRoom) this.joinRoom()

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
                const {statusCode, message} = data.response
                if (statusCode === 403) {
                    if (message === "Max player reached") {
                        helpers.errorToast(this, this.$t('game.notif.MAX_PLAYER_REACHED'))
                        return
                    }
                    if (message === "You are not the owner") {
                        helpers.errorToast(this, this.$t('game.notif.NOT_OWNER'))
                        return
                    }
                }
            },
            /**
             * Event lancer lorsqu'un utilisateur se connecte
             * Sert à rafraichir la liste des utilisateurs connecté
             * @param { User } user
             * */
            newPlayer: async function (user) {
                Logger('New player joined the game', user)

                if (!user || !user.id) {
                    // Send Error in case of
                    helpers.errorToast(this, 'Erreur lors de la reception du nouveau joueur')
                }

                try {
                    helpers.successToast(this, `${user.username} vient de se connecter`)

                    Logger('this.roomInformation', this.roomInformation)
                    Logger('user', user)

                    // We search if the name is already in the user connected lists
                    const nameIsAlreadyPresent = this.game.connectedUsers.find(username => username.id === user.id)

                    // If the name is not here we need to push it
                    if (!nameIsAlreadyPresent)
                        this.game.connectedUsers.push(user)

                } catch (e) {
                    Logger('AppGamesPlayground : newPlayer EVENT : error', e)
                    helpers.errorToast(this, 'Erreur requete for get user credentials')
                    this.$router.push('/games')
                }
            },
            /**
             * Event lancer lorsqu'un utilisateur se déconnecte
             * Sert à supprimer l'utilisateur qui vient de partir de la liste des utilisateurs connecté
             * @param { User } user - information de l'utilisateur qui vient de déco
             * */
            playerRemoved: function (user) {
                // Nous avons besoin de chercher quel index nous avons besoin de supprimer
                // Dans la liste des utilisateurs connecté
                const indexToDelete = this.game.connectedUsers.findIndex((connectedUser) => {
                    return connectedUser.id === user.id
                })

                this.game.connectedUsers.splice(indexToDelete, 1)

                helpers.errorToast(this, `Un joueur vient de se déconnecter`)
            },
            /**
             * Event lancer lorsque la partie débute
             * @param { User } user - information de l'utilisateur qui vient de déco
             * */
            roomStarted: function (data) {
                this.gameIsStart = true
            },
            /**
             * Event lancer lorsqu'une bonne réponse est soumise
             * Sert à notifier qu'un utilisateur à entrer une bonne proposition
             * @param { string } playerId - ID de l'utilisateur qui vient d'émettre la réponse
             * */
            goodProposal: function (playerId) {
                Logger('Good proposal !', playerId)

                // We clean the user input
                this.game.wordFromUser = null

                helpers.successToast(this, 'Félicitations, vous avez trouvé le bon mot !')
                this.setTheNextUser(playerId)
            },
            /**
             * Event lancer lorsqu'une mauvaise réponse est soumise
             * Sert à notifier qu'un utilisateur à entrer une mauvaise proposition
             * @param { string } playerId - ID de l'utilisateur qui vient d'émettre la réponse
             * @param { string } nextPlayerId - ID de l'utilisateur suivant
             * */
            wrongProposal: function ({ playerId, nextPlayerId }) {

                // We clean the user input
                this.game.wordFromUser = null

                Logger('Wrong proposal !', {playerId, nextPlayerId})
                helpers.errorToast(this, 'Oups ! Encore un petit effort')
                this.setTheNextUser(nextPlayerId)

            },
            /**
             * Event lancer lorsqu'un nouveau round débute
             * Sert à notifier qu'un utilisateur à entrer une mauvaise proposition
             * @param { string } definition - Définition du mot à trouver
             * @param { string } nextPlayerId - ID de l'utilisateur suivant
             * @param { Array<null> } obfuscatedWord - Les lettres à trouver correspondant au mots
             * */
            newRound: function (data) {
                Logger('newRound|data', data)
                const {definition, nextPlayerId, obfuscatedWord} = data
                if (!definition || !nextPlayerId || !obfuscatedWord)
                    return helpers.errorToast(this, "Erreur lors de la récupération de la définition du round")
                this.handleNewRound({definition, obfuscatedWord, nextPlayerId})
            },
            timeout: function (data) {
                Logger('timeout', data)
                this.setTheNextUser(data.nextPlayerId)
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
            newPlayer: function (data) {
                console.log('newPlayer', data)
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
                    // On fetch les informations déjà existante de la room
                    const {data: tempRoomInformation} = await Get(`${ENDPOINT.ROOM}`)

                    // on recois toute les room présent, dans ce cas on séléctionne la room sur laquelle l'utilisateur est connecté
                    this.roomInformation = tempRoomInformation.find(room => room.id === this.roomId)

                    // On construit notre liste de joueurs à partir des informations reçu
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
                // Dans le cas ou j'ai déjà plusieurs utilisateurs connectés
                // J'associe chaque ID à un username
                if (this.roomInformation.playersIds.length > 0) {
                    for (let i = 0; i < this.roomInformation.playersIds.length; i++) {
                        if (this.game.connectedUsers.find(user => {
                            return user.id === this.roomInformation.playersIds[i]
                        })) {
                            return
                        }
                        this.game.connectedUsers.push({
                            id: this.roomInformation.playersIds[i],
                            username: this.roomInformation.usernames[i]
                        })
                    }
                }
                Logger('setAllPlayers : ', this.game.connectedUsers)
            },
            /**
             * Affiche à l'écran la définition et le nombre de lettre à trouver
             */
            handleNewRound({definition, obfuscatedWord, nextPlayerId}) {
                this.game.definitionToFind = definition
                this.game.obfuscatedWord = obfuscatedWord
                this.setTheNextUser(nextPlayerId)
            },
            sendWordFromUser: function () {
                Logger(`The word enter is : ${this.game.wordFromUser}`)

                this.$socket.emit('play', {
                    roomId: this.roomId,
                    proposal: this.game.wordFromUser
                })
            },
            setTheNextUser: function (playerId) {
                this.nextUser = this.game.connectedUsers.find(username => {
                    return username.id === playerId
                }).username
            }
        },
        async created() {

            if (!this.$localStorage.get('credentials', null)) {
                helpers.errorToast(this, 'Vous devez être connecté pour accéder à cette page')
                this.$router.push('/home')
                return
            }

            Logger('created', this.$socket.disconnected)
            this.roomId = this.$route.params.id
            await this.fetchRoomInformation()
            if (this.$socket.disconnected) this.connectSocket()
            this.serverIsUp = true
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
