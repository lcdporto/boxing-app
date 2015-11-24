(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuthLoginController', Controller);

    Controller.$inject = ['$state', '$scope', '$auth'];

    /* @ngInject */
    function Controller($state, $scope, $auth) {
        var vm = this;
        vm.title = 'Login';
        vm.login = login;

        activate();

        function activate() {}

        function login(){


            var credentials = {
                username: vm.username,
                password: vm.password
            }


            $auth.login(credentials).then(function(data) {
                console.log(data);

                //$state.go('users', {});
            });


        }

    }
})();