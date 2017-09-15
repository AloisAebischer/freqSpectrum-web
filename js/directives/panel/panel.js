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
            scope:{frequencyData: '=', waveData: '=', update:'=', measure:'='},
            link: function(scope, element, attr) {
                scope.$watch('update', function () {
                    scope.computePeaks();
                }); 
            }
        } 
    }
}());
