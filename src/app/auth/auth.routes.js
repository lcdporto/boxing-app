(function () {
    'use strict';

    angular
        .module('app.auth')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'auth',
                config: {
                    url: '/login',
                    templateUrl: 'app/auth/views/auth.login.view.html',
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
            },
            {
                state: 'forgot',
                config: {
                    url: '/forgotpassword',
                    templateUrl: 'app/auth/views/auth.forgot.html',
                    controller: 'AuthForgotController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'setpassword',
                config: {
                    url: '/alterar_password?email&token',
                    templateUrl: 'app/auth/views/auth.set.password.html',
                    controller: 'AuthSetPasswordController',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();
