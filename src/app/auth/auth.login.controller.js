(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthLoginController', Controller);

    /* @ngInject */
    function Controller($rootScope, $state, $auth, AccountsTable) {
        var vm = this;
        vm.login = login;

        vm.member = {};

        activate();

        function activate() {
            $auth.logout().then(function() {
                // Remove the authenticated user from local storage
                localStorage.removeItem('member');
                $rootScope.me = false;
            });
        }

        function login() {
            var credentials = {
                email: vm.email,
                password: vm.password
            };

            $auth.login(credentials).then(function () {
                $rootScope.me = AccountsTable.$find('me').$then(function () {
                    $rootScope.me.$pk = $rootScope.me.id;

                    var userData = angular.toJson($rootScope.me);
                    localStorage.setItem('member', userData);

                    $state.go('itemsList');
                });
            }, function (error) {
                vm.member = error;
            });

        }

    }
})();
