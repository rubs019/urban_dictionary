import { expect } from "chai"
import AppLogIn  from "../../src/views/AppLogIn.vue"

// npm run test:unit --runTestsByPath /Users/rubyesgi/Documents/workspace/node/urban_dictionary_proto/app/tests/unit/appSignUp.spec.js

describe('checkCredentials()', () => {
	describe('I try to send empty credentials', () => {
		it('Should return false', () => {
			expect(AppLogIn.methods.checkCredentials({})).to.be.false
		})
	})

	describe('I send correct credentials', () => {
		it('Should return true', () => {
			const credentials =  {
				login: 'test',
				pwd: 'testtest'
			}
			expect(AppLogIn.methods.checkCredentials(credentials)).to.be.true
		})
	})

	describe('I send partials bad credentials', () => {
		it('Should return false', () => {
			const credentials =  {
				login: 'test',
				test: 'testtest'
			}
			expect(AppLogIn.methods.checkCredentials(credentials)).to.be.false
		})
	})
})

