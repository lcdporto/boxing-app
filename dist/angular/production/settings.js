(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('AppSettings', {
            appName: 'Boxing Lab',
            appVersion: 0.1,
            apiUrl: 'http://api.boxing.audienciazero.net'
            });
})();
