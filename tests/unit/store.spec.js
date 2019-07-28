"use strict";
/* import { expect } from "chai"
import Storage from "../../src/store"
import _ from 'lodash'

describe("Storage", () => {
  describe("isConnected service", () => {
    beforeEach(() => {
      Storage.clear()
    })

    it("Should return that user is connected", () => {
      Storage.setConnected(true)

      expect(Storage.state.isConnected).to.be.true
    })

    it("Should return false if user is disconnected", () => {
      Storage.setConnected(false)

      expect(Storage.state.isConnected).to.be.false
    })

    it("Should return false if user is disconnected", () => {
      Storage.setConnected("Unexpected value")

      expect(Storage.state.isConnected).to.be.false
    })
  })

  describe("setUser()", () => {
    describe('Error case', () => {
      beforeEach(() => {
        Storage.clear()
      })
      describe('I call without credentials', () => {
        it('Should return false', () => {
          expect(Storage.setUser()).to.be.false

          _.forEach(Storage.credentials, (credential) => {
            expect(credential).to.be.null
          })
        })
      })
      describe('I call with bad credentials', () => {
        it('No credentials should be set', () => {
          const badCredentials = {
            badCredential1: "one",
            badCredential2: "one"
          }
          expect(Storage.setUser(badCredentials)).to.be.true
          _.forEach(Storage.credentials, (credential) => {
            expect(credential).to.be.null
          })
        })
      })
      describe('I call with bad field name', () => {
        it('Should return false', () => {
          expect(Storage.setUser('toto', 'badFieldName')).to.be.false
        })
      })
    })
    describe('Success case', () => {
      beforeEach(() => {
        Storage.clear()
      })
      describe('I call with partial credential', () => {
        it('Should set partial credential', () => {
          const partialCredential =  {
            id: 2,
            email: 'test@test.com'
          }

          expect(Storage.setUser(partialCredential)).to.be.true
          _.forEach(Storage.credentials, (credential, key) => {
            if (key === 'id') return expect(credential).to.be.equal(partialCredential.id)
            if (key === 'email') return expect(credential).to.be.equal(partialCredential.email)
            expect(credential).to.be.null
          })
        })
      })
      describe('I call with all partial', () => {
        it('Should set all credentials', () => {
          const allCredentials = {
            id: 'toto',
            username: 'toto',
            email: 'toto',
            role: 'toto',
            karma: 'toto',
            token: 'toto'
          }

          expect(Storage.setUser(allCredentials)).to.be.true

          _.forEach(Storage.credentials, (credential) => {
            expect(credential).to.be.equal('toto')
          })
        })
      })

      describe('I call with a fieldName', () => {
        it('Should set the data to the correct field', () => {
          expect(Storage.credentials.id).to.be.null
          expect(Storage.setUser({id: 1}, 'id'))
          expect(Storage.credentials.id).to.be.equal(1)
        })
      })

      describe('I call with a fieldName that have multiple key', () => {
        it('Should set only the correct field', () => {
          expect(Storage.credentials.id).to.be.null
          expect(Storage.setUser({id: 1, email: 'test@mail.com'}, 'id'))
          expect(Storage.credentials.id).to.be.equal(1)
        })
      })
    })
  })
})
*/
//# sourceMappingURL=store.spec.js.map