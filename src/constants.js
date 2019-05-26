export const MENU_NAME = {
	home: "Accueil",
	login: "Se connecter",
	logout: "Se déconnecter",
	signup: "S'inscrire",
	games: "Jouer",
	contact: "Contact",
	expression: "Expression",
	about: "A propos",
	profile: "Profile"
}

export const NOTIF_MSG = {
	ACCOUNT_NOT_EXIST: "Le nom d'utilisateur n'existe pas",
	BAD_CREDENTIALS: "Nom d'utilisateur ou mot de passe incorrecte",
	PWD_OR_LOGIN_EMPTY: "Le nom d'utilisateur et/ou le password est vide",
	PWD_TOO_SHORT: "Le mot de passe doit avoir au moins 6 lettres",
	NOT_SAME_PWD: "Les mots de passent doivent être identiques",
	USER_ALREADY_EXIST: "Ce nom d'utilisateur existe déjà",
	EMAIL_ALREADY_EXIST: "Cette email est déjà utilisé",
	SUCCESS: "Vous allez être redirigé vers la page correspondante",
	ERROR_SERVER: "Une erreur s'est produite, veuillez réessayer dans quelques instants",
	SUCCESS_LOGIN: "Connexion réussie..."
}
export const ENDPOINT = {
	USERS: "users",
	WORDS: "words"
}
export const API_PATH = {
	CREATE_USER: ENDPOINT.USERS,
	ACCOUNT_LOGOUT: `${ENDPOINT.USERS}/logout`,
	ACCOUNT_LOGIN: `${ENDPOINT.USERS}/token`
}

/**
 * Form status
 * @type {{SUCCESS: number, ERROR: number, PENDING: number, DEFAULT: number}}
 */
export const STATUS = {
	DEFAULT: 0,
	PENDING: 1,
	ERROR: 2,
	SUCCESS: 3
}

export const APP_NAME = "UnderDico"
export const APP_DESCRIPTION = "Le dictionnaire complet de l'argot"
