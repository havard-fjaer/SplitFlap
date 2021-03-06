var five = require("johnny-five");

module.exports = function (speed, availablePositions) {

    // Initialize
    var stepsPerRev = 1600;
    var stepper = new five.Stepper({
        type: five.Stepper.TYPE.DRIVER,
        stepsPerRev: stepsPerRev,
        pins: {
            step: 4,
            dir: 3
        }
    });
    var calibrationSensor = new five.Button(5);
    var isCalibrating = false;
    var currentPosition = 1;


    // Go to position
    this.goToPosition = function (newPosition, callback) {
        // Clean input
        if (newPosition > availablePositions)
            newPosition = availablePositions;
        if (newPosition < 1 || !(newPosition <= availablePositions && newPosition >= 1))
            newPosition = 1;


        moveOnePosition(newPosition, function () {
            callback(newPosition);
        });
    };

    // Movement runner
    var moveOnePosition = function (newPosition, callback) {

        // Stop if at position
        if (currentPosition == newPosition) return callback();

        // Increment to next position
        if (currentPosition >= availablePositions)
            currentPosition = 1;
        else
            currentPosition++;

        // Move to position, and prepare next move
        stepper.rpm(speed).ccw().step(stepsPerRev / availablePositions, function () {
            moveOnePosition(newPosition, callback);
        });

    };


    // Calibrate
    this.calibrate = function (callback) {
        isCalibrating = true;
        calibrationStep(function () {
            callback();
        });
    };

    // Stop calibrating
    this.stopCalibration = function () {
        isCalibrating = false;
    };

    // Stop calibrating on sensor
    calibrationSensor.on("release", function () {
        isCalibrating = false;
        currentPosition = 1;

    });

    // Calibration runner
    var calibrationStep = function (callback) {
        if (isCalibrating === false)
            return callback();

        stepper.rpm(15).ccw().step(stepsPerRev / 360, function () {

            // Will this eventually cause a stack overflow?
            calibrationStep(callback);
        });
    }

};