const jsonMask = require('json-mask');
const compile = jsonMask.compile;
const filter = jsonMask.filter;

/**
 * Mask parts of the response.
 *
 *  - `name` querystring param name [fields]
 *
 * @param {Object} opts
 * @return {Promise}
 * @api public
 */

module.exports = opts => {
  opts = opts || {};
  const name = opts.name || 'fields';

  return async function mask(ctx, next) {
    await next();

    const body = ctx.body;

    // non-json
    if (!body || 'object' != typeof body) return;

    // check for fields
    const fields = ctx.query[name] || ctx.fields;
    if (!fields) return;

    ctx.body = filter(ctx.body, compile(fields));
  };
};
