(function () {
    'use strict';
    angular
        .module('freq-spectrum')
        .directive('panel', panelDirective);

    function panelDirective() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/panel/panel.html',
            controller: 'panelCtrl',
            controllerAs: 'vm',
            scope:{frequencyData: '=', waveData: '=', update:'=', samples:'=', freqSampling:'=', measure:'='},
            link: function(scope, element, attr) {
                scope.$watch('frequencyData', function () {
                    scope.computePeaks();
                }); 
            }
        } 
    }
}());
