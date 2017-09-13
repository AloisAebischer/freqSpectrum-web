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
            for (var i = 0; i < $scope.ampliData1.length; i++) {
                dataToSave.push($scope.frequencyData[i][1].toFixed(6));
            }
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
            fs.readFile(ffile, "utf8", function read(err, data) {
                if (err) {
                    throw err;
                }
                var stringValue = [],indexValue = 0;
                $scope.$apply();
            });
        }, false);
        // Trigger click event on the chooser, this will bring up the dialog
        $scope.showTheFile = function () {
            chooser.click()
        }
    }


}());
