(function() {
    'use strict';

    angular
        .module('app')
        .constant('AppSettings', {
            appName: 'Boxing Lab',
            appVersion: 0.1,
            apiUrl: 'http://192.168.1.219:8080'
            });
})();
