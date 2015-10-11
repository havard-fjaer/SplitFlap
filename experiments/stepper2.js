var five = require("johnny-five");
var http = require("http");
var board = new five.Board();

board.on("ready", function() {


var button = new five.Button(2);
var stepper = new five.Stepper({
    type: five.Stepper.TYPE.DRIVER,
    stepsPerRev: 1600,
    pins: {
      step: 3,
      dir: 4
    }
  });


function handleRequest(request, response){
  if(request.url === '/position/1'){
    stepper.rpm(45).ccw().step(1600, function() {
      console.log("Rotation");
      response.end("Rotation");
    });
  }
}

var server = http.createServer(handleRequest);


server.listen(8081, function(){
       console.log("Server listening ");
});


  button.on("press", function() {
    stepper.rpm(45).ccw().step(1600, function() {
      console.log("Rotation");
    });
  });
});

