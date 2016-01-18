(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthLoginController', Controller);

    Controller.$inject = ['$rootScope', '$state', '$auth', '$window', 'AccountsService'];

    /* @ngInject */
    function Controller($rootScope, $state, $auth, $window, AccountsService) {
        var vm = this;
        vm.title = 'Login';
        vm.login = login;

        activate();

        function activate() {
        }

        function decodeJWTToken(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }

        function login() {

            var credentials = {
                email: vm.email,
                password: vm.password
            };

            $auth.login(credentials).then(function(data) {
                return AccountsService.get((decodeJWTToken(data.data.token)).user_id);
            }, function(error) {
                console.log(error);
            }).then(function(response) {
                console.log(response);
                console.log(response.email);
                var user = JSON.stringify(response);

                localStorage.setItem('user', user);

                $rootScope.authenticated = response;

                $state.go('list');
            });

        }

    }
})();
