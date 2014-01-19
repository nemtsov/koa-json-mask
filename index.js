var jsonMask = require('json-mask');
var compile = jsonMask.compile;
var filter = jsonMask.filter;

/**
 * Mask parts of the response.
 *
 *  - `name` querystring param name [fields]
 *
 * @param {Object} opts
 * @return {GeneratorFunction}
 * @api public
 */

module.exports = function (opts) {
  opts = opts || {};
  var name = opts.name || 'fields';

  return function *mask(next) {
    yield *next;

    var body = this.body;

    // non-json
    if (!body || 'object' != typeof body) return;

    // check for fields
    var fields = this.query[name] || this.fields;
    if (!fields) return;

    this.body = filter(this.body, compile(fields));
  };
};
