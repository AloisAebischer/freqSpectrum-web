/*jshint esversion: 6 */
angular.module('freq-spectrum', []).controller('mainController', ['$scope', '$timeout', '$interval', function ($scope, $timeout, $interval) {
    var mainVm = this;

    $scope.interfaceData = {
        frequencyData: [],
        waveData: [],
    };

    //Connect to serial port for Arduino
    var arduinoPort = new SerialPort('COM7', { baudRate: 250000, parser: SerialPort.parsers.readline("\n") }, function (err) {
        if (err) console.error('Error opening Arduino serial port');
        else console.log("Arduino serial port open");
    });
    function init() {
        arduinoPort.on('data', function (data) {
        });
    }
    init();
}
])
