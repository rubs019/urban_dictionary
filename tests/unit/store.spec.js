import { expect } from "chai"
import Storage from "../../src/store"

describe("Storage", () => {
  describe("isConnected service", () => {
    beforeEach(() => {
      Storage.clear()
    });

    it("Should return that user is connected", () => {
      Storage.setConnected(true)

      expect(Storage.state.isConnected).to.be.true
    });

    it("Should return false if user is disconnected", () => {
      Storage.setConnected(false)

      expect(Storage.state.isConnected).to.be.false
    });

    it("Should return false if user is disconnected", () => {
      Storage.setConnected("Unexpected value")

      expect(Storage.state.isConnected).to.be.false
    });
  })
});
