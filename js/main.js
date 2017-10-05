var app = angular.module("freq-spectrum", []);
app.controller("mainController", function ($scope) {
    $scope.interfaceData = {
        frequencyData: [],
        waveData: [],
        update: true,
        samples: 0,
        freqSampling: 0,
    };

    //Connect to serial port for Arduino
    var arduinoPort = new SerialPort('COM3', { baudRate: 250000, parser: SerialPort.parsers.readline("\n") }, function (err) {
        if (err) console.error('Error opening Arduino serial port');
        else console.log("Arduino serial port open");
    });
    var index1 = 0, index2 = 0, index3 = 0, serialSeq = 0, freqSampling, samples;
    function init() {
        var samples;
        var freqSampling;

        arduinoPort.on('data', function (data) {
            //Read the frequency sampling
            if (serialSeq == 0) {
                freqSampling = data;
                serialSeq++;
            }
            //Read the amount of samples
            else if (serialSeq == 1) {
                samples = data;
                serialSeq++;
            }
            //Fill array of wave data
            else {
                //Init arrays
                if (index1 == 0 && index3 == 0) {
                    $scope.interfaceData.freqSampling = freqSampling;
                    $scope.interfaceData.samples = samples;
                    $scope.interfaceData.waveData = new Float32Array($scope.interfaceData.samples);
                    $scope.interfaceData.frequencyData = new Float32Array($scope.interfaceData.samples/2);
                }
                $scope.interfaceData.waveData[index1] = 5*(data-505);
                //End of wave data
                if (index1 == $scope.interfaceData.samples - 1) {
                    index1 = -1
                    //Compute fft with normalized amplitude
                    $scope.interfaceData.frequencyData = ft($scope.interfaceData.waveData);
                    $scope.$apply();
                }
                index1++;
            }
        });
    }
    init();
});