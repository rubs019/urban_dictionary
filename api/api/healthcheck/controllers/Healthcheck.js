'use strict';

/**
 * A set of functions called "actions" for `Healthcheck`
 */

module.exports = {
  index: async ctx => {
    ctx.body = 'ok';
  }
};
