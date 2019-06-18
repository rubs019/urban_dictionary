import { expect }              from "chai"
import AppHome                 from "../../src/views/AppHome"
import OneDefinition           from '../../src/components/definitions/OneDefinition'
import { mount, shallowMount } from "@vue/test-utils"
import sinon                   from 'sinon'


const definitionData = {
	"createdAt": "2019-06-10T00:09:02.662Z",
	"updatedAt": "2019-06-10T00:09:02.662Z",
	"id": "string",
	"name": "string",
	"definition": "string",
	"userId": "string",
	"tags": [
		"string"
	],
	"score": 0,
	"userUpVoted": true,
	"userDownVoted": true,
	"userVoteId": "string",
	"user": {
		"createdAt": "2019-06-10T00:09:02.662Z",
		"updatedAt": "2019-06-10T00:09:02.662Z",
		"id": "string",
		"username": "string",
		"email": "string",
		"locale": "string",
		"karma": 0,
		"role": "Admin"
	},
	"locale": "string"
}

describe('Definitions should be set', () => {

	it('PASSED TEST', async () => {
		const appHomeWrapper = shallowMount(AppHome,{
			stubs: {
				OneDefinition
			}
		})
		expect(appHomeWrapper.find(OneDefinition).exists()).to.be.true
	})
})
