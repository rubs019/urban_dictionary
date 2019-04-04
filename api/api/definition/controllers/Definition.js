'use strict';

/**
 * Definition.js controller
 *
 * @description: A set of functions called "actions" for managing `Definition`.
 */

module.exports = {

  /**
   * Retrieve definition records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.definition.search(ctx.query);
    } else {
      return strapi.services.definition.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a definition record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.definition.fetch(ctx.params);
  },

  /**
   * Count definition records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.definition.count(ctx.query);
  },

  /**
   * Create a/an definition record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.definition.add(ctx.request.body);
  },

  /**
   * Update a/an definition record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.definition.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an definition record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.definition.remove(ctx.params);
  }
};
