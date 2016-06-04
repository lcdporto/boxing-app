(function () {
    'use strict';

    angular
        .module('app.tables')
        .factory('CategoriesTable', RestmodFactory);

    /* @ngInject */
    function RestmodFactory(restmod) {
        return restmod.model('/categories');
    }
})();
