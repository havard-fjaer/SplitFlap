//var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function() {

  // Create an Led on pin 7 (GPIO4) on P1 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
  (new five.Led('P1-7')).strobe();
});

