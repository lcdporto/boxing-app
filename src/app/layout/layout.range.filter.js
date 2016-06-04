(function () {
    'use strict';

    angular
        .module('app')
        .filter('range', Range);

    /* @ngInject */
    function Range() {
        return function (input, total) {
            total = parseInt(total);
            for (var i = 0; i < total; i++) {
                input.push(i);
            }
            return input;
        };
    }
})();