(function () {
    'use strict';
    angular
        .module('freq-spectrum')
        .controller('panelCtrl', panelCtrl);

    function panelCtrl($scope) {
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
        $scope.saveData = function(){
            var dataToSave = [];
            for (var i = 0; i < $scope.waveData.length; i++) {
                dataToSave.push([($scope.waveData[i][0]).toFixed(3), $scope.waveData[i][1]]);
            }
            for (var i = 0; i < $scope.frequencyData.length; i++) {
                dataToSave.push([($scope.frequencyData[i][0]).toFixed(3), $scope.frequencyData[i][1]]);
            }
            dataToSave.push("");
            if(fileNameObj.value == ""){
                messageErrorObj.style.opacity = 1;
                setTimeout(function(){ messageErrorObj.style.opacity = 0; }, 5000);
            }
            else{
                fs.writeFile("./dataBase/" + fileNameObj.value + ".txt", dataToSave, "utf8", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    messageOkObj.style.opacity = 1;
                    setTimeout(function(){ messageOkObj.style.opacity = 0; }, 5000);
                });
            }
        }
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
            $scope.waveData=[];
            $scope.frequencyData=[];
            fs.readFile(ffile, "utf8", function read(err, data) {
                if (err) {
                    throw err;
                }
                var xValue = [], yValue = [], indexXY=0, indexSample=0;
                //Loop through all the char of the file
                for (var i = 0; i < data.length; i++) {
                    //, represents the end of a value
                    if (data[i] == ","){
                        if(indexXY == 0){
                            indexXY=1;
                        }
                        else{
                            indexSample++;
                            //Fill the wave array
                            if(indexSample<=256) $scope.waveData.push([xValue, yValue]);
                            //Fill the frequency arry
                            else $scope.frequencyData.push([xValue, yValue]);
                            indexXY=0;
                            xValue=[];
                            yValue=[];
                        }
                    }
                    //Read x value
                    else if(indexXY==0) xValue = xValue + data[i];
                    //Read y value
                    else if(indexXY==1) yValue = yValue + data[i];
                }
                $scope.update = !$scope.update
                $scope.$apply();
            });
        }, false);
        // Trigger click event on the chooser, this will bring up the dialog
        $scope.showTheFile = function () {
            chooser.click()
        }
        //Compute peaks
        $scope.computePeaks = function () {
            var derivate0=0, derivate1=0;
            //Remove previous frequency list
            var ul = document.getElementById("list-freq");
            var lis = ul.getElementsByTagName("li")
            while(lis.length > 0) {
                ul.removeChild(lis[0]);
            }
            //Compute derivate to find peaks
            for(var i=0; i<$scope.frequencyData.length-1; i++){
                derivate1 = (parseInt($scope.frequencyData[i+1][1]) - parseInt($scope.frequencyData[i][1]))/(parseFloat($scope.frequencyData[i+1][0]) - parseFloat($scope.frequencyData[i][0]))*1000;
                if(i>0){
                    if(derivate1 <= 0 && derivate0 >= 0 && (parseInt($scope.frequencyData[i+1][1]) + parseInt($scope.frequencyData[i][1]))/2 > 15){
                        var li = document.createElement("li");
                        li.appendChild(document.createTextNode((parseInt($scope.frequencyData[i+1][0]) + parseInt($scope.frequencyData[i][0]))/2 + "Hz"));
                        ul.appendChild(li);
                    }
                }
                derivate0=derivate1;
            }
        }
    }


}());
