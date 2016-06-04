(function () {
    'use strict';

    angular
        .module('app')
        .filter('nl2br', nl2br);

    /* @ngInject */
    function nl2br() {
        return function (input) {
            if (input) {
                return input.replace(/\n/g, '<br>');
            }
        };
    }
})();