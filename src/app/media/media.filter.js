(function () {
    'use strict';

    angular
        .module('app.media')
        .filter('mediaUrl', MediaUrl);

    /* @ngInject */
    function MediaUrl(AppSettings) {
        return function (input) {
            if (input) {
                return AppSettings.mediaUrl + '/' + input;
            } else {
                return null;
            }
        };
    }
})();