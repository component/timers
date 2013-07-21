/**
 * Global reference.
 */
 
var global = this;

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
  var timers = this.timers = {};
  ids.forEach(function(id){
    timers[id] = null;
  });
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
  return create('setTimeout', fn, ms);
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
  return create('setInterval', fn, ms);
};

/**
 * Pause timer.
 * 
 * @param {Number} timer id
 * @api public
 */

Timers.prototype.pause = function(id){
  var timer = this.timers[id];
  if(!timer) return;
  clearTimeout(id);
  timer.remaining -= Date.now() - timer.start;
}

/**
 * Resume timer.
 * 
 * @param {Number} timer id
 * @api public
 */
 
Timers.prototype.resume = function(id){
  var timer = this.timers[id];
  if(!timer) return;
  timer.start = Date.now();
  global[timer.type](cb, timer.remaining);
}

/**
 * Clear all timers or `id`.
 *
 * @param {Number} optional id
 * @api public
 */

Timers.prototype.clear = function(id){
  if(id){
   clearTimeout(id);
   delete this.timers[id];
   return;
  }
  for(var id in this.timers){
    clearTimeout(this.timers[id]);
  }
  this.timers = {};
};


/**
 * Create timer.
 * 
 * @param {String} setTimeout|setInterval
 * @param {Function} fn
 * @param {Number} ms
 * @api private
 */
 
function create(type, fn, ms){
  var now = Date.now();
  var id = global[type](fn, ms);
  var details = {
    type: type,
    fn: fn,
    start: now,
    remaining: now
  }
  this.timers[id] = details;
  return id;
}
