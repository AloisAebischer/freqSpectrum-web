(function () {
    'use strict';
    angular
        .module('freq-spectrum')
        .controller('graphCtrl', graphCtrl);

    function graphCtrl($scope) {
        $scope.frequencyData=[];
        $scope.waveData=[];
        var graphFrequency, graphWave, graphDataFreq=0, graphDataWave=0;
        $scope.updateGraph = function() {
            if($scope.waveData.length > 0){
                graphDataWave=[];
                for(var i=0;i<$scope.waveData.length;i++){
                    var obj1 = { x: i/$scope.freqSampling*1000, y: $scope.waveData[i]};
                    graphDataWave.push(obj1);
                }
                graphDataFreq=[];
                for(var i=0;i<$scope.frequencyData.length;i++){
                    var obj1 = { x: i*$scope.freqSampling/$scope.samples, y: $scope.frequencyData[i]};
                    graphDataFreq.push(obj1);
                }
                graphWave.data.datasets[0].data = graphDataWave;
                graphWave.options.scales.xAxes[0].ticks.max = ($scope.samples/$scope.freqSampling).toFixed(2)*1000;
                graphWave.update();
                graphFrequency.data.datasets[0].data = graphDataFreq;
                graphFrequency.options.scales.xAxes[0].ticks.max = ($scope.freqSampling/2/10000).toFixed(0)*10000;
                graphFrequency.update();
            }
        }
        function drawFrequencyGraph() {
            var context = document.getElementById("chartFreq");
            var graphData = {
                datasets: [{
                    borderColor: 'lime',
                    pointBackgroundColor: 'white',
                    borderWidth: 0,
                    pointRadius: 0,
                    data: graphDataFreq
                }]
            }
            graphFrequency = new Chart(context, {
                type: 'line',
                data: graphData,
                options: {
                    title:{
                        display: true,
                        fontSize: 20,
                        fontColor: "white",
                        text: "Frequency Spectrum"
                    },
                    animation : false,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        enabled: false,
                    },
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom',
                            scaleLabel: {
                                display: true,
                                fontColor: "white",
                                fontSize: 20,
                                labelString: '[Hz]',
                            },
                            ticks: {
                                min: 0,
                                max: 20000,
                                fontColor: "white"
                            },
                            gridLines: {
                                display: true,
                                color: "white",
                            }
                        }],
                        yAxes: [{
                            type: 'linear',
                            position: 'left',
                            scaleLabel: {
                                display: true,
                                fontColor: "white",
                                fontSize: 20,
                                labelString: 'Amplitude',
                            },
                            ticks: {
                                fontColor: "white",
                                min: 0,
                                max: 500,
                                stepSize: 100,
                            },
                            gridLines: {
                                display: true,
                                color: "white",
                            }
                        }]
                    }
                }
            });
        }
        drawFrequencyGraph();
        function drawWaveGraph () {
            var context = document.getElementById("chartWave");
            var graphData = {
                datasets: [{
                    borderColor: "red",
                    pointBackgroundColor: 'white',
                    borderWidth: 0,
                    pointRadius: 0,
                    data: graphDataWave,
                }]
            };
            graphWave = new Chart(context, {
                type: 'line',
                data: graphData,
                options: {
                    title:{
                        display: true,
                        fontSize: 20,
                        fontColor: "white",
                        text: "Sound Wave"
                    },
                    animation : false,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        enabled: false,
                    },
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom',
                            scaleLabel: {
                                display: true,
                                fontColor: "white",
                                fontSize: 20,
                                labelString: '[ms]',
                            },
                            ticks: {
                                min: 0,
                                max: 500,
                                fontColor: "white"
                            },
                            gridLines: {
                                display: true,
                                color: "white",
                            }
                        }],
                        yAxes: [{
                            type: 'linear',
                            position: 'left',
                            scaleLabel: {
                                display: true,
                                fontColor: "white",
                                fontSize: 20,
                                labelString: 'ADC',
                            },
                            ticks: {
                                display: true,
                                min: -600,
                                max: 600,
                                stepSize: 200,
                                fontColor: "white"
                            },
                            gridLines: {
                                display: true,
                                color: "white",
                                zeroLineColor: "white",
                            }
                        }]
                    }
                }
            });
        }
        drawWaveGraph();
    }

} ());
