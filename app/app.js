(function () {
    'use strict';

    angular
            .module('app', ['ngMaterial', 'ui.router', 'ngResource', 'satellizer'])
            .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $resourceProvider, $authProvider, AppSettings, $httpProvider, $provide) {

                $resourceProvider.defaults.stripTrailingSlashes = false;


                $mdThemingProvider.theme('default')
                                  .primaryPalette('blue-grey')
                                  .accentPalette('amber');

     //           $scope.test = 'blaldas';

                $authProvider.loginUrl = AppSettings.apiUrl + '/api-token-auth/';

                $urlRouterProvider.otherwise('/auth');
                $stateProvider
                    .state('auth', {
                        url: '/auth',
                        templateUrl: 'auth/auth.login.view.html',
                        controller: 'AuthLoginController',
                        controllerAs: 'vm'
                    })
                    .state('logout', {
                        url: '/logout',
                        controller: 'AuthLogoutController',
                        controllerAs: 'vm'
                    })
                    .state('list', {
                        url: "/list",
                        templateUrl: "pages/list.html",
                        controller: 'ItemsListController',
                        controllerAs: 'vm'
                    });

                function redirectWhenLoggedOut($q, $injector) {
                    return {

                        responseError: function(rejection) {
                            var $state = $injector.get('$state');

                            if(typeof rejection.data.detail != 'undefined' && rejection.data.detail == 'Authentication credentials were not provided.' && $state.current.name != 'auth'){
                                localStorage.removeItem('user');
                                $state.go('auth');
                            }

                            return $q.reject(rejection);
                        }
                    }
                }

                $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
                $httpProvider.interceptors.push('redirectWhenLoggedOut');


            })


        .run(function($rootScope, $state) {

            $rootScope.$on('$stateChangeStart', function(event, toState) {

                var user = JSON.parse(localStorage.getItem('user'));

                if(user) {
                    $rootScope.authenticated = user;
                    if(toState.name === "auth") {
                        event.preventDefault();
                        $state.go('list');
                    }
                }
            });
        });

})();
