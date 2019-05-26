import { expect } from "chai"
import { mount }  from "@vue/test-utils"
import AppSignUp  from "../../src/views/AppSignUp"

// npm run test:unit --runTestsByPath /Users/rubyesgi/Documents/workspace/node/urban_dictionary_proto/app/tests/unit/signUp.spec.js

describe('checkPassword()', () => {
	describe('I\'m trying to test two different passwords', () => {
		it('I Should return false', () => {
			const badPwd = {
				pwd: 'toto',
				pwd2: 'toto2'
			}
			expect(AppSignUp.methods.checkPassword(badPwd)).to.be.false
		})
	})
	describe('I\'m trying to test same passwords', () => {
		it('I Should return false', () => {
			const goodPwd = {
				pwd: 'toto',
				pwd2: 'toto'
			}
			expect(AppSignUp.methods.checkPassword(goodPwd)).to.be.true
		})
	})
	describe("I'm trying to test undefined password", () => {
		it('Should return false', () => {
			expect(AppSignUp.methods.checkPassword({})).to.be.false
		})
	})
})

describe('checkPasswordLength()', () => {
	describe('I\'m trying to test a short password', () => {
		it('Should return false', () => {
			const badPwd = {
				pwd: 'toto'
			}
			expect(AppSignUp.methods.checkPasswordLength(badPwd)).to.be.false
		})
	})
	describe('I\'m trying to test a password with correct length', () => {
		it('I Should return false', () => {
			const goodPwd = {
				pwd: '123456',
			}
			expect(AppSignUp.methods.checkPasswordLength(goodPwd)).to.be.true
		})
	})
	describe("I'm trying to test undefined password", () => {
		it('Should return false', () => {
			expect(AppSignUp.methods.checkPasswordLength({})).to.be.false
		})
	})
})

