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
        } 
    }
}());
