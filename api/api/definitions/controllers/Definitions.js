'use strict';

/**
 * Definitions.js controller
 *
 * @description: A set of functions called "actions" for managing `Definitions`.
 */

module.exports = {

  /**
   * Retrieve definitions records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.definitions.search(ctx.query);
    } else {
      return strapi.services.definitions.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a definitions record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.definitions.fetch(ctx.params);
  },

  /**
   * Count definitions records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.definitions.count(ctx.query);
  },

  /**
   * Create a/an definitions record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.definitions.add(ctx.request.body);
  },

  /**
   * Update a/an definitions record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.definitions.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an definitions record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.definitions.remove(ctx.params);
  }
};
