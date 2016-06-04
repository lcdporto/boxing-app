(function () {
    'use strict';
    angular
        .module('app.media')
        .run(runBlock);

    /* @ngInject */
    function runBlock($rootScope, MediaService) {
        $rootScope.$Media = MediaService;
    }

})();