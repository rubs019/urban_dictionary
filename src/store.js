export default {
  debug: true,
  state: {
    isConnected: false
  },
  credentials: {
    id: null,
    username: null,
    email: null,
    realm: null,
    token: null
  },
  /**
   * Save the user credentials in the store
   *
   * @param fieldName Nom du champ a mettre a jour
   * @param credentials
   * @return undefined
   */
  setUser(credentials, fieldName = null) {

    if (!fieldName) {
      if (this.debug) console.log('SetUser triggered with no fieldName,', credentials)
      this.credentials = credentials
      return
    }

    if (this.debug) console.log(`SetUser triggered with fieldName = ${fieldName}`, credentials)
    this.credentials[fieldName] = credentials
  },
  /**
   * Set user connection state
   * @param newValue {boolean}
   * @return undefined
   */
  setConnected(newValue) {
    if (typeof newValue !== "boolean") {
      if (this.debug)
        console.log(
          `setConnected require a boolean but received a ${typeof newValue}`,
          newValue
        )
      return
    }
    if (this.debug) console.log("setConnected triggered with", newValue)
    this.state.isConnected = newValue
  },
  /**
   * Use to clear all store
   * @return undefined
   */
  clear() {
    this.state.isConnected = false
    this.credentials = null
  }
}
