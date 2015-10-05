(function () {
    'use strict';

    angular
            .module('app', ['ngMaterial', 'ui.router'])
            .config(function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/list");

                $stateProvider
                        .state('list', {
                            url: "/list",
                            templateUrl: "pages/list.html",
                            controller: 'ItemsController',
                            controllerAs: 'vm'
                        });
            });



})();