(function () {
    'use strict';
    angular
        .module('freq-spectrum')
        .controller('graphCtrl', graphCtrl);

    function graphCtrl($scope) {
        var graphFrequency, graphWave, graphDataFreq=0, graphDataWave=0;
        $scope.updateGraph = function() {
            if($scope.waveData.length > 0){
                graphDataFreq=[];
                for(var i=0;i<$scope.frequencyData.length;i++){
                    var obj1 = { x: $scope.frequencyData[i][0], y: $scope.frequencyData[i][1]};
                    graphDataFreq.push(obj1);
                }
                graphDataWave=[];
                for(var i=0;i<$scope.waveData.length;i++){
                    var obj1 = { x: $scope.waveData[i][0], y: $scope.waveData[i][1]};
                    graphDataWave.push(obj1);
                }
                graphFrequency.data.datasets[0].data = graphDataFreq;
                graphFrequency.options.scales.xAxes[0].ticks.max = Math.round($scope.frequencyData[$scope.frequencyData.length - 1][0]/1000)*1000;
                graphFrequency.update();
                graphWave.data.datasets[0].data = graphDataWave;
                graphWave.options.scales.xAxes[0].ticks.max = Math.round(($scope.waveData[$scope.waveData.length - 1][0])/10)*10;
                graphWave.update();
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
                                max: 5000,
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
                                labelString: '[dB]',
                            },
                            ticks: {
                                fontColor: "white",
                                min: 0,
                                max: 250,
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
                                max: 30,
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
                                labelString: 'Pressure',
                            },
                            ticks: {
                                display: true,
                                min: -1000,
                                max: 1000,
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
