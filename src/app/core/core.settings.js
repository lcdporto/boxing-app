(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('AppSettings', {
            appName: 'Boxing APP',
            appVersion: 0.1,
            apiUrl: 'http://api.dev.boxing.audienciazero.net',
            mediaUrl: 'http://api.dev.boxing.audienciazero.net/static/media'
        });
})();
