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
   * @param credentials
   * @return undefined
   */
  setUser(credentials) {
    this.credentials = credentials
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
  clear() {
    this.state.isConnected = false
    this.credentials = null
  }
}
