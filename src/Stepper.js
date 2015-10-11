module.exports = function (five) {
    var module = {};

    var stepper = new five.Stepper({
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: 1600,
        pins: {
            step: 8,
            dir: 9
        }
    });

    module.calibrate = function () {
        console.log('calibrate inner');
        stepper.rpm(45).ccw().step(1600, function () {
            console.log('calibrate inner');
        });
    };


    return module;
};

