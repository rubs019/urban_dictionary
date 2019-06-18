import { shallowMount } from "@vue/test-utils"
import { expect }       from "chai"
import AppGames         from "../../src/views/games/AppGames"

describe('Definitions should be set', () => {

	it('PASSED TEST', async () => {
		const appHomeWrapper = shallowMount(AppGames,{
			stubs: {
				OneDefinition
			}
		})
		expect(appHomeWrapper.find(OneDefinition).exists()).to.be.true
	})
})
