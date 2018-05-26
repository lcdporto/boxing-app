(function () {
    'use strict';

    angular
        .module('app.tables')
        .factory('AccountsTable', RestmodFactory);

    /* @ngInject */
    function RestmodFactory(restmod) {
        return restmod.model('/users').mix('MixinContainable', {
            $config: {
                contains: {}
            }
        });
    }
})();
