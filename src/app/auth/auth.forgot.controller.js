(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthForgotController', AuthForgotController);

    /* @ngInject */
    function AuthForgotController($http, AppSettings) {
        var vm = this;

        vm.requestStatus = {};

        vm.requestChange = requestChange;

        activate();

        function activate() {
        }

        function requestChange() {
            vm.requestStatus = $http({
                method: 'POST',
                url: AppSettings.apiUrl + '/members/reset_password/',
                data: {
                    email: vm.email
                }
            }).then(function successCallback(response) {
                return response;
            }, function (response) {
                return response;
            });
        }
    }
})();
