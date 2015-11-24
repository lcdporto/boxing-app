(function () {
    'use strict';

    angular
            .module('app', ['ngMaterial', 'ui.router', 'ngResource', 'satellizer'])
            .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $resourceProvider, $authProvider, AppSettings) {

                $resourceProvider.defaults.stripTrailingSlashes = false;


                $mdThemingProvider.theme('default')
                                  .primaryPalette('blue-grey')
                                  .accentPalette('amber');



                $authProvider.loginUrl = AppSettings.apiUrl + '/api-token-auth/';

                if(true){
                    $urlRouterProvider.otherwise('/auth');
                    $stateProvider
                        .state('auth', {
                            url: '/auth',
                            templateUrl: 'auth/auth.login.view.html',
                            controller: 'AuthLoginController',
                            controllerAs: 'vm'
                        })
                        .state('users', {
                            url: '/users',
                            templateUrl: '../views/userView.html',
                            controller: 'UserController',
                            controllerAs: 'vm'
                        });
                }else{
                    $urlRouterProvider.otherwise('/list');
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

                }

            })


})();
