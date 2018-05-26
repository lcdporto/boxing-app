(function () {
    'use strict';

    angular
        .module('app.tables')
        .factory('ItemFilesTable', RestmodFactory);

    /* @ngInject */
    function RestmodFactory(restmod) {
        return restmod.model('/item-files').mix('MixinContainable', {
            $config: {
                contains: {}
            }
        });
    }
})();
