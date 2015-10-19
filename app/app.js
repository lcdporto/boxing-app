(function () {
    'use strict';

    angular
            .module('app', ['ngMaterial', 'ui.router', 'ngResource'])
            .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $resourceProvider) {

                $resourceProvider.defaults.stripTrailingSlashes = false;

                $urlRouterProvider.otherwise("/list");

                $mdThemingProvider.theme('default')
                                  .primaryPalette('blue-grey')
                                  .accentPalette('amber');

                $stateProvider
                        .state('list', {
                            url: "/list",
                            templateUrl: "pages/list.html",
                            controller: 'ItemsListController',
                            controllerAs: 'vm'
                        })
                        .state('items_add', {
                            url: "/items_add",
                            templateUrl: "pages/items_add.html",
                            controller: 'ItemsAddController',
                            controllerAs: 'vm'
                        });
            });



})();
