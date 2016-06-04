(function () {
    'use strict';

    angular
        .module('app', [
            'ngAnimate',
            'ngCookies',
            'ngSanitize',
            'ngAria',
            'ui.router',
            'ngMaterial',
            'satellizer',
            'ngFileUpload',
            'cgBusy',
            'app.core',
            'app.auth',
            'app.items',
            'app.media',
            'app.tables'
        ]);

})();
