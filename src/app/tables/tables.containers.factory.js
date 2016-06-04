(function () {
    'use strict';

    angular
        .module('app.tables')
        .factory('ContainersTable', RestmodFactory);

    /* @ngInject */
    function RestmodFactory(restmod) {
        return restmod.model('/containers');
    }
})();
