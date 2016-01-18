(function() {
    'use strict';

    angular
        .module('app.auth')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'auth',
                config: {
                    url: '/auth',
                    templateUrl: 'app/auth/auth.login.view.html',
                    controller: 'AuthLoginController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'logout',
                config: {
                    url: '/logout',
                    controller: 'AuthLogoutController',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();
