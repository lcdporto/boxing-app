(function () {
    'use strict';

    angular
        .module('app.items')
        .config(Config);

    /* @ngInject */
    function Config($authProvider, AppSettings) {
        $authProvider.baseUrl = AppSettings.apiUrl;

        $authProvider.loginUrl = '/api-token-auth/';
    }
})();
