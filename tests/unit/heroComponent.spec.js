import { expect } from "chai"
import { shallowMount } from "@vue/test-utils"
import heroComponent from "@/components/AppHeroComponent.vue"

describe("heroComponent.vue", () => {
  it("render undefined props when passed", () => {
    const wrapper = shallowMount(heroComponent, {
      propsData: { AppName: undefined, AppDescription: undefined }
    })
    expect(wrapper.props().AppName).to.be.undefined
    expect(wrapper.props().AppDescription).to.be.undefined
  })
})
