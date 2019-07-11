const Logger = require('./services/logger')
export default {
  debug: true,
  state: {
    isConnected: !!localStorage.getItem('isConnected')
  },
  credentials: {
    id: null,
    username: null,
    email: null,
    role: null,
    token: null,
    karma: null
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

      if (this.debug) Logger('SetUser triggered with no fieldName,', credentials)

      this.credentials = {
        id: credentials.id ?  credentials.id : null,
        username: credentials.username ? credentials.username : null,
        email: credentials.email ? credentials.email : null,
        role: credentials.role ? credentials.role : null,
        token: credentials.token ? credentials.token : null,
        karma: credentials.karma >= 0 ? credentials.karma.toString() : null
      }

      localStorage.setItem('credentials', JSON.stringify(this.credentials))

      return true
    }

    if (this.debug) Logger(`SetUser triggered with fieldName = ${fieldName}`, credentials)

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
      if (this.debug)
        Logger(
          `setConnected require a boolean but received a ${typeof newValue}`,
          newValue
        )
      return
    }
    if (this.debug) Logger("setConnected triggered with", newValue)
    this.state.isConnected = newValue
    localStorage.setItem('isConnected', newValue.toString())
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
