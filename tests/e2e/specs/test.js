const { expect } = require("chai")

module.exports = {
	"default e2e tests": browser => {
		browser
			.url(process.env.VUE_DEV_SERVER_URL)
			.waitForElementVisible("#app", 5000)
			.assert.elementPresent('a[href="/signup"]')
			.click('a[href="/signup"]')
			.waitForElementVisible('p.title', 5000)
			.setValue('input#login.input',['\u0008', '\u0008', '\u0008', '\u0008', '\u0008'])
			.setValue('input#login.input', 'Boubou')
			.getValue('input#login.input', (elem) => {
				expect(elem.value).to.be.equal('Boubou')
			})
	},

	after: browser => {
		browser.end()
	}
}
