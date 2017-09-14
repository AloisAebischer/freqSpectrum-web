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
            //Read the frequency sampling
            if(serialSeq==0){
                freqSampling=data;
                serialSeq++;
            }
            //Read the amount of samples
            else if(serialSeq==1){
                samples=data;
                serialSeq++;
            }
            else{
                //Fill array of wave data
                if(index2==0){
                    //Init arrays
                    if(index1 == 0){
                        $scope.interfaceData.waveData = [];
                        $scope.interfaceData.frequencyData = [];
                    }
                    $scope.interfaceData.waveData.push([index1/freqSampling*1000, data]);
                    //End of wave data
                    if (index1==samples-1){
                        index1=-1
                        index2=1;
                    } 
                }
                //Fill array of frequency data
                else if(index2==1){
                    $scope.interfaceData.frequencyData.push([index1/samples*freqSampling, data]);
                    //End of frequency data
                    if(index1==samples/2-1){
                        index1=-1;
                        index2=0;
                        $scope.interfaceData.update=!$scope.interfaceData.update;
                        $scope.$apply();
                    }
                }
                index1++;
            }
        });
    }
    init();
}
])
