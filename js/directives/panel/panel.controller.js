(function () {
    'use strict';
    angular
        .module('freq-spectrum')
        .controller('panelCtrl', panelCtrl);

    function panelCtrl($scope) {
        $scope.frequencyData = [];
        $scope.waveData = [];
        var fileNameObj = document.getElementById("file-name");
        var messageOkObj = document.getElementById("messageOk");
        var messageErrorObj = document.getElementById("messageError");

        //Enter key event to save the data
        fileNameObj.addEventListener("keyup", function (event) {
            if (event.keyCode == 13) {
                $scope.saveData();
            }
        });
        //Write data and save file
        $scope.saveData = function () {
            var dataToSave = [$scope.samples, $scope.freqSampling, $scope.waveData];
            if (fileNameObj.value == "") {
                messageErrorObj.style.opacity = 1;
                setTimeout(function () { messageErrorObj.style.opacity = 0; }, 5000);
            }
            else {
                fs.writeFile("./dataBase/" + fileNameObj.value + ".txt", dataToSave, "utf8", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    messageOkObj.style.opacity = 1;
                    setTimeout(function () { messageOkObj.style.opacity = 0; }, 5000);
                });
            }
        }
        //Open a file
        var keyMapLoc = '\\path\\to\\file.txt';
        var chooser = document.getElementById("fileDialog");
        chooser.addEventListener("click", function (evt) {
            this.value = null;
        });
        //Event to select the path of the file to open
        chooser.addEventListener("change", function (evt) {
            // When we reach this point, it means the user has selected a file,
            //this.value contains the path to the selected file
            var ffile = this.value || keyMapLoc;
            //Read the data of the selected file
            $scope.waveData = new Float32Array($scope.samples);
            fs.readFile(ffile, "utf8", function read(err, data) {
                if (err) {
                    throw err;
                }
                var value = [], indexInfo = 0, indexSample = 0;
                //Loop through all the char of the file
                for (var i = 0; i < data.length; i++) {
                    //, represents the end of a value
                    if (data[i] == ",") {
                        if (indexInfo == 0) {
                            $scope.samples = value;
                            value = [];
                            indexInfo++;
                        }
                        else if (indexInfo == 1) {
                            $scope.freqSampling = value;
                            value = [];
                            indexInfo++;
                        }
                        else {
                            //Fill the wave array
                            $scope.waveData[indexSample] = value;
                            indexSample++;
                            value = [];
                        }
                    }
                    //Read x value
                    else value = value + data[i];
                }
                $scope.frequencyData = ft($scope.waveData);
                $scope.$apply();
            });
        }, false);
        // Trigger click event on the chooser, this will bring up the dialog
        $scope.showTheFile = function () {
            chooser.click()
        }
        //Compute peaks
        $scope.computePeaks = function () {
            var derivate0 = 0, derivate1 = 0;
            //Remove previous frequency list
            var ul = document.getElementById("list-freq");
            var lis = ul.getElementsByTagName("li")
            while (lis.length > 0) {
                ul.removeChild(lis[0]);
            }
            if ($scope.frequencyData.length > 0) {
                //Compute derivate to find peaks
                for (var i = 0; i < $scope.frequencyData.length - 1; i++) {
                    derivate1 = $scope.frequencyData[i + 1] - $scope.frequencyData[i];
                    if (derivate1 <= 0 && derivate0 >= 0 && ($scope.frequencyData[i + 1] + $scope.frequencyData[i]) / 2 > 50) {
                        var li = document.createElement("li");
                        li.appendChild(document.createTextNode((((i+1)*$scope.freqSampling/$scope.samples + (i*$scope.freqSampling/$scope.samples))/2).toFixed(0) + "Hz"));
                        ul.appendChild(li);
                    }
                    derivate0 = derivate1;
                }
            }
        }
    }


}());
