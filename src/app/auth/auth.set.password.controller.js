(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthSetPasswordController', AuthSetPasswordController);

    /* @ngInject */
    function AuthSetPasswordController($state, $http, AppSettings, $stateParams, $mdToast) {
        var vm = this;

        vm.requestStatus = {};

        vm.setPassword = setPassword;

        activate();

        function activate() {
            if (!$stateParams.email || !$stateParams.token) {
                $state.go('home');
            }
        }

        function setPassword() {
            vm.requestStatus = $http({
                method: 'POST',
                url: AppSettings.apiUrl + '/members/set_password/',
                data: {
                    email: $stateParams.email,
                    token: $stateParams.token,
                    password: vm.password
                }
            }).then(function successCallback() {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('A sua palavra-passe foi alterada.')
                        .hideDelay(3000)
                );
                $state.go('login');
            }, function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Ops. Ocorreu um erro ao tentar alterar a sua palavra-passe. Se o erro persisitr, por favor entre em contacto connosco.')
                        .hideDelay(3000)
                );
                $state.go('home');
            });
        }
    }
})();
