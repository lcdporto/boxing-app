(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthLogoutController', Controller);

    /* @ngInject */
    function Controller($rootScope, $state, $auth) {
        var vm = this;
        vm.title = 'Logout';
        vm.logout = logout;

        activate();

        function activate() {
            vm.logout();
        }

        function logout() {
            $auth.logout().then(function() {
                // Remove the authenticated user from local storage
                localStorage.removeItem('member');
                $rootScope.me = false;
                $state.go('auth');
            });
        }

    }
})();
