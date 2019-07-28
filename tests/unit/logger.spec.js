import { expect } from "chai";
import logger from "../../src/helpers/logger";
describe('logger()', () => {
    describe('I try to log in a dev environment', () => {
        it('Should return true', () => {
            expect(logger('test', { id: 1 })).to.be.true;
        });
    });
});
//# sourceMappingURL=logger.spec.js.map