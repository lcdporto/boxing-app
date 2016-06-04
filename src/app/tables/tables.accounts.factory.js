(function () {
    'use strict';

    angular
        .module('app.tables')
        .factory('AccountsTable', RestmodFactory);

    /* @ngInject */
    function RestmodFactory(restmod) {
        return restmod.model('/accounts').mix('MixinContainable', {
            $config: {
                contains: {
                }
            }
        });
    }
})();
