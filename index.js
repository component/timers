
/**
 * Expose `Timers`.
 */

module.exports = Timers;

/**
 * Initialize a new timer set with optional `ids`.
 *
 * @param {Array} [ids]
 * @api public
 */

function Timers(ids) {
  this.ids = ids || [];
}

/**
 * Add timeout `fn`.
 *
 * @param {Function} fn
 * @param {Number} ms
 * @return {Number} timer id
 * @api public
 */

Timers.prototype.timeout = function(fn, ms){
  var id = setTimeout(fn, ms);
  this.ids.push(id);
  return id;
};

/**
 * Add interval `fn`.
 *
 * @param {Function} fn
 * @param {Number} ms
 * @return {Number} timer id
 * @api public
 */

Timers.prototype.interval = function(fn, ms){
  var id = setInterval(fn, ms);
  this.ids.push(id);
  return id;
};

/**
 * Clear all timers.
 *
 * @api public
 */

Timers.prototype.clear = function(){
  this.ids.forEach(clearTimeout);
  this.ids = [];
};
