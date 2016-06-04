(function () {
    'use strict';

    angular
        .module('app.tables')
        .factory('MediaTable', RestmodFactory);

    /* @ngInject */
    function RestmodFactory(restmod) {
        return restmod.model('/media').mix('MixinContainable', {
            $config: {
                contains: {
                }
            }
        });
    }
})();
