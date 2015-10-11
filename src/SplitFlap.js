var express = require('express');
var app = express();

var five = require("johnny-five"),
    board, lcd;

board = new five.Board();

board.on("ready", function() {

    lcd = new five.LCD({
        // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
        // Arduino pin # 7    8   9   10  11  12
        // Arduino pin # 12  11   5    4   3   2
        pins: [12, 11, 5, 4, 3, 2],
        backlight: 6,
        rows: 2,
        cols: 20


        // Options:
        // bitMode: 4 or 8, defaults to 4
        // lines: number of lines, defaults to 2
        // dots: matrix dimensions, defaults to "5x8"
    });

    // Tell the LCD you will use these characters:
    lcd.useChar("check");
    lcd.useChar("heart");
    lcd.useChar("duck");

    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    var api = express.Router();

    api.get('/position/:position', function (req, res) {
        var text = "Position: " + req.params.position;
        console.log(text);
        res.send(text);
        lcd.clear().cursor(0, 0).print(text);
    });

    api.get('/calibrate/:speed', function (req, res) {
        var text = "Calibrate: " + req.params.speed;
        console.log(text);
        res.send(text);
        lcd.clear().cursor(0, 0).print(text);
    });

    api.get('/display/:line1/:line2', function (req, res) {
        var text = req.params.line1 + " " + req.params.line2;
        console.log(text);
        res.send(text);
        lcd.clear().cursor(0, 0).print(req.params.line1)
            .cursor(1, 0).print(req.params.line2);
    });

    app.use('/api', api); // load the router on '/api'

    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);
    });


    this.repl.inject({
        lcd: lcd
    });

});
