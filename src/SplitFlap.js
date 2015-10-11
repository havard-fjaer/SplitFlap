// Router
var express = require('express');
var app = express();

// Hardware
var five = require("johnny-five");
var board = new five.Board();
var Stepper = require('./Stepper.js');
var LCD = require('./lcd.js');

board.on("ready", function() {

    var stepper = new Stepper(45, 12);
    var lcd = new LCD();
    var api = express.Router();

    lcd.print("Calibrating");
    stepper.calibrate(function(){
        lcd.print("Calibrated");
    });

    // Calibration API
    api.get('/calibrate/start', function (req, res) {
        stepper.calibrate();
        var text = "Calibrate";
        lcd.print(text);
        message(text,res);
    });

    api.get('/calibrate/stop', function (req, res) {
        stepper.stopCalibration();
        var text = "Stopped calibration";
        lcd.print(text);
        message(text,res);
    });

    // Position API
    api.get('/position/:position', function (req, res) {
        stepper.goToPosition(req.params.position, function(){
            var text = "Position: " + req.params.position;
            lcd.print(text);
            message(text, res);
        });
    });

    // Display API
    api.get('/display/:text', function (req, res) {
        lcd.print(req.params.text);
        message(req.params.text, res)
    });

    api.get('/display/:line1/:line2', function (req, res) {
        lcd.print(req.params.line1, req.params.line2);
        message(req.params.line1 + "<br>" + req.params.line2, res)
    });

    // Router and server
    app.use('/api', api);
    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('SplitFlap listening at  http://%s:%s', host, port);
    });

    // Helpers
    function message(text,res) {
        console.log(text);
        res.send(text);
    }

});
