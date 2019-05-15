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
	NOT_SAME_PWD: "Les mots de passent doivent être identiques",
	USER_ALREADY_EXIST: "Ce nom d'utilisateur existe déjà",
	SUCCESS: "Vous allez être redirigé vers la page correspondante",
	ERROR_SERVER: "Une erreur s'est produite, veuillez réessayer dans quelques instants",
	SUCCESS_LOGIN: "Connexion réussie..."
}
export const ENDPOINT = {
	ACCOUNTS: "accounts",
	WORDS: "words"
}
export const API_PATH = {
	CREATE_ACCOUNT: ENDPOINT.ACCOUNTS,
	ACCOUNT_LOGOUT: `${ENDPOINT.ACCOUNTS}/logout`,
	ACCOUNT_LOGIN: `${ENDPOINT.ACCOUNTS}/login`
}

export const STATUS = {
	DEFAULT: 0,
	PENDING: 1,
	ERROR: 2,
	SUCCESS: 3
}

export const APP_NAME = "UnderDico"
export const APP_DESCRIPTION = "Le dictionnaire complet de l'argot"
