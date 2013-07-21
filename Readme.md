# timers

  Timer management to clear large batches of timers.

## Installation

    $ component install component/timers

## Example

  In the following example the last two timers will not fire.

```js
var Timers = require('timers');
var timers = new Timers;

timers.timeout(function(){
  console.log('one');
}, 1000);

timers.timeout(function(){
  console.log('two');
}, 2000);

timers.timeout(function(){
  console.log('three');
}, 3000);

setTimeout(function(){
  timers.clear();
}, 1500);
```

## API

### Timers()

  Initialize a new timer set with optional `ids`.

### Timers.timeout(fn:Function, ms:Number)

  Add timeout `fn`.

### Timers.interval(fn:Function, ms:Number)

  Add interval `fn`.

### Timers.clear()

  Clear all timers.

### Timers.pause(id:Number)
  Pause timer `id`

### Timers.resume(id:Number)
  Resume timer `id`

## License

  MIT
