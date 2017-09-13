(function () {
    'use strict';
    angular
        .module('freq-spectrum')
        .directive('interface', interfaceDirective);

    function interfaceDirective() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/interface/interface.html',
            controller: 'interfaceCtrl'  
        } 
    }
}());
