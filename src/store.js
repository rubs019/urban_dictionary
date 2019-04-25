export default {
  debug: true,
  state: {
    isConnected: false
  },
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
  }
}
