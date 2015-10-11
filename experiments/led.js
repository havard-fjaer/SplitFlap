var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
//  var led = new five.Led(11);
  var led2 = new five.Led(13);
  //led.blink(500);
  led2.blink(500);
});
