(function () {
    'use strict';

    angular
        .module('app.tables')
        .config(Config);

    /* @ngInject */
    function Config(restmodProvider, AppSettings) {
        restmodProvider.rebase({
            $config: {
                urlPrefix: AppSettings.apiUrl
            }
        });
        restmodProvider.rebase('DjangoDRFPagedApi');
    }
})();
