/*jshint esversion: 6 */
angular.module('freq-spectrum', []).controller('mainController', ['$scope', '$timeout', '$interval', function ($scope, $timeout, $interval) {
    var mainVm = this;

    $scope.interfaceData = {
        frequencyData: [],
        waveData: [],
        update: true,
    };

    //Connect to serial port for Arduino
    var arduinoPort = new SerialPort('COM3', { baudRate: 250000, parser: SerialPort.parsers.readline("\n") }, function (err) {
        if (err) console.error('Error opening Arduino serial port');
        else console.log("Arduino serial port open");
    });
    var index1=0, index2=0, index3=0, serialSeq=0, freqSampling, samples;
    function init() {
        arduinoPort.on('data', function (data) {
            if(serialSeq==0){
                freqSampling=data;
                serialSeq++;
            }
            else if(serialSeq==1){
                samples=data;
                serialSeq++;
            }
            else{
                if(index1==samples && index2==0){
                    index1=0;
                    index2=1;
                }
                else if(index1==samples/2 && index2==1){
                    index1=0;
                    index2=0;
                    $scope.interfaceData.update=!$scope.interfaceData.update;
                    $scope.$apply();
                    $scope.interfaceData.waveData = [];
                    $scope.interfaceData.frequencyData = [];
                }
                if(index2==0){
                    $scope.interfaceData.waveData.push([index1/freqSampling*1000, data]);
                }
                else if(index2==1){
                    $scope.interfaceData.frequencyData.push([index1/samples*freqSampling, data]);
                }
                index1++;
            }
        });
    }
    init();
}
])
