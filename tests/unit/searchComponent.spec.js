import { expect } from "chai"
import { mount } from "@vue/test-utils"
import searchComponent from "@/components/SearchComponent.vue"

//run "npm run test:unit --runTestsByPath /Users/rubyesgi/Documents/workspace/node/urban_dictionary_proto/app/tests/unit/searchComponent.spec.js"

describe("searchComponent.vue", () => {
  it("should not have border style when props border is null OR undefined", () => {
    const wrapper = mount(searchComponent)
    const classToTest = wrapper.find("input")
    expect(classToTest.is("input")).to.be.true
    expect(wrapper.classes()).to.not.have.members(["border-input"])
  })

  it("should have border style when props border is set to true", () => {
    const wrapper = mount(searchComponent, {
      propsData: { border: true }
    })
    const classToTest = wrapper.find("input")
    expect(classToTest.classes()).to.contain("border-input")
  })

  describe("resultList function", () => {
    it("should return false if the resultList is empty", () => {
      const wrapper = mount(searchComponent)
      const ul = wrapper.find("ul#list-expression")
      expect(ul.exists()).to.be.false
    })

    it("should return true if the expression has been added", () => {
      const wrapper = mount(searchComponent)
      wrapper.setData({
        expressions: [{name: "Tchoin"}]
      })
      const ul = wrapper.find("ul#list-expression")
      expect(ul.exists()).to.be.true
      expect(ul.contains('li')).to.be.true
      const li = ul.find('li')
      expect(li.text()).to.be.equal('Tchoin')
    })
  })
})
