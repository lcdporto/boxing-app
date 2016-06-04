(function () {
    'use strict';

    angular
        .module('app.auth')
        .config(Config);

    /* @ngInject */
    function Config($authProvider, AppSettings) {
        $authProvider.baseUrl = AppSettings.apiUrl;

        $authProvider.loginUrl = '/api-token-auth/';

        $authProvider.facebook({
            clientId: '1581300365516543',
            url: '/auth/facebook/'
        });
    }
})();
