import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import heroComponent from "@/components/heroComponent.vue";

describe("heroComponent.vue", () => {
  it("renders all props when passed", () => {
    const AppName = "Title";
    const AppDescription = "Description";
    const wrapper = shallowMount(heroComponent, {
      propsData: { AppName, AppDescription }
    });
    expect(wrapper.props().AppName).to.include(AppName);
    expect(wrapper.props().AppDescription).to.include(AppDescription);
  });

  it("render undefined props when passed", () => {
    const wrapper = shallowMount(heroComponent, {
      propsData: { AppName: undefined, AppDescription: undefined }
    });
    expect(wrapper.props().AppName).to.be.undefined;
    expect(wrapper.props().AppDescription).to.be.undefined;
  });
});
