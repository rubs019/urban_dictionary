import { expect } from "chai";
import buildRequestConfig from "@/helpers/buildRequestConfig";
import { Methods } from '@/services/request/request';
describe('buildRequestConfig', () => {
    it('Should return true', () => {
        const fakeData = {
            url: 'http://url.com',
            method: Methods.POST,
            headers: {},
            data: {
                username: 'test'
            }
        };
        expect(buildRequestConfig(fakeData.url, fakeData.method, fakeData.headers, fakeData.data)).to.be.equal(fakeData);
    });
});
//# sourceMappingURL=buildRequestConfig.spec.js.map