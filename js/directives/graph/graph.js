(function () {
    'use strict';
    angular
        .module('freq-spectrum')
        .directive('graph', graphDirective);

    function graphDirective() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/graph/graph.html',
            controller: 'graphCtrl',
            controllerAs: 'vm',
            scope:{frequencyData: '=', waveData: '=', update:'='},
            link: function(scope, element, attr) {
                scope.$watch('update', function () {
                    scope.updateGraph();
                }); 
            }
        } 
    }
}());
