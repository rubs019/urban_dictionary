const Logger = require('./helpers/logger')

export default {
	state: {
		isConnected: !!localStorage.getItem('isConnected')
	},
	language: localStorage.getItem('language'),
	credentials: {
		id: null,
		username: null,
		email: null,
		role: null,
		token: null,
		karma: null,
		locale: null
	},
	/**
	 * Save the user credentials in the store
	 *
	 * @param fieldName Nom du champ a mettre a jour
	 * @param credentials
	 * @return boolean || null
	 */
	setUser(credentials, fieldName = null) {
		if (!credentials) return false

		if (!fieldName) {

			Logger('SetUser triggered with no fieldName,', credentials)

			this.credentials = {
				id: credentials.id || null,
				username: credentials.username || null,
				email: credentials.email || null,
				role: credentials.role || null,
				token: credentials.token || null,
				karma: credentials.karma >= 0 ? credentials.karma.toString() : null,
				locale: credentials.locale || null
			}

			localStorage.setItem('credentials', JSON.stringify(this.credentials))

			return true
		}

		Logger(`SetUser triggered with fieldName = ${fieldName}`, credentials)

		// Check if the property exist on credentials
		if (!this.credentials.hasOwnProperty(fieldName)) return false

		this.credentials[fieldName] = credentials

		localStorage.setItem('credentials', JSON.stringify(this.credentials))

		return true
	},
	/**
	 * Set user connection state
	 * @param newValue {boolean}
	 * @return undefined
	 */
	setConnected(newValue) {
		if (typeof newValue !== "boolean") {
			Logger(
				`setConnected require a boolean but received a ${typeof newValue}`,
				newValue
			)
			return
		}
		Logger("setConnected triggered with", newValue)
		this.state.isConnected = newValue
		localStorage.setItem('isConnected', newValue.toString())
	},
	/**
	 * Set language website
	 * @param language {string}
	 * @return undefined
	 */
	setLanguage(language: string) {
		const i18n = require('./i18n').default
		Logger("setLanguage triggered with language = ", language)
		localStorage.setItem('language', language)
		this.language = language
		i18n.locale = language
	},
	/**
	 * Use to clear all store
	 * @return undefined
	 */
	clear() {
		this.state.isConnected = false
		this.credentials = {
			id: null,
			username: null,
			email: null,
			role: null,
			token: null,
			karma: null
		}
		localStorage.removeItem('credentials')
		localStorage.removeItem('isConnected')
	}
}
