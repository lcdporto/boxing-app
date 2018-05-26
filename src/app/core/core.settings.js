(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('AppSettings', {
            appName: 'Boxing APP',
            appVersion: 0.1,
            apiUrl: 'https://api.boxing.audienciazero.net',
            mediaUrl: 'https://api.boxing.audienciazero.net/static/media'
        });
})();
