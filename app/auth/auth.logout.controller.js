(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuthLogoutController', Controller);

    Controller.$inject = ['$rootScope', '$state', '$auth', '$window'];

    /* @ngInject */
    function Controller($rootScope, $state, $auth, $window) {
        var vm = this;
        vm.title = 'Logout';
        vm.logout = logout;

        activate();

        function activate() {
            vm.logout();
        }

        function logout(){
            $auth.logout().then(function() {
                // Remove the authenticated user from local storage
                localStorage.removeItem('user');
                $rootScope.authenticated = false;
                $state.go('auth');
            });
        }

    }
})();