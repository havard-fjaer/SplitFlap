var five = require("johnny-five");

module.exports = function () {

    const cols = 16;
    const rows = 2;
    lcd = new five.LCD({

        // 7  6  -  +  -
        //12 11 10  9  8

        // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
        // Arduino pin #  7   6   11  10   9   8
        pins: [7, 6, 11, 10, 9, 8],
        backlight: 12,
        rows: rows,
        cols: cols

        // Options:
        // bitMode: 4 or 8, defaults to 4
        // lines: number of lines, defaults to 2
        // dots: matrix dimensions, defaults to "5x8"
    });

    // Tell the LCD you will use these characters:
    lcd.useChar("check");
    lcd.useChar("heart");
    lcd.useChar("duck");


    function washText(text) {
        if(text === undefined) return "";
        if (text.length > cols)
            return text.substring(0, cols-1);
        return text;
    }

    this.print = function (text) {
        lcd.clear().cursor(0, 0).print(washText(text));
    };

    this.print = function (line1, line2) {
        lcd.clear().cursor(0, 0).print(washText(line1))
            .cursor(1, 0).print(washText(line2));
    };

};